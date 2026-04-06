import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

export function initializeSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log(`⚡ Player connected: ${socket.id}`);

    // Room Logic: Join
    socket.on("join_room", (roomCode: string) => {
      socket.join(roomCode);
      console.log(`Player ${socket.id} joined room: ${roomCode}`);

      // Notify others in the room
      socket.to(roomCode).emit("player_joined", { id: socket.id });
    });

    // Room Logic: Leave
    socket.on("leave_room", (roomCode: string) => {
      socket.leave(roomCode);
      console.log(`Player ${socket.id} left room: ${roomCode}`);
    });

    // MVP Testing: Ping
    socket.on("ping_server", () => {
      console.log(`Received ping from ${socket.id}`);
      socket.emit("pong_client", { message: "Server received your tap!" });
    });

    socket.on("disconnect", () => {
      console.log(`❌ Player disconnected: ${socket.id}`);
    });
  });
}