import express from "express";
import { createServer } from "http";
import cors from "cors";
import { initializeSocket } from "./socket";

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the React frontend to communicate with this server
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}));

// Create the raw HTTP server so Socket.io can attach to it
const httpServer = createServer(app);

// Initialize our modular game logic
initializeSocket(httpServer);

// Basic health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Articulate PH server is running!" });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Game Server running on http://localhost:${PORT}`);
});