"use client"

import { Coins, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

type CreditProps = {
    credits: number,
    winAmount: number,
    isSpinning: boolean,
    onAddCredits: (amount: number) => void
    onResetCredits: () => void
}

export default function Credits({ credits, winAmount, isSpinning, onAddCredits, onResetCredits }: CreditProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [showWin, setShowWin] = useState(false)
    const [lastWinAmount, setLastWinAmount] = useState(0)

    useEffect(() => {
        if (isSpinning) {
            setShowWin(false);
            return;
        }
        
        if (winAmount > 0 && winAmount !== lastWinAmount && !isSpinning) {
            setShowWin(true);
            setLastWinAmount(winAmount);

            const timer = setTimeout(() => {
                setShowWin(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [winAmount, isSpinning, lastWinAmount]);

    const handleAddCredits = (amount: number) => {
        onAddCredits(amount)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md border-gray-300">
                <Coins className="h-4 w-4" />
                <span className="font-bold">{credits}</span>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant={"ghost"} size={"icon"} className="h-6 w-6 rounded-full">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Credits</DialogTitle>
                            <DialogDescription>Select an amount to add to your balance</DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-3 gap-4 py-4">
                            <Button onClick={() => handleAddCredits(100)}>
                                100 Credits
                            </Button>
                            <Button onClick={() => handleAddCredits(200)}>
                                200 Credits
                            </Button>
                            <Button onClick={() => handleAddCredits(500)}>
                                500 Credits
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onResetCredits}
                                className="bg-red-100 hover:bg-red-200 border-red-300"
                            >
                                Reset
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {showWin && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-md text-center animate-pulse">
                    WIN! +{lastWinAmount}
                </div>
            )}
        </div>
    )
}
