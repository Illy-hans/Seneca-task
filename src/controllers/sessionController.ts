import { SessionRecord, SessionRecordDocument } from "../model/sessionModel";
import { Request, Response } from 'express';


/*
Re-usable interface to ensure type safety of information sent/received in calls
*/
interface StudySessionVariables {
    totalModulesStudied: number;
    averageScore: number;
    timeStudied: number;
}

/*
This function handles the creation of a new Session Record - returns OK or an error. 
*/
const createSessionRecordForUser = async (req: Request, res: Response): Promise<Response> => {
    
    const { totalModulesStudied, averageScore, timeStudied } = req.body as StudySessionVariables;

    try {
        const userId: string = req.headers['x-user-id'] as string;
        const courseId: string = req.params.courseId;

        const newSessionRecord = new SessionRecordDocument({ 
            userId,
            courseId,
            totalModulesStudied,
            averageScore,
            timeStudied
        });

        await newSessionRecord.save();
        console.log("New session record created", newSessionRecord._id.toString());
        return res.status(201).json({ message: "OK" });
    
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Record not created", error: error });
        };
};


/*
This function handles the lifetime stats for the user, aggregating or averaging.
- returns StudySessionVariables object or error
*/
const getCourseLifetimeStatsForUser = async (req: Request, res: Response): Promise<Response> => {

    try {
        const userId: string = req.headers['x-user-id'] as string;
        const courseId: string = req.params.courseId;
        const allSessionResults: SessionRecord[] = await SessionRecordDocument.find({ userId: userId, courseId: courseId} )
        
        // Initialise variables for aggregation
        let totalModules: number = 0;
        let totalScores: number = 0;
        let totalTimeStudied: number = 0;

        allSessionResults.forEach((session) => {
            totalModules += session.totalModulesStudied;
            totalScores += session.averageScore; 
            totalTimeStudied += session.timeStudied;
        });

        const averageScore: number = totalScores / allSessionResults.length;

        const aggregatedStats: StudySessionVariables = {
            totalModulesStudied: totalModules,
            averageScore: averageScore,
            timeStudied: totalTimeStudied
        };

        return res.status(200).json({ Lifetime_stats_for_course: aggregatedStats})

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Information not available", error: error });
        };
};  


/*
This interface extends StudySessionVariables for the return of the GET single session stats function
*/
interface GetSessionReturn extends StudySessionVariables{
    sessionId: string,
};


/*
This function handles the return of a single session object 
*/
const getSessionStatsForUser = async (req: Request, res: Response): Promise<Response> => {
    let singleSession: InstanceType<typeof SessionRecordDocument> | null;

    try {
        const sessionId: string = req.params.sessionId;
        const courseId: string = req.params.courseId;
        const userId: string = req.headers['x-user-id'] as string;

        singleSession = await SessionRecordDocument.findOne({ sessionId:sessionId, userId:userId, courseId:courseId })
        
         // Ensure the session is not null before asserting
        if (!singleSession) {
            throw new Error("Session record not found");
        }

        const singleSessionReturn: GetSessionReturn = {
            sessionId: singleSession.sessionId,
            totalModulesStudied: singleSession.totalModulesStudied,
            averageScore: singleSession.averageScore,
            timeStudied: singleSession.timeStudied
        }

        return res.status(200).json({ Study_session_stats: singleSessionReturn})

    } catch(error){
        console.error(error);
        return res.status(400).json({ message: "No session found", error: error });
    };
};


export const sessionController = {
    createSessionRecordForUser,
    getCourseLifetimeStatsForUser,
    getSessionStatsForUser
};