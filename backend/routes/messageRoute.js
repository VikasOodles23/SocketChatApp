import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messg.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.post("/sent/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

export default router;
