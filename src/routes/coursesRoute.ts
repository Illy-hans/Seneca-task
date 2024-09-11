import { Router } from "express";
import { sessionController } from "../controllers/sessionController";


const courseRouter: Router = Router();

courseRouter.post('/:courseId', sessionController.createSessionRecordForUser);
courseRouter.get('/:courseId', sessionController.getCourseLifetimeStatsForUser);

// courseRouter.get('/:courseId/sessions/:sessionId', sessionController.getSessionStatsForUser)

export { courseRouter }; 