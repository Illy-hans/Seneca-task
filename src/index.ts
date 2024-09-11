import app from './app';
import { connectToDatabase } from './config/db_connection';

const port = 3000

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
        console.log(`Express is listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit();
    };
}

startServer();