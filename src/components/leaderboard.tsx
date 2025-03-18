"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Coins, Trophy, GamepadIcon } from "lucide-react";
import { PlayerStats } from "@/lib/types";
import { STATS_KEY } from "./clientSlotMachine";

export default function Leaderboard() {
    const [topWinners, setTopWinners] = useState<PlayerStats[]>([]);
    const [topLosers, setTopLosers] = useState<PlayerStats[]>([]);
    const [topPlayers, setTopPlayers] = useState<PlayerStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPlayer, setCurrentPlayer] = useState<string>("");

    useEffect(() => {
        const playerName = localStorage.getItem("slotMachinePlayerName");
        if (playerName) {
            setCurrentPlayer(playerName);
        }

        const loadStats = () => {
            const stats = localStorage.getItem(STATS_KEY);
            const playerStats: PlayerStats[] = stats ? JSON.parse(stats) : [];

            // Sort by wins
            const sortedByWins = [...playerStats].sort((a, b) => b.totalWins - a.totalWins);
            setTopWinners(sortedByWins.slice(0, 10));

            // Sort by losses
            const sortedByLosses = [...playerStats].sort((a, b) => b.totalLosses - a.totalLosses);
            setTopLosers(sortedByLosses.slice(0, 10));

            // Sort by games played
            const sortedByGames = [...playerStats].sort((a, b) => b.gamesPlayed - a.gamesPlayed);
            setTopPlayers(sortedByGames.slice(0, 10));

            setIsLoading(false);
        };

        loadStats();

        // Update leaderboard every few seconds
        const interval = setInterval(loadStats, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderLeaderboard = (entries: PlayerStats[], valueType: 'wins' | 'losses' | 'games') => (
        <div className="space-y-4">
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                entries.map((entry, index) => (
                    <div 
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                            entry.name === currentPlayer ? "border-green-500 bg-green-50" : ""
                        }`}
                        style={{
                            backgroundColor: entry.name === currentPlayer ? "rgba(0, 255, 0, 0.1)" :
                                          index === 0 ? "rgba(255, 215, 0, 0.1)" : 
                                          index === 1 ? "rgba(192, 192, 192, 0.1)" : 
                                          index === 2 ? "rgba(205, 127, 50, 0.1)" : "transparent"
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                index === 0 ? "bg-yellow-400 text-yellow-900" : 
                                index === 1 ? "bg-gray-300 text-gray-700" : 
                                index === 2 ? "bg-amber-700 text-amber-100" : "bg-gray-200 text-gray-700"
                            }`}>
                                {index + 1}
                            </div>
                            <span className="font-medium">{entry.name}</span>
                        </div>
                        <div className="font-bold">
                            {valueType === 'wins' && `${entry.totalWins} 💰`}
                            {valueType === 'losses' && `${entry.totalLosses} 💰`}
                            {valueType === 'games' && `${entry.gamesPlayed} 🎮`}
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Slot Machine Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="winners" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="winners" className="flex items-center gap-2">
                            <Trophy className="h-4 w-4" />
                            <span>Top Winners</span>
                        </TabsTrigger>
                        <TabsTrigger value="losers" className="flex items-center gap-2">
                            <Coins className="h-4 w-4" />
                            <span>Top Losers</span>
                        </TabsTrigger>
                        <TabsTrigger value="players" className="flex items-center gap-2">
                            <GamepadIcon className="h-4 w-4" />
                            <span>Most Active</span>
                        </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="winners" className="mt-4">
                        <h3 className="text-lg font-semibold mb-4">Top 10 Winners</h3>
                        {renderLeaderboard(topWinners, 'wins')}
                    </TabsContent>
                    
                    <TabsContent value="losers" className="mt-4">
                        <h3 className="text-lg font-semibold mb-4">Top 10 Biggest Losers</h3>
                        {renderLeaderboard(topLosers, 'losses')}
                    </TabsContent>
                    
                    <TabsContent value="players" className="mt-4">
                        <h3 className="text-lg font-semibold mb-4">Top 10 Most Active Players</h3>
                        {renderLeaderboard(topPlayers, 'games')}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
