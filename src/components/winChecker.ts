"use client";

import { useEffect, useRef } from "react";
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
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Reset check flag when spinning starts
    if (isSpinning) {
      hasCheckedRef.current = false;
      return;
    }

    // Only check for win when spinning stops and we have valid items
    if (!isSpinning && !hasCheckedRef.current && visibleItems.length === 3 && visibleItems.every(item => item?.name)) {
      // Add a delay to ensure carousel has settled
      const timer = setTimeout(() => {
        checkForWin();
        hasCheckedRef.current = true;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [visibleItems, isSpinning, betAmount]);

  const checkForWin = () => {
    console.log("Checking items:", visibleItems);
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
