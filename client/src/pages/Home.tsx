import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "@/context/SocketContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!socket) return;

    // Listen for successful join or errors
    socket.on("ROOM_STATE_UPDATE", (payload) => {
      // Pass the payload directly into the router state!
      navigate(`/play/${payload.roomCode}`, {
        state: { initialRoomState: payload },
      });
    });

    socket.on("ERROR", (err) => {
      setError(err.message);
    });

    return () => {
      socket.off("ROOM_STATE_UPDATE");
      socket.off("ERROR");
    };
  }, [socket, navigate]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode || !playerName) {
      setError("Please enter both a code and a name.");
      return;
    }

    // Convert code to uppercase to match backend
    const cleanCode = roomCode.trim().toUpperCase();

    if (socket) {
      socket.emit("PLAYER_JOIN_ROOM", {
        roomCode: cleanCode,
        name: playerName,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black text-primary tracking-tight">
            TalkTaktika
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Join the party on your phone!
          </p>
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Enter Game Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoin} className="space-y-4">
              {error && (
                <div className="text-destructive text-sm text-center font-bold">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Input
                  placeholder="4-Letter Room Code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  maxLength={4}
                  className="text-center text-2xl tracking-widest font-bold uppercase h-14"
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Your Nickname"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={12}
                  className="text-center text-xl h-14"
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-xl font-bold"
                disabled={!isConnected}
              >
                {isConnected ? "JOIN GAME" : "Connecting..."}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate("/host")}
            className="text-muted-foreground"
          >
            Want to host a game instead?
          </Button>
        </div>
      </div>
    </div>
  );
}
