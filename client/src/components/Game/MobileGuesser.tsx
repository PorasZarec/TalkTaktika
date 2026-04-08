import React from "react";

interface MobileGuesserProps {
  describerName?: string;
}

export default function MobileGuesser({ describerName }: MobileGuesserProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center touch-manipulation">
      <div className="animate-pulse w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-primary/50">
        <span className="text-5xl">👂</span>
      </div>
      <h1 className="text-4xl font-black text-primary mb-4">
        Your turn to guess!
      </h1>
      <p className="text-2xl font-medium text-foreground">
        Listen to{" "}
        <span className="font-bold underline decoration-secondary">
          {describerName || "your teammate"}
        </span>
        !
      </p>
    </div>
  );
}
