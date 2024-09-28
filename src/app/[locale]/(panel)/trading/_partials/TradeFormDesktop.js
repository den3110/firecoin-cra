import { useTranslation } from "react-i18next";
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
import CandleTypes from "./CandleTypes";



function TradeFormDesktop({symbol}) {
    const {t } = useTranslation()

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

    const handleSetAll = () => {
        setAmount(selectedAccount === "LIVE" ? data?.d.availableBalance : data?.d.demoBalance);
    };


    const handleInputClick = () => {
        if (!isDesktop) {
            setInputOpened(true);
        }
    };


    const [selectedValue, setSelectedValue] = useState('38s');

    const [candleType, setCandleType] = useState('38');
    const [minAmount, setMinAmount] = useState(1);
  
    const handleChange = (event) => {
        console.log(event.target.getAttribute('value'));
      setSelectedValue(event.target.value);
    };


    const handleSelectCandleType = (event) => {
       const type =event.target.getAttribute('value');
       console.log('selected type ', type);
       const minAmount = event.target.getAttribute('minAmount')
       setMinAmount(minAmount)
       setCandleType(type);
    };

    return (
    <div className="border border-custom-border bg-secondarySidebar p-3 mt-10" style={{ height: "700px" }}>

              <div className="w-64 mb-4">
            <p className="sm:text-xs lg:text-sm text-light mb-2 hidden sm:block">{t("type")}</p>

      <div className="mt-2 lg:grid grid-cols-2 gap-[6px]">
        {CandleTypes.map((candle)=>{
            return <>
             <a
            href="#"
            value={candle.value}
            minAmount={candle.minAmount}
            className={`block rounded-[10px] py-2 bg-custom-chart-title hover:bg-gradient-primary text-center text-light hover:cursor-pointer hover:text-light ${candle.value == candleType && "bg-gradient-primary"}`}
            onClick={handleSelectCandleType}
        >
            {candle.type}
        </a>
            </>
        })}
               
            </div>
      

      </div>
      <p className="sm:text-xs lg:text-sm text-light mb-2 sm:block">{t("min_amount")} : {minAmount}</p>

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
               <div className="mt-2 sm:mt-0 lg:mt-2">
                    <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-1 lg:gap-3">
                        <button
                            className="bg-success-50 hover:brightness-[115%] transition rounded-[10px] text-light py-1.5 px-2 flex justify-center items-center h-[47px] sm:h-[30px] lg:h-[60px] disabled:cursor-not-allowed disabled:bg-text order-last sm:order-none"
                            // disabled={!isBetSession || isSubmitting}
                            // onClick={handleSubmit("UP")}
                        >
                            <span className="uppercase text-base lg:text-xl">{t("long")}</span>
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
                      
                        <button
                            className="bg-danger hover:brightness-[115%] transition rounded-[10px] text-light py-1.5 px-2 flex justify-center items-center h-[47px] sm:h-[30px] lg:h-[60px] disabled:cursor-not-allowed disabled:bg-text order-first sm:order-none"
                            // disabled={!isBetSession || isSubmitting}
                            // onClick={handleSubmit("DOWN")}
                        >
                            <span className="uppercase text-base lg:text-xl">{t("short")}</span>
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
    );
}



  
export default TradeFormDesktop;