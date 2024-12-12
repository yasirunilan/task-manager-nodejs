

import { Router } from "express";
import { taskController } from "../../controllers/task.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import {
  taskCreateSchema,
  taskUpdateSchema,
} from "../../middlewares/validators/task.validator.js";

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */
const router = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Fetches a list of all tasks.
 *     tags:
 *        - Tasks
 *     responses:
 *       200:
 *         description: A list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: aa934adb-9c3b-4dc3-948d-096ad559b43e
 *                       title:
 *                         type: string
 *                         example: Go To Bank
 *                       description:
 *                         type: string
 *                         example: Go to bank and collect letters
 *                       status:
 *                         type: string
 *                         example: pending
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-10T11:19:12.481Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-12-10T11:19:12.481Z
 */
router.get("/", taskController.getAll);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     description: Creates a new task with the provided details.
 *     tags:
 *        - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Go To Bank
 *               description:
 *                 type: string
 *                 example: Go to bank and collect letters
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 example: 1733732015252-e527cb8be6c7d6e3.png
 *     responses:
 *       201:
 *         description: The created task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.post("/", validate(taskCreateSchema), taskController.create);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a specific task
 *     description: Removes a task by its ID.
 *     tags:
 *        - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the task.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Task deleted successfully
 */
router.delete("/:id", taskController.delete);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a specific task
 *     description: Fetches the details of a task by its ID.
 *     tags:
 *        - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the task.
 *     responses:
 *       200:
 *         description: The requested task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.get("/:id", taskController.getOne);


/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a specific task
 *     description: Updates the details of a task by its ID.
 *     tags:
 *        - Tasks
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Go to Bank ABCD
 *               description:
 *                 type: string
 *                 example: Go to bank and collect letters
 *               status:
 *                 type: string
 *                 example: pending
 *               attachment:
 *                 type: string
 *                 format: binary
 *                 example: 1733732015252-e527cb8be6c7d6e3.png
 *     responses:
 *       200:
 *         description: The updated task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 */
router.put("/:id", validate(taskUpdateSchema), taskController.update);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: aa934adb-9c3b-4dc3-948d-096ad559b43e
 *         title:
 *           type: string
 *           example: Go To Bank
 *         description:
 *           type: string
 *           example: Go to bank and collect letters
 *         status:
 *           type: string
 *           example: pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-12-10T11:19:12.481Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-12-10T11:19:12.481Z
 */
