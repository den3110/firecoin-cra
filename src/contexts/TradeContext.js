import { createContext } from "react";

const TradeContext = createContext({
    counter: 0,
    isBetSession: false,
    setCounter: (_) => {},
    setIsBetSession: (_) => {},
});

export default TradeContext;
