import { SessionRecord, SessionRecordDocument } from "../model/sessionModel";
import { Request, Response } from 'express';

interface StudySessionVariables {
    totalModulesStudied: number;
    averageScore: number;
    timeStudied: number;
}

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


export const sessionController = {
    createSessionRecordForUser,
    // getCourseLifetimeStatsForUser,
    // getSessionStatsForUser
};