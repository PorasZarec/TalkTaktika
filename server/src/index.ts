// src/index.ts
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { RoomManager } from "./managers/RoomManager.js";
import { registerSocketHandlers } from "./sockets/socketHandlers.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import wordCardRoutes from "./routes/wordCardRoutes.js";

dotenv.config();

// Initialize MongoDB Connection
connectDB();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const roomManager = new RoomManager();

app.use(cors());
app.use(express.json());

// Register API Routes
app.use("/api/users", userRoutes);
app.use("/api/cards", wordCardRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("TalkTaktika Socket.io Backend MVP Running");
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  registerSocketHandlers(io, socket, roomManager);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`Socket.io Server listening on port ${port}`);
});