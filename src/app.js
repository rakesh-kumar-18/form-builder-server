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
app.use("/api/v1/folders", folderRoutes);
app.use("/api/v1/typebots", typeBotRoutes);
app.use("/api/v1/responses", responseRoutes);

app.get("/keep-alive", (req, res) => {
    res.status(200).send("Server is alive");
});

app.use(errorHandler);

export default app;
