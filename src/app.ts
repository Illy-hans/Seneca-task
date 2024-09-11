import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import { Request, Response } from 'express';
import { courseRouter } from './routes/coursesRoute';

const app = express();

app.use(bodyParser.json());

// For development
const loggerMiddleware = (req: Request, res: Response, next: () => void) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
};

app.use('/courses', loggerMiddleware, courseRouter);

export default app;