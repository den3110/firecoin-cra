"use client";

import clsx from "clsx";
import Formatter from "@/utils/Formatter";
import Loading from "@/components/Loading";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import useRefillDemoBalanceMutation from "@/hooks/mutations/useRefillDemoBalanceMutation";
import { useIsNotDesktop } from "@/hooks/responsives";
import { register } from "swiper/element/bundle";
import { useDispatch } from "react-redux";
import { setShowExchange } from "@/store/balanceReducer";
import HideBalance from "@/components/HideBalance";
import { useSnackbar } from "notistack";

register();

const ExchangeBalances = () => {
    const {t } = useTranslation();

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const swiperRef = useRef(null);

    const isNotDesktop = useIsNotDesktop();

    const [isRefilling, setIsRefilling] = useState(false);

    const { data: balanceData } = useSpotBalancesQuery();

    const handleResetDemoSuccess = (data) => {
        if(!data.ok){
         enqueueSnackbar(t(data.d?.err_code) , {variant : 'error'})
        }
     };
 
     const handleResetDemoError = (error) => {
     };
 
    const { mutateAsync: refillBalance } = useRefillDemoBalanceMutation(handleResetDemoSuccess, handleResetDemoError);

    const handleRefillDemoBalance = useCallback(() => {
        setIsRefilling(true);
        refillBalance(undefined)
            .then()
            .finally(() => {
                setIsRefilling(false);
            });
    }, [refillBalance]);

    const handleShowExchangeModal = () => {
        dispatch(setShowExchange(true));
    };

    const LiveAccount = (
        <div
            className={clsx(
                "bg-[url('~/public/assets2/images/livebanner.png')] bg-cover bg-no-repeat bg-[50%] rounded-[10px] relative",
                "after:block after:content-[''] after:w-full pt-[55%] lg:pt-[32.99595%] px-2",
            )}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                <span className="text-light/50 leading-none text-lg lg:font-bold mb-4 lg:mb-2">
                    {t("live_account")}
                </span>
                <HideBalance>
                <span className="leading-none text-light text-[30px] lg:text-[34px] lg:font-bold mb-4 lg:mb-2">
                {balanceData && Formatter.formatCurrency(balanceData?.d.availableBalance)}
                </span>
                </HideBalance>
                <button
                    className={clsx(
                        "text-light bg-gradient-primary border-none w-[75%] cursor-pointer relative",
                        "transition-all duration-300 inline-flex items-center justify-center px-4 py-2 text-[1.25rem] leading-[1.5] rounded-[.3rem]",
                        "text-center align-middle select-none box-content lg:box-border",
                    )}
                    onClick={handleShowExchangeModal}
                >
                    <span className="text-light w-5 h-5 bg-cover bg-no-repeat mr-[5px] flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21.981"
                            height="21.986"
                            viewBox="0 0 21.981 21.986"
                        >
                            <g id="conversion" transform="translate(21.981 10.993) rotate(135)">
                                <path
                                    id="Path_26243"
                                    data-name="Path 26243"
                                    d="M14.571,6.8H.971A.918.918,0,0,1,0,5.829a.918.918,0,0,1,.971-.971H12.24L9.034,1.651a.939.939,0,0,1,0-1.36.939.939,0,0,1,1.36,0l4.857,4.857a.887.887,0,0,1,.194,1.069A.934.934,0,0,1,14.571,6.8Z"
                                    transform="translate(0 0)"
                                    className="fill-light"
                                ></path>
                                <path
                                    id="Path_26244"
                                    data-name="Path 26244"
                                    d="M5.828,15.8a.882.882,0,0,1-.68-.291L.291,10.651A.887.887,0,0,1,.1,9.583.934.934,0,0,1,.971,9h13.6a.918.918,0,0,1,.971.971.918.918,0,0,1-.971.971H3.3l3.206,3.206a.939.939,0,0,1,0,1.36A.882.882,0,0,1,5.828,15.8Z"
                                    transform="translate(0 -0.257)"
                                    className="fill-light"
                                ></path>
                            </g>
                        </svg>
                    </span>
                    <span className="text-light text-xl lg:text-base">{t("transfer")}</span>
                </button>
            </div>
        </div>
    );

    const DemoAccount = (
        <Loading loading={isRefilling}>
            <div
                className={clsx(
                    "bg-[url('~/public/assets2/images/winbanner.png')] bg-cover bg-no-repeat bg-[50%] rounded-[10px] relative",
                    "after:block after:content-[''] after:w-full pt-[55%] lg:pt-[32.99595%]",
                )}
            >
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <span className="text-light/50 leading-none text-lg lg:font-bold mb-4 lg:mb-2">
                        {t("demo_account")}
                    </span>
                    <HideBalance>
                    <span className="leading-none text-light text-[30px] lg:text-[34px] lg:font-bold mb-4 lg:mb-2">
                   {balanceData && Formatter.formatCurrency(balanceData?.d.demoBalance)}
                    </span>
                    </HideBalance>
                    <button
                        className={clsx(
                            "text-light bg-gradient-primary border-none w-[75%] cursor-pointer relative",
                            "transition-all duration-300 inline-flex items-center justify-center px-4 py-2 text-[1.25rem] leading-[1.5] rounded-[.3rem]",
                            "text-center align-middle select-none box-content lg:box-border",
                        )}
                        onClick={handleRefillDemoBalance}
                    >
                        <span className="text-light w-5 h-5 bg-cover bg-no-repeat mr-[5px] flex">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17.795"
                                height="18.488"
                                viewBox="0 0 17.795 18.488"
                            >
                                <g id="refresh-01" transform="translate(-1 0.081)">
                                    <path
                                        id="Path_26259"
                                        data-name="Path 26259"
                                        d="M18.8,7.366,17.555-.081,14.993,2.481a8.8,8.8,0,1,0,2.9,10.641.8.8,0,0,0-1.468-.642,7.215,7.215,0,1,1-2.573-8.854l-2.5,2.5Z"
                                        className="fill-light"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span className="text-light text-xl lg:text-base">{t("refill_balance")}</span>
                    </button>
                </div>
            </div>
        </Loading>
    );

    useEffect(() => {
        const handleResize = () => {
            console.log("resize");
            swiperRef.current?.swiper?.updateSize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        swiperRef.current?.swiper?.updateSize();
    }, [isNotDesktop]);

    return (
        <>
            <div className="lg:hidden">
                <swiper-container direction="horizontal" ref={swiperRef} slides-per-view={1} space-between={20}>
                    <swiper-slide>{LiveAccount}</swiper-slide>
                    <swiper-slide>{DemoAccount}</swiper-slide>
                </swiper-container>
            </div>
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-x-[30px]">
                <div className="max-w-1/2">{LiveAccount}</div>
                <div className="max-w-1/2 hidden lg:block">{DemoAccount}</div>
            </div>
        </>
    );
};

export default ExchangeBalances;
