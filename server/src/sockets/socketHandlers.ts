import { Server, Socket } from "socket.io";
import { RoomManager, type Room } from "../managers/RoomManager.js";

export function registerSocketHandlers(io: Server, socket: Socket, roomManager: RoomManager) {
  socket.on("HOST_CREATE_ROOM", () => {
    const room = roomManager.createRoom(socket.id);
    socket.join(room.roomCode);
    socket.emit("ROOM_CREATED", { roomCode: room.roomCode });
    // Emit initial state
    io.to(room.roomCode).emit("ROOM_STATE_UPDATE", getRoomState(room));
  });

  socket.on("PLAYER_JOIN_ROOM", ({ roomCode, name }: { roomCode: string; name: string }) => {
    const room = roomManager.joinRoom(roomCode, socket.id, name);
    if (room) {
      socket.join(roomCode);
      io.to(roomCode).emit("ROOM_STATE_UPDATE", getRoomState(room));
    } else {
      socket.emit("ERROR", { message: "Room not found or invalid room code." });
    }
  });

  socket.on("HOST_CREATE_TEAM", ({ roomCode, name }: { roomCode: string; name: string }) => {
    const room = roomManager.createTeam(roomCode, name);
    if (room) {
      io.to(roomCode).emit("ROOM_STATE_UPDATE", getRoomState(room));
    }
  });

  socket.on("PLAYER_JOIN_TEAM", ({ roomCode, teamId }: { roomCode: string; teamId: string }) => {
    const room = roomManager.joinTeam(roomCode, teamId, socket.id);
    if (room) {
      io.to(roomCode).emit("ROOM_STATE_UPDATE", getRoomState(room));
    }
  });

  socket.on("HOST_START_GAME", ({ roomCode }: { roomCode: string }) => {
    try {
      const room = roomManager.startGame(roomCode);
      if (room) {
        io.to(roomCode).emit("ROUND_STARTING", getRoomState(room));
      }
    } catch (err: any) {
      socket.emit("ERROR", { message: err.message });
    }
  });

  socket.on("DESCRIBER_ACTION", ({ roomCode, action }: { roomCode: string; action: "CORRECT" | "PASS" }) => {
    const room = roomManager.describerAction(roomCode, action);
    if (room) {
      io.to(roomCode).emit("ROOM_STATE_UPDATE", getRoomState(room));
    }
  });
}

function getRoomState(room: Room) {
  return {
    roomCode: room.roomCode,
    hostId: room.hostId,
    players: Array.from(room.players.values()),
    teams: room.teams,
    status: room.status,
    currentTurn: room.currentTurn,
  };
}