import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import indexRoute from "./routes/index.route.ts";

// 🧠 Fix for ESM (__dirname is not defined)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 🧩 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*", // 🔓 Allow all origins (for development)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// 🖼️ Serve uploads folder (outside /src)
// If your file is /server/src/app.ts → this points to /server/uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ✅ Routes
app.use("/api", indexRoute);

// Simple test route
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

// Optional: Handle missing routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
