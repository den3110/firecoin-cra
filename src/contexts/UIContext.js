import { createContext } from "react";

const UIContext = createContext({
    historyOpened: false,
    setHistoryOpened: (_) => {},
    totalOpenHistory: 0,
    setTotalOpenHistory: (_) => {},
    hideBalances: false,
    setHideBalances: (_) => {},
});

export default UIContext;
