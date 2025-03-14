"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { items, shuffleArray } from "@/lib/data";
import { useState, useEffect } from "react";
import { Item } from "@/lib/types";

export default function SlotMachine() {
  const [shuffledItemsList, setShuffledItemsList] = useState<Item[][]>([]);

  useEffect(() => {
    const initialShuffledItemsList: Item[][] = Array.from({ length: 3 }).map(
      () => shuffleArray(items)
    );
    setShuffledItemsList(initialShuffledItemsList);
  }, []);

  return (
    <div className="flex flex-row">
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
              active: true,
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
  );
}
