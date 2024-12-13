import {Router} from "express";
/**
 * Initializes the router for handling health check routes.
 * @type {import('express').Router}
 */
const router = Router();

router.get("/", (req, res) => {
    res.json({ status: 'ok' });
});

export default router;

