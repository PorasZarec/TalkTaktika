import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { RoomState } from "@/types/game";

interface HostGameBoardProps {
  roomState: RoomState;
  activeTeamName?: string;
  describerName?: string;
}

export default function HostGameBoard({
  roomState,
  activeTeamName,
  describerName,
}: HostGameBoardProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Massive Active Turn Indicator */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-muted-foreground mb-4 uppercase tracking-widest">
          {roomState.currentTurn?.category}
        </h2>
        <h1 className="text-7xl lg:text-9xl font-black text-primary uppercase">
          {activeTeamName || "UNKNOWN TEAM"}'S TURN
        </h1>
        <p className="text-4xl text-secondary mt-6 font-bold">
          Describer: {describerName || "Unknown"}
        </p>
      </div>

      {/* Global Scoreboard */}
      <div className="w-full max-w-5xl grid grid-cols-2 gap-8">
        {roomState.teams.map((team) => (
          <Card
            key={team.id}
            className={`bg-card shadow-2xl border-4 ${
              team.name === activeTeamName ? "border-primary" : "border-border"
            }`}
          >
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold text-foreground mb-2">
                {team.name}
              </h3>
              <span className="text-6xl font-black text-primary">
                {team.score}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dummy Timer (We will wire this to backend ticks next!) */}
      <div className="absolute top-8 right-8 bg-destructive text-destructive-foreground px-8 py-4 rounded-3xl text-5xl font-black shadow-xl">
        30
      </div>
    </div>
  );
}
