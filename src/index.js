import "dotenv/config";
import connectDB from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1);
    }
};

startServer();
