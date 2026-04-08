import React, { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";

import type { RoomState } from "@/types/game";
import HostLobbyIdle from "@/components/Game/HostLobbyIdle";
import HostGameBoard from "@/components/Game/HostGameBoard";

export default function Lobby() {
  const { socket } = useSocket();
  const [roomState, setRoomState] = useState<RoomState | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("ROOM_STATE_UPDATE", (payload: RoomState) => {
      setRoomState(payload);
    });

    return () => {
      socket.off("ROOM_STATE_UPDATE");
    };
  }, [socket]);

  const handleCreateRoom = () => {
    if (socket) socket.emit("HOST_CREATE_ROOM");
  };

  const handleAddTeam = () => {
    if (socket && roomState) {
      const teamName = "Team " + Math.floor(Math.random() * 1000);
      socket.emit("HOST_CREATE_TEAM", {
        roomCode: roomState.roomCode,
        name: teamName,
      });
    }
  };

  const handleStartGame = () => {
    if (socket && roomState) {
      socket.emit("HOST_START_GAME", { roomCode: roomState.roomCode });
    }
  };

  // Validation: Need at least 2 teams, and every team needs at least 2 players
  const canStartGame = React.useMemo(() => {
    if (!roomState || roomState.teams.length < 2) return false;

    // Check if every team has at least 2 players assigned to it
    const allTeamsValid = roomState.teams.every((team) => {
      const playersInTeam = roomState.players.filter(
        (p) => p.teamId === team.id,
      );
      return playersInTeam.length >= 2;
    });

    return allTeamsValid;
  }, [roomState]);

  if (!roomState) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-12">
          <h1 className="text-7xl font-extrabold tracking-tight text-primary">
            TalkTaktika
          </h1>
          <p className="text-2xl text-secondary">
            The ultimate tech party game
          </p>
          <Button
            onClick={handleCreateRoom}
            size="lg"
            className="text-3xl px-12 py-8 mt-12 rounded-full font-bold shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            Host a New Game
          </Button>
        </div>
      </div>
    );
  }

  if (roomState.status === "PLAYING" && roomState.currentTurn) {
    const activeTeam = roomState.teams.find(
      (t) => t.id === roomState.currentTurn!.teamId,
    );
    const describer = roomState.players.find(
      (p) => p.socketId === roomState.currentTurn!.describerId,
    );

    return (
      <HostGameBoard
        roomState={roomState}
        activeTeamName={activeTeam?.name}
        describerName={describer?.name}
      />
    );
  }

  return (
    <HostLobbyIdle
      roomState={roomState}
      canStartGame={canStartGame}
      handleAddTeam={handleAddTeam}
      handleStartGame={handleStartGame}
    />
  );
}
