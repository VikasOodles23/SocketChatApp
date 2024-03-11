import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messg.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;
