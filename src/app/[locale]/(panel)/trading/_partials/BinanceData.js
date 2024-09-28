"use client";
import Formatter from "@/utils/Formatter";
// BinanceData.js
import React, { useState, useEffect } from "react";
import OrderBook from "./OrderBook";
import RecentTrade from "./RecentTrade";

const BinanceData = ({ symbol }) => { 

    return (
        <div className="border border-custom-border bg-secondarySidebar p-3 mt-10 text-center" style={{ height: "700px" }}>
            <OrderBook symbol={symbol}/>
            <hr/>
            <RecentTrade symbol={symbol}/>
        </div>
    );
};

export default BinanceData;
