import { connectToDatabase, closeDatabaseConnection } from "./db_connection";
import { beforeAll, afterAll } from '@jest/globals';

// This file runs to open and close the database connection 
beforeAll(async () => {
    await connectToDatabase();
});

afterAll(async () => {
    await closeDatabaseConnection();
});
