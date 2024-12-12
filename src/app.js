import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import v1Routes from "./routes/v1/index.js";
import healthRoute from "./routes/health.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter)

const PORT = process.env.PORT || 3000;



const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "A simple Task Manager API",
    },
    components: {
      schemas: {},
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1/`,
        description: "Development server",
      },
    ],
  },
  // Path to the API docs
  apis: ["./src/routes/v1/*.js"], // Files containing annotations
};

app.use('/api/health', healthRoute);
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", v1Routes);
app.use(errorHandler);

export default app;
