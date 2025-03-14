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
                    <DialogTitle className="text-2xl">Slotmaskine Info</DialogTitle>
                    <DialogDescription>Lær hvordan du spiller og vind stort</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="how-to-play">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="how-to-play">Sådan Spiller Du</TabsTrigger>
                        <TabsTrigger value="payouts">Udbetalinger</TabsTrigger>
                        <TabsTrigger value="symbols">Symboler</TabsTrigger>
                    </TabsList>

                    <TabsContent value="how-to-play" className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold">Kom i gang</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li>Indstil din indsats ved at bruge + og - knapperne</li>
                            <li>Klik på SPIN knappen for at starte spillet</li>
                            <li>Match 3 identiske symboler for at vinde</li>
                            <li>Forskellige symboler har forskellige udbetalingsværdier</li>
                            <li>Tilføj flere credits når som helst ved at klikke på + knappen ved siden af din saldo</li>
                        </ol>
                    </TabsContent>

                    <TabsContent value="payouts" className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold">Vindende Kombinationer</h3>
                        <p>Match 3 af det samme symbol for at vinde. Hvert symbol har en forskellig multiplikator:</p>
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
                                        <p className="text-sm text-muted-foreground">3x = {item.value}x din indsats</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="symbols" className="space-y-4 mt-4">
                        <h3 className="text-lg font-bold">Symbolinformation</h3>
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
                                    <p className="text-sm text-muted-foreground">Værdi: {item.value}x</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}