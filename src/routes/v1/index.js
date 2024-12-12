import { Router } from "express";
import taskRoutes from "./tasks.routes.js";
import attachmentRoutes from "./attachment.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/tasks", taskRoutes);
router.use("/attachments", attachmentRoutes);
router.use("/users", userRoutes);

export default router;
