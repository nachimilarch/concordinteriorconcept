import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import categoryRoutes from "./routes/categories.js";
import serviceRoutes from "./routes/services.js";
import settingRoutes from "./routes/settings.js";
import enquiryRoutes from "./routes/enquiries.js";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Concorde API running on port ${process.env.PORT || 5000}`)
);