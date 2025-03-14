"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientOnlySlotMachine = dynamic(() => import("./clientSlotMachine"), {
    ssr: false,
});

export default function SlotMachine() {
    return (
        <Suspense fallback={<div className="flex flex-col items-center gap-6">Loading slot machine...</div>}>
            <ClientOnlySlotMachine />
        </Suspense>
    );
}
