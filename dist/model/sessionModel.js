"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRecordDocument = void 0;
const mongoose_1 = require("mongoose");
// UUID generator for sessionId at document creation
const uuid_1 = require("uuid");
/*
Mongoose schema for the MongoDB database
ALL required
*/
const statsSchema = new mongoose_1.Schema({
    courseId: { type: String, required: true },
    userId: { type: String, required: true },
    sessionId: { type: String, required: true, default: uuid_1.v4 },
    totalModulesStudied: { type: Number, required: true },
    averageScore: { type: Number, required: true },
    timeStudied: { type: Number, required: true },
    timeStamp: { type: Date, required: true, default: Date.now }
});
const SessionRecordDocument = (0, mongoose_1.model)('SessionRecord', statsSchema);
exports.SessionRecordDocument = SessionRecordDocument;
