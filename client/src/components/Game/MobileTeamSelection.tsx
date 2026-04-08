import React from "react";
import { Button } from "@/components/ui/button";
import type { Team } from "@/types/game";

interface MobileTeamSelectionProps {
  teams: Team[];
  myTeamId?: string | null;
  handleJoinTeam: (teamId: string) => void;
}

export default function MobileTeamSelection({
  teams,
  myTeamId,
  handleJoinTeam,
}: MobileTeamSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col p-6 touch-manipulation">
      <div className="text-center mb-8 mt-4">
        <h1 className="text-4xl font-black text-primary uppercase">
          Select Your Team
        </h1>
        <p className="text-muted-foreground mt-2">
          Wait for the host to start the game.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {teams.map((team) => (
          <Button
            key={team.id}
            onClick={() => handleJoinTeam(team.id)}
            variant={myTeamId === team.id ? "default" : "outline"}
            className={`h-20 text-2xl font-bold rounded-2xl ${
              myTeamId === team.id
                ? "ring-4 ring-primary ring-offset-4 ring-offset-background"
                : ""
            }`}
          >
            {team.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
