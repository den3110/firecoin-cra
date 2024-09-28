"use client";

import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "@/store/balanceReducer";
import generalReducer from "@/store/generalReducer";
import authReducer from "@/store/authReducer";
import jackpotReducer from "@/store/jackpotReducer";

const store = configureStore({
    reducer: {
        general: generalReducer,
        balance: balanceReducer,
        auth: authReducer,
        jackpot: jackpotReducer,
    },
});

export default store;
