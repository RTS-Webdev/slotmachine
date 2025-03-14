"use client"

import { Coins, Plus } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

type CreditProps = {
    credits: number,
    winAmount: number,
    onAddCredits: (amount: number) => void
}

export default function Credits({ credits, winAmount, onAddCredits }: CreditProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleAddCredits = (amount: number) => {
        onAddCredits(amount)
        setIsDialogOpen(false)
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
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {winAmount > 0 && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-md animate-pulse text-center">WIN! +{winAmount}</div>
            )}
        </div>
    )
}