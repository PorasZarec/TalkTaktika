export interface Player {
  socketId: string;
  name: string;
  teamId: string | null;
}

export interface Team {
  id: string;
  name: string;
  score: number;
}

export interface RoomState {
  roomCode: string;
  teams: Team[];
  players: Player[];
  status: "LOBBY" | "PLAYING" | "ROUND_OVER";
  currentTurn?: {
    teamId: string | null;
    describerId: string | null;
    category: string | null;
    passesLeft: number;
  };
}
