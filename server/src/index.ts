import express from "express";
import { createServer } from "http";
import cors from "cors";
import { initializeSocket } from "./socket";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

const httpServer = createServer(app);
initializeSocket(httpServer);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "server is running!" });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});