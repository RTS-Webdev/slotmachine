import { Item } from "./types";

export const items: Item[] = [
	{ name: "appelsin", value: 2 },
	{ name: "bar", value: 3 },
	{ name: "blomme", value: 4 },
	{ name: "citron", value: 5 },
	{ name: "diamant", value: 6 },
	{ name: "jordbaer", value: 7 },
	{ name: "kirsebaer", value: 8 },
	{ name: "klokker", value: 9 },
	{ name: "melon", value: 10 },
	{ name: "syv", value: 11 },
];

export function shuffleArray<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
