import { Router } from "express";
import { statsController } from "../controllers/statsController";

const courseRouter: Router = Router();

courseRouter.post('/:courseId', statsController.createSessionRecordForUser)
courseRouter.get('/:courseId', statsController.getCourseLifetimeStatsForUser)

courseRouter.get('/:courseId/sessions/:sessionId', statsController.getSessionStatsForUser)

export { courseRouter }; 