"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Leaderboard from "@/components/leaderboard";
import SlotMachine from "@/components/SlotMachine";

export default function GamePage() {
  const router = useRouter();

  useEffect(() => {
    const playerName = localStorage.getItem("slotMachinePlayerName");
    if (!playerName) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center gap-12 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Slot Machine Game</h1>
        <SlotMachine />
        <div className="w-full mt-8">
          <Leaderboard />
        </div>
      </div>
    </main>
  );
}
