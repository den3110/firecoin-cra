"use client";
import { useDesktop } from "@/hooks/responsives";
import Formatter from "@/utils/Formatter";
// BinanceData.js
import React, { useState, useEffect } from "react";

function OrderBook({symbol}) {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
    const [currentPrice, setCurrentPrice] = useState(null); // State for current price
    const [trend, setTrend] = useState("HOLD")
    const isDesktop = useDesktop();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderBookRes = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`);
                const orderBookData = await orderBookRes.json();
                setOrderBook({ bids: orderBookData.bids, asks: orderBookData.asks });

                const currentPriceRes = await fetch(`http://dovio.bo/api/guest/symbol-price?symbol=${symbol}`);
                const currentPriceData = await currentPriceRes.json();
                if(currentPriceData.d.closePrice > currentPrice)
                    setTrend("UP")
                else if(currentPriceData.d.closePrice < currentPrice)
                    setTrend("DOWN")
                else
                    setTrend("HOLD")
                setCurrentPrice(currentPriceData.d.closePrice);

                document.title = `${Formatter.formatNumber(currentPriceData.d.closePrice)} | ${symbol}`
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        if(!currentPrice)
            fetchData();
        const intervalId = setInterval(fetchData, 1000); // Fetch data every second
        return () => clearInterval(intervalId);
    }, [symbol, currentPrice]);

    const getColorTrend = ()=>{
        if(trend == "UP") return "upColorBinance"
        if(trend == "DOWN") return "downColorBinance"
         return "text-light-50"
    }

    const getIconTrend = ()=>{
        if(trend == "UP") return <>
        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23.087"
                                height="11.668"
                                viewBox="0 0 23.087 11.668"
                                className="ml-1"
                            >
                                <path
                                    id="Path_26233"
                                    data-name="Path 26233"
                                    d="M23.429,8H14.678l3.86,3.86-6.016,6.016L7.2,11.891a.728.728,0,0,0-1.025-.065l-5.834,5.1.96,1.1L6.592,13.4l5.353,6.022a.732.732,0,0,0,.524.245h.021a.727.727,0,0,0,.516-.214l6.563-6.563,3.86,3.86Z"
                                    transform="translate(-0.342 -8)"
                                    fill="#0ecb81"
                                ></path>
                            </svg>
        </>
        if(trend == "DOWN") return <>
           <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23.587"
                                height="11.921"
                                viewBox="0 0 23.587 11.921"
                                className="ml-1"
                            >
                                <g id="trend-down" transform="translate(-0.342 -8)">
                                    <path
                                        id="Path_26234"
                                        data-name="Path 26234"
                                        d="M23.929,19.921H14.988l3.944-3.944L12.785,9.831,7.35,15.945a.744.744,0,0,1-1.048.066L.342,10.8l.981-1.122,5.4,4.729L12.2,8.25A.747.747,0,0,1,12.731,8h.022a.743.743,0,0,1,.527.218l6.705,6.705,3.944-3.944Z"
                                        fill="#f6465d"
                                    ></path>
                                </g>
                            </svg></>

        return ""
    }
    return (
        <div className="mb-4">
            {isDesktop && <h2 className="text-light text-lg mb-2">Order Book - {symbol}</h2>}
            
            <div className="grid grid-cols-3 text-light text-xs font-bold">
                <span>Price (USDT)</span>
                <span>Amount ({symbol.replace("USDT", "")})</span>
                <span>Total ({symbol.replace("USDT", "")})</span>
            </div>
            {orderBook.asks
                .slice(0, 5)
                .reverse()
                .map((ask, index) => (
                    <div key={index} className="grid grid-cols-3 downColorBinance">
                        <span>{parseFloat(ask[0]).toFixed(3)}</span>
                        <span>{parseFloat(ask[1]).toFixed(3)}</span>
                        <span>{(parseFloat(ask[0]) * parseFloat(ask[1])).toFixed(3)}</span>
                    </div>
                ))}
            <div className={`${getColorTrend()} flex justify-center items-center py-2 rounded-md bg-primary-gray-700 text-xl`}>
                <span>{currentPrice ? parseFloat(currentPrice).toFixed(2) : "Loading..."}</span> {getIconTrend()}
            </div>
            {orderBook.bids.slice(0, 5).map((bid, index) => (
                <div key={index} className="grid grid-cols-3 upColorBinance">
                    <span>{parseFloat(bid[0]).toFixed(3)}</span>
                    <span>{parseFloat(bid[1]).toFixed(3)}</span>
                    <span>{(parseFloat(bid[0]) * parseFloat(bid[1])).toFixed(3)}</span>
                </div>
            ))}
        </div>
    );
}

export default OrderBook;