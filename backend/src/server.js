import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.route.js";

const app = express();
const PORT = process.env.PORT;

// Proper __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Production Setup
if (process.env.NODE_ENV === "production") {

  // 👇 Google verification FIRST
  app.get("/google645d416ebe2aa1bf.html", (req, res) => {
    res.sendFile(path.join(__dirname, "google645d416ebe2aa1bf.html"));
  });

  // Serve frontend
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});