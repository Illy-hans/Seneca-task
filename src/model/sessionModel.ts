import { Schema, model } from 'mongoose';

// UUID generator for sessionId at document creation
import { v4 as uuidv4 } from 'uuid';

// Interface for a single session 
interface SessionRecord { 
    courseId: string,
    userId: string,
    sessionId: string, 
    totalModulesStudied: number,
    averageScore: number, 
    timeStudied: number,
    timeStamp: Date, 
}

/*  
Mongoose schema for the MongoDB database 
ALL required 
*/
const statsSchema = new Schema<SessionRecord>({
    courseId: {type: String, required: true},
    userId: {type: String, required: true},
    sessionId: {type: String, required: true, default: uuidv4},
    totalModulesStudied: {type: Number, required: true},
    averageScore: {type: Number, required: true},
    timeStudied: {type: Number, required: true},
    timeStamp: {type: Date, required: true, default: Date.now}
})

const SessionRecordDocument = model<SessionRecord>('SessionRecord', statsSchema)

export { SessionRecordDocument, SessionRecord }; 
