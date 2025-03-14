"use client"

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { items } from "@/lib/data";
import Image from "next/image";

type GameInfoProps = {
    onClose: () => void;
}

export default function GameInfo({ onClose }: GameInfoProps) {
    return (
        <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Slot Machine Info</DialogTitle>
                    <DialogDescription>Learn how to play and win big</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="how-to-play">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="how-to-play">How to Play</TabsTrigger>
                        <TabsTrigger value="payouts">Payouts</TabsTrigger>
                        <TabsTrigger value="symbols">Symbols</TabsTrigger>
                    </TabsList>

                    <TabsContent value="how-to-play" className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold">Getting Started</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Set your bet amount using the + and - buttons</li>
                            <li>Click the SPIN button to start the game</li>
                            <li>Match 3 identical symbols to win</li>
                            <li>Different symbols have different payout values</li>
                            <li>Add more credits anytime by clicking the + button next to your balance</li>
                        </ol>
                    </TabsContent>

                    <TabsContent value="payouts" className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold">Winning Combinations</h3>
                        <p>Match 3 of the same symbol to win. Each symbol has a different multiplier:</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {items.map((item) => (
                                <div key={item.name} className="flex items-center gap-3 p-2 border rounded-md">
                                    <Image
                                        src={`/icons/${item.name}.png`}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                    />
                                    <div>
                                        <p className="font-medium capitalize">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">3x = {item.value}x your bet</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="symbols" className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold">Symbol Information</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {items.map((item) => (
                                <div key={item.name} className="flex flex-col items-center p-4 border rounded-md">
                                    <Image
                                        src={`/icons/${item.name}.png`}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                    />
                                    <p className="mt-2 font-medium capitalize">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Value: {item.value}x</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}