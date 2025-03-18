import { clsx, type ClassValue } from "clsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error("Error reading from localStorage:", error);
			return initialValue;
		}
	});

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have the same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;

			// Save state
			setStoredValue(valueToStore);

			// Save to localStorage
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.error("Error writing to localStorage:", error);
		}
	};

	return [storedValue, setValue] as const;
}
