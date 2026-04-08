// src/pages/Play.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "@/context/SocketContext";

import type { RoomState } from "@/types/game";
import MobileTeamSelection from "@/components/Game/MobileTeamSelection";
import MobileDescriber from "@/components/Game/MobileDescriber";
import MobileGuesser from "@/components/Game/MobileGuesser";
import MobileIdle from "@/components/Game/MobileIdle";

export default function Play() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 2. Add this hook
  const { socket, isConnected } = useSocket();

  // 3. Set the initial state using the data passed from Home.tsx!
  const [roomState, setRoomState] = useState<RoomState | null>(
    location.state?.initialRoomState || null,
  );

  useEffect(() => {
    if (!socket || !isConnected) {
      navigate("/");
      return;
    }

    socket.on("ROOM_STATE_UPDATE", (payload: RoomState) => {
      setRoomState(payload);
    });

    socket.on("ROUND_STARTING", (payload: RoomState) => {
      setRoomState(payload);
    });

    return () => {
      socket.off("ROOM_STATE_UPDATE");
      socket.off("ROUND_STARTING");
    };
  }, [socket, isConnected, navigate]);

  if (!roomState || !socket) {
    return <div className="p-8 text-center font-bold">Loading...</div>;
  }

  const me = roomState.players.find((p) => p.socketId === socket.id);
  const activeTeam = roomState.teams.find(
    (t) => t.id === roomState.currentTurn?.teamId,
  );
  const describer = roomState.players.find(
    (p) => p.socketId === roomState.currentTurn?.describerId,
  );

  const isMyTurn = activeTeam?.id === me?.teamId;
  const amIDescriber = describer?.socketId === socket.id;

  const handleAction = (action: "CORRECT" | "PASS") => {
    socket.emit("DESCRIBER_ACTION", { roomCode, action });
  };

  const handleJoinTeam = (teamId: string) => {
    socket.emit("PLAYER_JOIN_TEAM", { roomCode, teamId });
  };

  // --- STATE 1: LOBBY ---
  if (roomState.status === "LOBBY") {
    return (
      <MobileTeamSelection
        teams={roomState.teams}
        myTeamId={me?.teamId}
        handleJoinTeam={handleJoinTeam}
      />
    );
  }

  // --- STATE 2: I AM THE DESCRIBER ---
  if (roomState.status === "PLAYING" && amIDescriber && roomState.currentTurn) {
    return (
      <MobileDescriber
        currentTurn={roomState.currentTurn}
        handleAction={handleAction}
      />
    );
  }

  // --- STATE 3: MY TEAM IS GUESSING ---
  if (roomState.status === "PLAYING" && isMyTurn) {
    return <MobileGuesser describerName={describer?.name} />;
  }

  // --- STATE 4: OTHER TEAM IS PLAYING ---
  return <MobileIdle activeTeamName={activeTeam?.name} />;
}
