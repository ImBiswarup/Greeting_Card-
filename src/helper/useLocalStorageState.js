import { useEffect } from "react";

export const useLocalStorageState = (key, state, setState) => {
    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) setState(storedValue);
    }, [setState]);

    useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state]);
};
