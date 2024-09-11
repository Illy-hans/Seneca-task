"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionController = void 0;
const sessionModel_1 = require("../model/sessionModel");
/*
This function handles the creation of a new Session Record - returns OK or an error.
*/
const createSessionRecordForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalModulesStudied, averageScore, timeStudied } = req.body;
    try {
        const userId = req.headers['x-user-id'];
        const courseId = req.params.courseId;
        const newSessionRecord = new sessionModel_1.SessionRecordDocument({
            userId,
            courseId,
            totalModulesStudied,
            averageScore,
            timeStudied
        });
        yield newSessionRecord.save();
        console.log("New session record created", newSessionRecord._id.toString());
        return res.status(201).json({ message: "OK" });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Record not created", error: error });
    }
    ;
});
/*
This function handles the lifetime stats for the user, aggregating or averaging.
- returns StudySessionVariables object or error
*/
const getCourseLifetimeStatsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.headers['x-user-id'];
        const courseId = req.params.courseId;
        const allSessionResults = yield sessionModel_1.SessionRecordDocument.find({ userId: userId, courseId: courseId });
        // Initialise variables for aggregation
        let totalModules = 0;
        let totalScores = 0;
        let totalTimeStudied = 0;
        allSessionResults.forEach((session) => {
            totalModules += session.totalModulesStudied;
            totalScores += session.averageScore;
            totalTimeStudied += session.timeStudied;
        });
        const averageScore = totalScores / allSessionResults.length;
        const aggregatedStats = {
            totalModulesStudied: totalModules,
            averageScore: averageScore,
            timeStudied: totalTimeStudied
        };
        return res.status(200).json({ Lifetime_stats_for_course: aggregatedStats });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Information not available", error: error });
    }
    ;
});
;
/*
This function handles the return of a single session object
*/
const getSessionStatsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let singleSession;
    try {
        const sessionId = req.params.sessionId;
        const courseId = req.params.courseId;
        const userId = req.headers['x-user-id'];
        singleSession = yield sessionModel_1.SessionRecordDocument.findOne({ sessionId: sessionId, userId: userId, courseId: courseId });
        // Ensure the session is not null before asserting
        if (!singleSession) {
            throw new Error("Session record not found");
        }
        const singleSessionReturn = {
            sessionId: singleSession.sessionId,
            totalModulesStudied: singleSession.totalModulesStudied,
            averageScore: singleSession.averageScore,
            timeStudied: singleSession.timeStudied
        };
        return res.status(200).json({ Study_session_stats: singleSessionReturn });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "No session found", error: error });
    }
    ;
});
exports.sessionController = {
    createSessionRecordForUser,
    getCourseLifetimeStatsForUser,
    getSessionStatsForUser
};
