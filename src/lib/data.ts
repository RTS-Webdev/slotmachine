import { Item } from "./types";

export const items: (Item & { weight: number })[] = [
	{ name: "citron", value: 2, weight: 20 },
	{ name: "kirsebaer", value: 3, weight: 15 },
	{ name: "appelsin", value: 4, weight: 12 },
	{ name: "blomme", value: 5, weight: 10 },
	{ name: "melon", value: 6, weight: 8 },
	{ name: "jordbaer", value: 7, weight: 6 },
	{ name: "bar", value: 8, weight: 5 },
	{ name: "klokker", value: 9, weight: 4 },
	{ name: "diamant", value: 10, weight: 3 },
	{ name: "syv", value: 15, weight: 1 },
];

export function getWeightedRandomItem(): Item {
	const totalWeight = items.reduce(
		(sum, item) => sum + item.weight,
		0
	);
	let random = Math.random() * totalWeight;
	for (const item of items) {
		random -= item.weight;
		if (random <= 0) {
			const { weight, ...itemWithoutWeight } = item;
			return itemWithoutWeight;
		}
	}

	return items[0];
}

export function generateWeightedItemsArray(length: number): Item[] {
	const result: Item[] = [];
	for (let i = 0; i < length; i++) {
		result.push(getWeightedRandomItem());
	}
	return result;
}

export function shuffleArray<T>(array: T[]): T[] {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
