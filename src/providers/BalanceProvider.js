"use client";

import BalanceContext from "@/contexts/BalanceContext";
import { useState } from "react";

const BalanceProvider = ({ children }) => {
    const localStorageState = localStorage?.getItem('BO_BALANCE_TYPE');

    const balanceState = useState(localStorageState || "LIVE");

    return <BalanceContext.Provider value={balanceState}>{children}</BalanceContext.Provider>;
};

export default BalanceProvider;
