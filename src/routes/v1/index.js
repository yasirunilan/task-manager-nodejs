import { Router } from "express";
import taskRoutes from "./tasks.routes.js";
import attachmentRoutes from "./attachment.routes.js";
import userRoutes from "./user.routes.js";

/**
 * Initializes a new Router instance.
 * 
 * @constant {Router} router - The router instance to define routes for the application.
 */
const router = Router();

router.use("/tasks", taskRoutes);
router.use("/attachments", attachmentRoutes);
router.use("/users", userRoutes);

export default router;
