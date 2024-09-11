import mongoose from 'mongoose';
import 'dotenv/config';

/*
Connects to the cloud hosted MongoDB database.
throws error if no MongoDB URL is provided or if connection fails.
 */

const connectToDatabase = async (): Promise<void> => {
    const mongoDbUrl: string | undefined = process.env.MONGODB_URL;
    
    if (!mongoDbUrl) {
        console.error("No MongoDB url provided.");
        throw new Error("No connection string provided");
    }

    try { 
        await mongoose.connect(mongoDbUrl);
        // console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
        }
};

/*
Closes the connection to the MongoDB database.
throws error if disconnection fails.
 */

const closeDatabaseConnection = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        // console.log("Successfully disconnected from MongoDB");

    } catch (error) {
        console.error("Error disconnection from MongoDB:", error)
        throw error; 
    }
};

export { connectToDatabase, closeDatabaseConnection};