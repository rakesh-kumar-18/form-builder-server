import { Router } from "express";
import {
    createTypeBot,
    deleteTypeBot,
    getUserTypeBots,
    getTypeBotsByFolder,
    getTypeBotById,
} from "../controllers/typebot.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(isAuthenticated, createTypeBot);
router.route("/:typeBotId").delete(isAuthenticated, deleteTypeBot);
router.route("/user").get(isAuthenticated, getUserTypeBots);
router.route("/folder/:folderId").get(isAuthenticated, getTypeBotsByFolder);
router.route("/:typeBotId").get(getTypeBotById);

export default router;
