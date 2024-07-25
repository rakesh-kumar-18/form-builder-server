import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import folderRoutes from "./routes/folder.routes.js";
import typeBotRoutes from "./routes/typebot.routes.js";
import responseRoutes from "./routes/response.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/folders", folderRoutes);
app.use("/api/typebots", typeBotRoutes);
app.use("/api/responses", responseRoutes);

app.use(errorHandler);

export default app;
