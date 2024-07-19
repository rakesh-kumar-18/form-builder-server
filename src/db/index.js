import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/form-builder`
        );
        console.log(
            `Database connected successfully !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Database connection failed");
    }
};

export default connectDB;
