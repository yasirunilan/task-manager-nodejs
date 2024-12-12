import { Router } from "express";
import { userController } from "../../controllers/user.controller.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */
const router = Router();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all users with detailed information including address, phone, website, and company details.
 *     tags:
 *        - Users
 *     responses:
 *       200:
 *         description: A list of users.
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
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Leanne Graham
 *                       username:
 *                         type: string
 *                         example: Bret
 *                       email:
 *                         type: string
 *                         format: email
 *                         example: Sincere@april.biz
 *                       address:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                             example: Kulas Light
 *                           suite:
 *                             type: string
 *                             example: Apt. 556
 *                           city:
 *                             type: string
 *                             example: Gwenborough
 *                           zipcode:
 *                             type: string
 *                             example: 92998-3874
 *                           geo:
 *                             type: object
 *                             properties:
 *                               lat:
 *                                 type: string
 *                                 example: -37.3159
 *                               lng:
 *                                 type: string
 *                                 example: 81.1496
 *                       phone:
 *                         type: string
 *                         example: 1-770-736-8031 x56442
 *                       website:
 *                         type: string
 *                         example: hildegard.org
 *                       company:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: Romaguera-Crona
 *                           catchPhrase:
 *                             type: string
 *                             example: Multi-layered client-server neural-net
 *                           bs:
 *                             type: string
 *                             example: harness real-time e-markets
 */
router.get("/", userController.getAll);

export default router;
