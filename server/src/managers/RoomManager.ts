export interface Player {
  socketId: string;
  name: string;
  teamId: string | null;
  isHost: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: string[]; // Array of socketIds
  score: number;
}

export interface CurrentTurn {
  teamId: string | null;
  describerId: string | null;
  category: string | null;
  passesLeft: number;
}

export interface Room {
  roomCode: string;
  hostId: string;
  players: Map<string, Player>;
  teams: Team[];
  status: "LOBBY" | "PLAYING" | "ROUND_OVER";
  currentTurn: CurrentTurn;
}

export class RoomManager {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map();
  }

  generateRoomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    do {
      code = "";
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this.rooms.has(code));
    return code;
  }

  createRoom(hostId: string): Room {
    const roomCode = this.generateRoomCode();

    const room: Room = {
      roomCode,
      hostId,
      players: new Map(),
      teams: [],
      status: "LOBBY",
      currentTurn: {
        teamId: null,
        describerId: null,
        category: null,
        passesLeft: 3,
      },
    };

    this.rooms.set(roomCode, room);
    return room;
  }

  joinRoom(roomCode: string, socketId: string, name: string): Room | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;

    const player: Player = {
      socketId,
      name,
      teamId: null,
      isHost: socketId === room.hostId,
    };

    room.players.set(socketId, player);
    return room;
  }

  createTeam(roomCode: string, name: string): Room | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;

    const newTeam: Team = {
      id: `team_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name,
      players: [],
      score: 0,
    };

    room.teams.push(newTeam);
    return room;
  }

  joinTeam(roomCode: string, teamId: string, socketId: string): Room | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;

    const player = room.players.get(socketId);
    if (!player) return null;

    // Remove from previous team if any
    if (player.teamId) {
      const prevTeam = room.teams.find((t) => t.id === player.teamId);
      if (prevTeam) {
        prevTeam.players = prevTeam.players.filter((id) => id !== socketId);
      }
    }

    const team = room.teams.find((t) => t.id === teamId);
    if (team) {
      player.teamId = teamId;
      team.players.push(socketId);
    }

    return room;
  }

  startGame(roomCode: string): Room | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;

    if (room.teams.length < 2) {
      throw new Error("At least 2 teams are required to start.");
    }

    for (const team of room.teams) {
      if (team.players.length < 2) {
        throw new Error(`Team '${team.name}' needs at least 2 players.`);
      }
    }

    const categories = ["Chika", "Mga Lugar", "Pagkain", "Kasaysayan"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const firstTeam = room.teams[0]!;
    const firstDescriberId = firstTeam.players[0]!;

    room.status = "PLAYING";
    room.currentTurn = {
      teamId: firstTeam.id,
      describerId: firstDescriberId,
      category: randomCategory!,
      passesLeft: 3,
    };

    return room;
  }

  describerAction(roomCode: string, action: "CORRECT" | "PASS"): Room | null {
    const room = this.rooms.get(roomCode);
    if (!room) return null;

    if (room.status !== "PLAYING") return null;

    const turn = room.currentTurn;
    const currentTeam = room.teams.find((t) => t.id === turn.teamId);

    if (action === "CORRECT") {
      if (currentTeam) currentTeam.score += 1;
    } else if (action === "PASS") {
      if (turn.passesLeft > 0) {
        turn.passesLeft -= 1;
      }
    }

    return room;
  }
}