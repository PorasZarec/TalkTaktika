import React from "react";

interface MobileIdleProps {
  activeTeamName?: string;
}

export default function MobileIdle({ activeTeamName }: MobileIdleProps) {
  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-6 text-center touch-manipulation">
      <h1 className="text-3xl font-bold text-muted-foreground mb-4">Relax!</h1>
      <p className="text-xl">
        <span className="font-bold text-foreground">
          {activeTeamName || "Another team"}
        </span>{" "}
        is currently playing.
      </p>
      <p className="mt-8 text-sm text-muted-foreground uppercase tracking-widest font-bold">
        Make sure they don't cheat!
      </p>
    </div>
  );
}
