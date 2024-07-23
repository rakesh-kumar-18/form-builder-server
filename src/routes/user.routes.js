import { Router } from "express";
import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(isAuthenticated, logoutUser);
router.route("/current-user").get(isAuthenticated, getCurrentUser);
router.route("/update").put(isAuthenticated, updateUser);

export default router;
