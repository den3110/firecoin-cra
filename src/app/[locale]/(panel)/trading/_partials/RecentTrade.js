"use client";
import { useDesktop } from "@/hooks/responsives";
import Formatter from "@/utils/Formatter";
// BinanceData.js
import React, { useState, useEffect } from "react";

function RecentTrade({symbol}) {
    const [recentTrades, setRecentTrades] = useState([]);
    const isDesktop = useDesktop();

    useEffect(() => {
        const fetchData = async () => {
            try {                          
                const tradesRes = await fetch(`https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=15`);
                const tradesData = await tradesRes.json();
                setRecentTrades(tradesData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000); // Fetch data every second
        return () => clearInterval(intervalId);
    }, [symbol]);

   
    return (
        <div className="mb-4">
            { isDesktop && <h2 className="text-light text-lg mb-2">Recent Trades</h2>}
        

        <div className="grid grid-cols-3 text-light text-xs font-bold">
            <span>Price</span>
            <span>Amount</span>
            <span>Time</span>
        </div>
        {recentTrades.map((trade, index) => (
            <div key={index} className="grid grid-cols-3">
                <span className={trade.isBuyerMaker ? "upColorBinance" : "downColorBinance"}>
                    {parseFloat(trade.price).toFixed(3)}
                </span>

                <span className="text-light-50">{parseFloat(trade.qty).toFixed(3)}</span>
                <span className="text-light-50">{new Date(trade.time).toLocaleTimeString()}</span>
            </div>
        ))}
    </div>
    );
}

export default RecentTrade;