"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const coursesRoute_1 = require("./routes/coursesRoute");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// For development
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
app.use('/courses', loggerMiddleware, coursesRoute_1.courseRouter);
exports.default = app;
