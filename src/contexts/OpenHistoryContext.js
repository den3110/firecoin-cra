import { createContext } from "react";

const OpenHistoryContext = createContext({
    openHistory: [],
    setOpenHistory: (_) => {},
});

export default OpenHistoryContext;
