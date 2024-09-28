"use client";

import { useState } from "react";

const useLocalStorageState = (key, defaultValue = null) => {
    const [state, setState] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            // console.log(error);
            return defaultValue;
        }
    });

    const setLocalStorageState = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            setState(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // console.log(error);
        }
    };

    return [state, setLocalStorageState];
};

export default useLocalStorageState;
