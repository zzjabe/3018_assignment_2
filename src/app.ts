import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

// Importing morgan
import morgan from "morgan";
import routes from "./api/v1/routes/routes";
import employeeRoutes from "./api/v1/routes/employeeRoutes"
import branchRoutes from "./api/v1/routes/branchRoutes"
import { getHelmetConfig } from "../config/helmetConfig";
import { getCorsOptions } from "../config/corsConfig";
import cors from "cors";

// Initialize Express application
const app: Express = express();

// Apply basic Helmet security
app.use(getHelmetConfig());

app.use(cors(getCorsOptions()));

// JSON parser
app.use(express.json());

// Use morgan for HTTP request logging
app.use(morgan("combined"));

// Mount routes
app.use("/api/v1/routes", routes);

app.use("/employees", employeeRoutes);

app.use("/branches", branchRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

// Define a route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

export default app;