"use client";

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import Formatter from "@/utils/Formatter";
import BalanceDeposit from "@/components/modals/balance/_partials/BalanceDeposit";
import BalanceWithdraw from "@/components/modals/balance/_partials/BalanceWithdraw";
import HttpClient from "@/services/HttpClient";
import { useDispatch, useSelector } from "react-redux";
import { hideBalanceModal, setSelectTab } from "@/store/balanceReducer";

const BalanceModal = () => {
    const {t } = useTranslation();
    const { visible, transferConfirm, selectedTab } = useSelector((state) => state.balance);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [withdrawConfig, setWithdrawConfig] = useState();

    const { data: balanceData } = useSpotBalancesQuery();
    const handleSelectTab = useCallback(
        (tab) => {
            return () => {
                dispatch(setSelectTab(tab));
            };
        },
        [dispatch],
    );

    const handleCloseModal = useCallback(() => {
        dispatch(hideBalanceModal());
    }, [dispatch]);

    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/withdraw-config")
            .then((res) => res.data)
            .then(({ d: data }) => {
                setWithdrawConfig(data);
            });
    }, []);

    useEffect(() => {
        // add .no-scroll class to body
        if (visible) {
            document.body.classList.add("no-scroll");

            return () => {
                document.body.classList.remove("no-scroll");
            };
        }
    }, [visible]);

    

    if (!visible) return null;


    return (
        <div className="bg-secondary/60 pr-[15px] block fixed top-0 left-0 z-[1050] w-full h-full overflow-hidden outline-0">
            <div className="m-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 text-light w-full max-w-[500px] absolute pointer-events-auto">
                <div className="rounded-[10px] bg-secondarySidebar relative flex flex-col h-dvh lg:h-auto w-full pointer-events-auto outline-0 border border-secondary-600 p-5 lg:p-0">
                    <button
                        type="button"
                        className="text-light w-[30px] h-[30px] leading-[30px] rounded-full absolute opacity-100 z-[2] left-auto right-0 top-0 lg:-right-[35px] outline-none lg:bg-light/30 flex items-center justify-center cursor-pointer float-right text-[1.5rem] font-bold [text-shadow:0_1px_0_#fff]"
                        onClick={handleCloseModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-[20px]">
                            <g
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth="2"
                                fill="#ffffff"
                                stroke="#ffffff"
                                className="nc-icon-wrapper"
                            >
                                <g className="nc-interact_menu-close-2-o-32">
                                    <path
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeMiterlimit="10"
                                        d="M2 6h28"
                                        transform="translate(0 10.00) rotate(45.00 16 6)"
                                    ></path>
                                    <path
                                        data-color="color-2"
                                        fill="none"
                                        strokeMiterlimit="10"
                                        d="M2 16h28"
                                        opacity="0"
                                    ></path>
                                    <path
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeMiterlimit="10"
                                        d="M2 26h28"
                                        transform="translate(0 -10) rotate(-45 16 26)"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                    <div className="mt-0 rounded-tl-[10px] rounded-tr-[10px] overflow-hidden p-0 relative flex-1 flex-shrink">
                        <div className="header-tab h-[48px]">
                            <ul className="flex border-b border-b-light/[.23] bg-transparent pl-0 mb-0">
                                <li
                                    className={clsx(
                                        "w-1/2 h-full text-center bg-transparent text-base leading-[48px] text-light cursor-pointer",
                                        {
                                            "font-bold relative before:content-[''] before:h-1 before:w-[160px] before:rounded-t-[3px] before:block before:absolute before:-bottom-[1px] before:left-1/2 before:-ml-[80px] before:bg-gradient-primary border-none":
                                                selectedTab === "deposit",
                                        },
                                    )}
                                    onClick={handleSelectTab("deposit")}
                                >
                                    <span>{t("deposit")}</span>
                                </li>
                                <li
                                    className={clsx(
                                        "w-1/2 h-full text-center bg-transparent text-base leading-[48px] text-light cursor-pointer",
                                        {
                                            "font-bold relative before:content-[''] before:h-1 before:w-[160px] before:rounded-t-[3px] before:block before:absolute before:-bottom-[1px] before:left-1/2 before:-ml-[80px] before:bg-gradient-primary border-none":
                                                selectedTab === "withdraw",
                                        },
                                    )}
                                    onClick={handleSelectTab("withdraw")}
                                >
                                    <span>{t("withdraw")}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="">
                            <Loading loading={loading}>
                                <div className="p-5">
                                    <div className="content-tab">
                                        <div
                                            className={clsx("flex", {
                                                "mb-6": selectedTab === "deposit",
                                                "mb-3": selectedTab === "withdraw",
                                            })}
                                        >
                                            <div className="list-balance flex-1 flex-shrink basis-0">
                                                <div className="box-selected-unit border border-custom-border bg-secondary h-10 rounded-[5px] relative">
                                                    <div className="selected-unit-deposit py-[5px] pr-5 pl-[3px] flex items-center relative cursor-pointer">
                                                        <div className="icon-usdt-rounded"></div>
                                                        <div className="info-t">
                                                            <div className="amount">
                                                                <span className="text-light">
                                                                    {Formatter.formatNumber(
                                                                        balanceData?.d.usdtAvailableBalance,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {selectedTab === "deposit" ? (
                                            <BalanceDeposit config={withdrawConfig} />
                                        ) : (
                                            <BalanceWithdraw config={withdrawConfig} />
                                        )}
                                    </div>
                                </div>
                            </Loading>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceModal;
