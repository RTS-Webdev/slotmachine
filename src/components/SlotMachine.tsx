"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { items, shuffleArray } from "@/lib/data";
import { useState, useEffect } from "react";
import { Item } from "@/lib/types";
import Credits from "./Credits";
import { Button } from "./ui/button";
import { Coins, Info } from "lucide-react";
import GameInfo from "./GameInfo";

export default function SlotMachine() {
    const [shuffledItemsList, setShuffledItemsList] = useState<Item[][]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [credits, setCredits] = useState(100);
    const [betAmount, setBetAmount] = useState(10);
    const [winAmount, setWinAmount] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const initialShuffledItemsList: Item[][] = Array.from({ length: 3 }).map(
            () => shuffleArray(items)
        );
        setShuffledItemsList(initialShuffledItemsList);
    }, []);

    const addCredits = (amount: number) => {
        setCredits((prev) => prev + amount);
    }

    const spinReels = () => {
        if(isSpinning || credits < betAmount) return;

        setCredits((prev) => prev - betAmount);
        setWinAmount(0);
        setIsSpinning(true);

        const newShuffledItemsList: Item[][] = Array.from({ length: 3 }).map(
            () => shuffleArray(items)
        );
        setShuffledItemsList(newShuffledItemsList);

        const spinTime = 2000 + Math.random() * 2000
        setTimeout(() => {
            stopSpinning()
        }, spinTime)
    }

    const stopSpinning = () => {
        setIsSpinning(false);

        const visibleItems = shuffledItemsList.map((reel) => reel[1]);
        if(visibleItems[0].name === visibleItems[1].name && visibleItems[1].name === visibleItems[2].name) {
            const winMultiplier = visibleItems[0].value || 2;
            const win = betAmount * winMultiplier;
            setWinAmount(win);
            setCredits((prev) => prev + win);
        }
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center bg-gray-200 roundex-l shadow-2xl border-4 border-gray-300 p-4">
                <div className="mb-4 flex justify-between w-full">
                    <Credits credits={credits} winAmount={winAmount} onAddCredits={addCredits} />
                    <div className="flex gap-2">
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => setShowInfo(!showInfo)}
                            className="bg-gray-300 border-gray-400 hover:bg-gray-200"
                        >
                            <Info className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="relative bg-black p-6 rounded-lg border-2 border-gray-300 mb-6">
                    <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />
                    <div className="flex flex-row gap-2 relative z-10">
                        {shuffledItemsList.map((shuffledItems, carouselIndex) => (
                            <Carousel
                                key={carouselIndex}
                                className="border border-black px-8"
                                orientation="vertical"
                                draggable="false"
                                opts={{
                                    align: "center",
                                    loop: true,
                                    dragFree: false,
                                    watchDrag: false,
                                }}
                                plugins={[
                                    AutoScroll({
                                        active: isSpinning,
                                        speed: 10,
                                        startDelay: 0,
                                        direction: "backward",
                                    }),
                                ]}
                            >
                                <CarouselContent className="max-h-48">
                                    {shuffledItems.map((item) => (
                                        <CarouselItem key={item.name} className="pt-4">
                                            <Image
                                                src={`/icons/${item.name}.png`}
                                                alt={item.name}
                                                width={48}
                                                height={48}
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Button
                                variant={"outline"}
                                onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
                                disabled={isSpinning}
                                className="bg-gray-300 border-gray-400 hover:bg-gray-200"
                            >
                                -
                            </Button>
                            <div className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded-md border border-gray-400">
                                <Coins className="h-4 w-4" />
                                <span className="font-bold">{betAmount}</span>
                            </div>
                            <Button
                                variant={"outline"}
                                onClick={() => setBetAmount(Math.max(50, betAmount + 5))}
                                disabled={isSpinning}
                                className="bg-gray-300 border-gray-400 hover:bg-gray-200"
                            >
                                +
                            </Button>
                        </div>

                        <Button
                            onClick={spinReels}
                            disabled={isSpinning || credits < betAmount}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {isSpinning ? "Spinning" : "Spin"}
                        </Button>
                    </div>
                </div>
            </div>

            {showInfo && <GameInfo onClose={() => setShowInfo(false)} />}
        </div>
    );
}
