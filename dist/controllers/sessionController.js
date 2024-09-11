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
exports.sessionController = {
    createSessionRecordForUser,
    // getCourseLifetimeStatsForUser,
    // getSessionStatsForUser
};
