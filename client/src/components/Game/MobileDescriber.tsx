import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RoomState } from "@/types/game";

interface MobileDescriberProps {
  currentTurn: NonNullable<RoomState["currentTurn"]>;
  handleAction: (action: "CORRECT" | "PASS") => void;
}

export default function MobileDescriber({
  currentTurn,
  handleAction,
}: MobileDescriberProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col p-4 touch-manipulation select-none">
      <div className="text-center mb-6 mt-4">
        <div className="inline-block bg-secondary text-secondary-foreground px-6 py-2 rounded-full font-bold text-xl uppercase tracking-widest">
          {currentTurn.category}
        </div>
      </div>

      <Card className="flex-1 flex flex-col items-center justify-center border-4 border-primary shadow-2xl mb-6 bg-card">
        <CardContent className="p-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-black uppercase text-foreground leading-tight">
            HALO-HALO
          </h1>
          <p className="text-muted-foreground mt-4 font-medium">
            Describe this without saying the word!
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4 w-full h-32 mb-4">
        <Button
          onClick={() => handleAction("PASS")}
          disabled={currentTurn.passesLeft <= 0}
          variant="outline"
          className="flex-1 h-full text-2xl font-bold border-4 rounded-3xl"
        >
          PASS ({currentTurn.passesLeft})
        </Button>
        <Button
          onClick={() => handleAction("CORRECT")}
          className="flex-1 h-full text-3xl font-black rounded-3xl bg-green-500 hover:bg-green-600 text-white shadow-xl"
        >
          CORRECT!
        </Button>
      </div>
    </div>
  );
}
