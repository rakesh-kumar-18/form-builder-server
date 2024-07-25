import { Router } from "express";
import {
    createFolder,
    deleteFolder,
    getUserFolders,
} from "../controllers/folder.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(isAuthenticated, createFolder);
router.route("/:folderId").delete(isAuthenticated, deleteFolder);
router.route("/user").get(isAuthenticated, getUserFolders);

export default router;
