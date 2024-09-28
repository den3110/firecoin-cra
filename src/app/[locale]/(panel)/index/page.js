"use client";

import BetPanel from "@/components/BetPanel";
import TradeContext from "@/contexts/TradeContext";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import SocketClient from "@/services/SocketClient";
import AnalysisInfo from "@/components/AnalysisInfo";
import SocketContext from "@/contexts/SocketContext";
import PriceDataContext from "@/contexts/PriceDataContext";
import HttpClient from "@/services/HttpClient";
import BetHistory from "@/components/history/BetHistory";
import { Transition } from "@headlessui/react";
import UIContext from "@/contexts/UIContext";
import OpenHistoryContext from "@/contexts/OpenHistoryContext";
import BetResult from "@/components/BetResult";
import { useDesktop, useIsNotSmallMobile } from "@/hooks/responsives";
import clsx from "clsx";
import TradeHistoryMobileModal from "@/components/modals/TradeHistoryMobileModal";
import TradeStreak from "@/components/TradeStreak";

// const TradeChart = dynamic(() => import("@/components/TradeChart"), { ssr: false });
const TradeChart = lazy(() => import("@/components/TradeChart"));

const IndexPage = () => {
    const [isBetSession, setIsBetSession] = useState(false);
    const [counter, setCounter] = useState(0);

    const { socketInitialized } = useContext(SocketContext);
    const [priceData, setPriceData] = useState([]);
    const [openHistory, setOpenHistory] = useState([]);

    const { historyOpened, setHistoryOpened } = useContext(UIContext);

    const isDesktop = useDesktop();
    const isNotSmallMobile = useIsNotSmallMobile();

    useEffect(() => {
        document.body.classList.add("no-scroll-index");

        return () => {
            document.body.classList.remove("no-scroll-index");
        };
    }, []);

    useEffect(() => {
        if (!socketInitialized) {
            return;
        }

        SocketClient.getInstance().socket().emit("TRADER_SENTIMENT_SUBSCRIBE");
        SocketClient.getInstance().socket().emit("BO_RESULT_SUBSCRIBE");

        return () => {
            SocketClient.getInstance().socket().emit("TRADER_SENTIMENT_UNSUBSCRIBE");
            SocketClient.getInstance().socket().emit("BO_RESULT_UNSUBSCRIBE");
        };
    }, [socketInitialized]);

    // Load data from API
    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/prices")
            .then((res) => res.data)
            .then((_data) => {
                setPriceData(_data.d);
            });
    }, []);

    useEffect(() => {
        setHistoryOpened(false);
    }, [setHistoryOpened]);

    return (
        <TradeContext.Provider value={{ isBetSession, setIsBetSession, counter, setCounter }}>
            <PriceDataContext.Provider value={priceData}>
                <OpenHistoryContext.Provider value={{ openHistory, setOpenHistory }}>
                    <div className="flex flex-col sm:flex-row h-full relative">
                        <div
                            className={clsx(
                                "h-full sm:h-auto candle-wrap relative overflow-y-auto sm:overflow-y-hidden lg:overflow-y-auto",
                                {
                                    "sm:w-[calc(100%-125px)] lg:w-[calc(100%-210px)]": !historyOpened,
                                    "sm:w-[calc(100%-250px)] lg:w-[calc(100%-420px)]": historyOpened,
                                },
                            )}
                        >
                            <div className="flex flex-col h-full">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <TradeChart />
                                </Suspense>
                                <AnalysisInfo />
                            </div>
                        </div>
                        <div
                            className={clsx(
                                "bg-secondary sm:absolute sm:top-0 sm:right-0 transition-[width] sm:h-full flex",
                                {
                                    "w-full sm:w-[125px] lg:w-[210px]": !historyOpened,
                                    "w-full sm:w-[250px] lg:w-[420px]": historyOpened,
                                },
                            )}
                        >
                            <BetPanel />
                            <Transition
                                show={isNotSmallMobile && historyOpened}
                                enter="transition transform"
                                enterFrom="w-0"
                                enterTo="w-full sm:w-[125px] lg:w-[210px]"
                                leave="transition transform"
                                leaveFrom="w-full sm:w-[125px] lg:w-[210px]"
                                leaveTo="w-0"
                                className="sm:h-full py-2 sm:pt-0 lg:py-2 px-2.5 overflow-y-hidden"
                            >
                                <BetHistory />
                            </Transition>
                        </div>
                        <TradeStreak />
                    </div>
                    <BetResult />
                    {!isDesktop && <TradeHistoryMobileModal />}
                </OpenHistoryContext.Provider>
            </PriceDataContext.Provider>
        </TradeContext.Provider>
    );
};

export default IndexPage;
