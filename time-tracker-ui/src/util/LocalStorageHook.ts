import { useEffect, useState, Dispatch, SetStateAction } from "react";

export function useLocalStorage<S>(key: string, initialValue: S): [S, Dispatch<SetStateAction<S>>] {
    const [value, setValue] = useState<S>(() => {
        let storedValue = localStorage.getItem(key) as any;

        if (storedValue == null) {
            return initialValue;
        }

        try {
            return JSON.parse(storedValue);
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
