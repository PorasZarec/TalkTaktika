import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { RoomState } from "@/types/game";

interface HostLobbyIdleProps {
  roomState: RoomState;
  handleAddTeam: () => void;
  handleStartGame: () => void;
  canStartGame: boolean;
}

export default function HostLobbyIdle({
  roomState,
  handleAddTeam,
  handleStartGame,
  canStartGame,
}: HostLobbyIdleProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-8">
      <div className="w-full text-center py-12 mb-8 bg-card rounded-3xl shadow-md border border-border">
        <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
          JOIN AT{" "}
          <span className="text-primary tracking-wider">TALKTAKTIKA.COM</span>{" "}
          WITH CODE:
        </h2>
        <div className="mt-6">
          <span className="text-7xl lg:text-9xl font-black text-primary tracking-widest uppercase">
            {roomState.roomCode}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card w-full shadow-lg h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-3xl text-secondary flex justify-between items-center">
              <span>Teams ({roomState.teams?.length || 0})</span>
              <Button
                onClick={handleAddTeam}
                variant="outline"
                className="text-lg"
              >
                Add Team
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {roomState.teams?.length === 0 ? (
              <p className="text-muted-foreground text-center text-xl mt-8 italic">
                No teams created yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {roomState.teams?.map((team) => (
                  <div
                    key={team.id}
                    className="bg-secondary/10 p-4 rounded-xl flex justify-between items-center border border-secondary/20"
                  >
                    <span className="text-2xl font-bold">{team.name}</span>
                    <span className="text-xl font-mono">
                      Score: {team.score || 0}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card w-full shadow-lg h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-3xl text-secondary flex justify-between items-center">
              <span>Players ({roomState.players?.length || 0})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {roomState.players?.length === 0 ? (
              <p className="text-muted-foreground text-center text-xl mt-8 italic">
                Waiting for players to join...
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {roomState.players?.map((player) => (
                  <div
                    key={player.socketId}
                    className="bg-primary/10 p-4 rounded-xl text-center border border-primary/20"
                  >
                    <span className="text-xl font-semibold text-primary">
                      {player.name}
                    </span>
                    {player.teamId && (
                      <div className="text-sm text-secondary mt-1 font-medium">
                        Team:{" "}
                        {roomState.teams.find((t) => t.id === player.teamId)
                          ?.name || "Unknown"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controls section */}
      <div className="mt-12 w-full max-w-7xl flex justify-end">
        <Button
          onClick={handleStartGame}
          disabled={!canStartGame}
          size="lg"
          className={`text-2xl px-12 py-8 rounded-2xl font-bold transition-all ${
            canStartGame
              ? "animate-bounce shadow-xl shadow-primary/50"
              : "opacity-50"
          }`}
        >
          {canStartGame ? "Start Game!" : "Waiting for players..."}
        </Button>
      </div>
    </div>
  );
}
