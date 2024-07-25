import { Router } from "express";
import {
    addResponse,
    incrementViewCount,
    incrementStartCount,
    getResponses,
} from "../controllers/response.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(addResponse);
router.route("/:typeBotId/views").post(incrementViewCount);
router.route("/:typeBotId/starts").post(incrementStartCount);
router.route("/:typeBotId").get(isAuthenticated, getResponses);

export default router;
