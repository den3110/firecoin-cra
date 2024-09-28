import { useTranslations } from "next-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import SocketClient from "@/services/SocketClient";
import SocketContext from "@/contexts/SocketContext";
import HttpClient from "@/services/HttpClient";
import BalanceContext from "@/contexts/BalanceContext";
import { useSnackbar } from "notistack";
import OpenHistoryContext from "@/contexts/OpenHistoryContext";
import { useDesktop } from "@/hooks/responsives";
import AmountInputKeyboard from "@/components/AmountInputKeyboard";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import UIContext from "@/contexts/UIContext";

const BetPanel = () => {
    const t = useTranslations();
    const [counter, setCounter] = useState(0);
    const [isBetSession, setIsBetSession] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputOpened, setInputOpened] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const isDesktop = useDesktop();

    const { data, isLoading } = useSpotBalancesQuery();

    const [amount, setAmount] = useState(10);
    const [stringAmount, setStringAmount] = useState(amount.toString());
    const [sentiment, setSentiment] = useState({
        dPercent: 50,
        uPercent: 50,
    });

    const { socketInitialized } = useContext(SocketContext);
    const [selectedAccount] = useContext(BalanceContext);
    const { openHistory, setOpenHistory } = useContext(OpenHistoryContext);
    const { setTotalOpenHistory, totalOpenHistory } = useContext(UIContext);

    const { refetch } = useSpotBalancesQuery();

    const handleIncreaseAmount = (delta = 1) => {
        return () => {
            setAmount(Math.max(0, delta + amount));
        };
    };

    const handlePrices = useCallback(
        (data) => {
            setCounter(data.order);
            setIsBetSession(data.isBetSession);
            localStorage.setItem("CAN", JSON.stringify(data));
        },
        [setCounter, setIsBetSession],
    );

    const handleSentiment = useCallback(
        (data) => {
            setSentiment(data);
        },
        [setSentiment],
    );

    const handleSetAll = () => {
        setAmount(selectedAccount === "LIVE" ? data?.d.availableBalance : data?.d.demoBalance);
    };

    useEffect(() => {
        if (!socketInitialized) {
            return;
        }

        SocketClient.getInstance().socket().on("BO_PRICE", handlePrices);
        SocketClient.getInstance().socket().on("TRADER_SENTIMENT", handleSentiment);

        return () => {
            SocketClient.getInstance().socket().off("BO_PRICE", handlePrices);
            SocketClient.getInstance().socket().off("TRADER_SENTIMENT", handleSentiment);
        };
    }, [handlePrices, handleSentiment, socketInitialized]);

    useEffect(() => {
        setAmount(parseFloat(stringAmount));
    }, [stringAmount]);

    const handleSubmit = (betType) => {
        return () => {
            setIsSubmitting(true);
            HttpClient.instanceClient()
                .post("/api/wallet/binaryoption/bet", {
                    betType,
                    betAmount: amount,
                    betAccountType: selectedAccount || "LIVE",
                })
                .then((res) => res.data)
                .then((data) => {
                    if (!data.ok) {
                        enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                        return;
                    }

                    enqueueSnackbar(t("order_success"), { variant: "success" });
                    setOpenHistory([
                        {
                            createdDatetime: data.d.time,
                            betType: data.d.type,
                            betAmount: data.d.amt,
                        },
                        ...openHistory,
                    ]);
                    setTotalOpenHistory(totalOpenHistory + 1);

                    if (localStorage.getItem("SoundEnabled") !== "false") {
                        document.getElementById("bet").play();
                    }

                    setAmount(10);

                    refetch().then();
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        };
    };

    const handleInputClick = () => {
        if (!isDesktop) {
            setInputOpened(true);
        }
    };

    return (
        <div className="w-full sm:w-[125px] lg:w-[210px] sm:h-full py-2 sm:pb-2 sm:pt-0 lg:py-2 px-2.5 sm:px-[5px] lg:px-2.5 flex flex-col sm:border-l-2 border-l-black overflow-y-auto sm:overflow-y-hidden lg:overflow-y-auto">
            <p className="sm:text-xs lg:text-sm text-light mb-2 hidden sm:block">{t("amount")}</p>
            <div className="flex">
                <button
                    className="block sm:hidden lg:block py-[1px] px-1.5 bg-custom-chart-title text-light text-xl rounded w-full sm:w-auto min-w-[40px] min-h-[40px] leading-[1.5rem] font-bold"
                    onClick={handleIncreaseAmount(-5)}
                >
                    <span className="hidden sm:block">-</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="2"
                        viewBox="0 0 14 2"
                        className="block mx-auto sm:hidden"
                    >
                        <g id="search-zoom-in" transform="translate(-7.991 -13.991)">
                            <line
                                id="Line_1142"
                                data-name="Line 1142"
                                x1="12"
                                transform="translate(8.991 14.991)"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                            ></line>
                        </g>
                    </svg>
                </button>
                <div className="flex-1 p-[5px] mx-[7px] rounded bg-light relative">
                    <input
                        className="w-full border-none focus:ring-0 px-[11px] py-[5px] min-w-[157px] sm:min-w-0 text-base font-normal leading-[1.25rem]"
                        type="number"
                        min={1}
                        step={1}
                        value={amount}
                        onChange={(e) => setAmount(Math.max(0, e.target.value))}
                        onClick={handleInputClick}
                        readOnly={!isDesktop}
                    />
                    <span className="absolute top-2 left-1 text-base">$</span>
                </div>
                <button
                    className="block sm:hidden lg:block py-[1px] px-1.5 bg-custom-chart-title text-light text-xl rounded w-full sm:w-auto min-w-[40px] min-h-[40px] leading-[1.5rem] font-bold"
                    onClick={handleIncreaseAmount(5)}
                >
                    <span className="hidden sm:block">+</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className="block mx-auto sm:hidden"
                    >
                        <g id="search-zoom-in" transform="translate(-7.991 -7.991)">
                            <line
                                id="Line_1141"
                                data-name="Line 1141"
                                y2="12"
                                transform="translate(14.991 8.991)"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                            ></line>
                            <line
                                id="Line_1142"
                                data-name="Line 1142"
                                x1="12"
                                transform="translate(8.991 14.991)"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="2"
                            ></line>
                        </g>
                    </svg>
                </button>
            </div>
            <div className="mt-2 hidden lg:grid grid-cols-3 gap-[6px]">
                <a
                    href="#"
                    className="block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light"
                    onClick={handleIncreaseAmount(5)}
                >
                    +5
                </a>
                <a
                    href="#"
                    className="block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light"
                    onClick={handleIncreaseAmount(10)}
                >
                    +10
                </a>
                <a
                    href="#"
                    className="block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light"
                    onClick={handleIncreaseAmount(20)}
                >
                    +20
                </a>
                <a
                    href="#"
                    className="block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light"
                    onClick={handleIncreaseAmount(50)}
                >
                    +50
                </a>
                <a
                    href="#"
                    className="block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light"
                    onClick={handleIncreaseAmount(100)}
                >
                    +100
                </a>
                <a
                    href="#"
                    className="block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light"
                    onClick={handleSetAll}
                >
                    All
                </a>
            </div>
            <div className="lg:mt-4 order-first sm:order-none flex flex-row sm:flex-col items-center justify-center gap-1 sm:gap-0 lg:gap-1">
                <div className="sm:mb-0.1">
                    <div className="flex justify-center items-center">
                        <div className="sm:m-2 text-light sm:text-[0.5rem] lg:text-sm">{t("profit")}</div>
                        <div className="ml-2 sm:ml-0 sm:my-2 text-danger text-xl sm:text-[13px] lg:text-xl">
                            {process.env.NEXT_PUBLIC_PROFIT_PERCENT}%
                        </div>
                    </div>
                </div>
                <div className="text-success-50 text-[24px] sm:text-[15px] lg:text-[30px] leading-[20px] text-center font-bold">
                    +${Math.floor(amount * (1 + process.env.NEXT_PUBLIC_PROFIT_PERCENT / 100) * 100) / 100}
                </div>
            </div>
            <div className="hidden sm:block lg:mb-4 sm:h-auto">
                <div className="sm:mt-2 lg:my-4 text-light pb-1 text-center hidden sm:block text-sm sm:text-[0.5rem] lg:text-sm">
                    {t("traders_sentiments")}
                </div>
                <div>
                    <div className="mb-2 overflow-hidden rounded h-[.4rem] flex">
                        <div className="flex-1 bg-danger transition-[width]"></div>
                        <div
                            className="bg-success-50 transition-[width]"
                            style={{ width: sentiment.uPercent + "%" }}
                        ></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-danger sm:text-[0.5rem] lg:text-sm">{sentiment.dPercent}%</div>
                        <div className="text-success-50 sm:text-[0.5rem] lg:text-sm">{sentiment.uPercent}%</div>
                    </div>
                </div>
            </div>
            <div className="block sm:hidden fixed top-[33%] -translate-y-1/3 left-4">
                <div className="relative">
                    <div className="mb-2 overflow-hidden rounded w-[.4rem] flex flex-col h-[30vh]">
                        <div className="bg-success-50 transition" style={{ height: sentiment.uPercent + "%" }}></div>
                        <div className="flex-1 bg-danger transition"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-success-50 text-xs absolute -top-2 -right-6">{sentiment.uPercent}%</div>
                        <div className="text-danger text-xs absolute -bottom-2 -right-6">{sentiment.dPercent}%</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-2 sm:mt-0 lg:mt-2">
                    <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-1 lg:gap-3">
                        <button
                            className="bg-success-50 hover:brightness-[115%] transition rounded-[10px] text-light py-1.5 px-2 flex justify-center items-center h-[47px] sm:h-[30px] lg:h-[60px] disabled:cursor-not-allowed disabled:bg-text order-last sm:order-none"
                            disabled={!isBetSession || isSubmitting}
                            onClick={handleSubmit("UP")}
                        >
                            <span className="uppercase text-base lg:text-xl">{t("buy")}</span>
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
                                    fill="#fff"
                                ></path>
                            </svg>
                        </button>
                        <div className="bg-custom-chart-title rounded-[10px] text-light py-1.5 px-2 flex flex-col justify-center items-center h-[47px] sm:h-[30px] lg:h-[60px] disabled:cursor-not-allowed">
                            <div className="text-sm sm:text-[10px] lg:text-sm">
                                {isBetSession ? t("please_bet") : t("wait_time")}
                            </div>
                            <div className="text-lg sm:text-[10px] lg:text-lg leading-[1.75rem] sm:leading-[normal] lg:leading-[1.75rem] font-bold">
                                {counter}s
                            </div>
                        </div>
                        <button
                            className="bg-danger hover:brightness-[115%] transition rounded-[10px] text-light py-1.5 px-2 flex justify-center items-center h-[47px] sm:h-[30px] lg:h-[60px] disabled:cursor-not-allowed disabled:bg-text order-first sm:order-none"
                            disabled={!isBetSession || isSubmitting}
                            onClick={handleSubmit("DOWN")}
                        >
                            <span className="uppercase text-base lg:text-xl">{t("sell")}</span>
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
                                        fill="#fff"
                                    ></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <AmountInputKeyboard
                inputOpened={inputOpened}
                onInputOpened={setInputOpened}
                onChange={(value) => setAmount(value)}
                amount={amount}
            />
        </div>
    );
};

export default BetPanel;
