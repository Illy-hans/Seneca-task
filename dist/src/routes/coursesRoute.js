"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const courseRouter = (0, express_1.Router)();
exports.courseRouter = courseRouter;
courseRouter.post('/:courseId', sessionController_1.sessionController.createSessionRecordForUser);
