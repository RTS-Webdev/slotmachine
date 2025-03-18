"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if player already has a name
    const existingName = localStorage.getItem("slotMachinePlayerName");
    if (existingName) {
      router.push("/game");
    }
  }, [router]);

  const handleStartGame = () => {
    if (playerName.trim()) {
      // Store player name in localStorage so it can be accessed by other components
      localStorage.setItem("slotMachinePlayerName", playerName.trim());
      router.push("/game");
    }
  };

  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleStartGame();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full px-6">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl font-bold text-center">
            Slot Machine Game
          </h1>
          <div className="w-full space-y-4">
            <Input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-center"
            />
            <Button 
              onClick={handleStartGame}
              disabled={!playerName.trim()}
              className="w-full"
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
