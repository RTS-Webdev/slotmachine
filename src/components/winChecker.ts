"use client";

import { useEffect } from "react";
import { Item } from "@/lib/types";

interface WinCheckerProps {
  visibleItems: Item[];
  betAmount: number;
  isSpinning: boolean;
  onWin: (amount: number) => void;
}

export default function WinChecker({
  visibleItems,
  betAmount,
  isSpinning,
  onWin,
}: WinCheckerProps) {
  useEffect(() => {
    if (!isSpinning && visibleItems.length === 3) {
      checkForWin();
    }
  }, [visibleItems, isSpinning]);

  const checkForWin = () => {
    if (
      visibleItems[0]?.name === visibleItems[1]?.name &&
      visibleItems[1]?.name === visibleItems[2]?.name
    ) {
      const winMultiplier = visibleItems[0].value || 2;
      const winAmount = betAmount * winMultiplier;
            
      onWin(winAmount);
    }
  };

  return null;
}
