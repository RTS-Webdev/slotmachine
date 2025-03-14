import { Item } from "./types";

export const items: Item[] = [
	{ name: "appelsin" },
	{ name: "bar" },
	{ name: "blomme" },
	{ name: "citron" },
	{ name: "diamant" },
	{ name: "jordbaer" },
	{ name: "kirsebaer" },
	{ name: "klokker" },
	{ name: "melon" },
	{ name: "syv" },
];

export function shuffleArray<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
