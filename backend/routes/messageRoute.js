import { Router } from "express";
import { sendMessage } from "../controllers/messg.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.post("/sent/:id", protectRoute, sendMessage);

export default router;
