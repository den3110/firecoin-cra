import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import Formatter from "@/utils/Formatter";
import { setShowExchange } from "@/store/balanceReducer";
import { useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import { useIsNotDesktop } from "@/hooks/responsives";

import laImg from "@/assets/images/la.svg";

const ExchangeModal = () => {
    const {t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    const showExchange = useSelector((state) => state.balance.showExchange);

    const { data: balanceData, refetch: refetchBalance } = useSpotBalancesQuery();

    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [action, setAction] = useState("usdtbo");
    const [success, setSuccess] = useState(false);

    const isNotDesktop = useIsNotDesktop();

    const handleChangeAction = () => {
        if (action === "usdtbo") {
            setAction("bousdt");
            return;
        }

        setAction("usdtbo");
    };

    const handleClose = (e) => {
        if (e && e.target !== e.currentTarget) {
            return;
        }

        setSuccess(false);
        setAction("usdtbo");
        setAmount("");
        dispatch(setShowExchange(false));
    };

    const handleCloseBtn = (e) => {
        setSuccess(false);
        setAction("usdtbo");
        setAmount("");
        dispatch(setShowExchange(false));
    };

    const handleSubmit = () => {
        setLoading(true);

        HttpClient.instanceClient()
            .post("/api/wallet/binaryoption/move-" + action, {
                amount,
                confirmed: true,
            })
            .then(({ data }) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    return;
                }

                refetchBalance().then();

                if (isNotDesktop) {
                    setSuccess(true);
                    return;
                }

                enqueueSnackbar(
                    t("you_have_successfully_transfer", {
                        amount: Formatter.formatNumber(amount) + " USDT",
                        boTransferType: action === "usdtbo" ? t("live_account") : `USDT ${t("wallet")}`,
                        strong: (chunks) => `${chunks}`,
                    }),
                    { variant: "success" },
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSetAll = () => {
        if (action === "usdtbo") {
            setAmount(balanceData?.d?.usdtAvailableBalance || 0);
            return;
        }

        setAmount(balanceData?.d?.availableBalance || 0);
    };

    useEffect(() => {
        // add .no-scroll class to body
        if (showExchange) {
            document.body.classList.add("no-scroll");

            return () => {
                document.body.classList.remove("no-scroll");
            };
        }
    }, [showExchange]);

    return (
        <Transition show={showExchange}>
            <Transition.Child
                enter="transition-opacity"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="modal z-[9999] lg:z-[99] fixed top-0 left-0 w-full h-full outline-0 bg-custom-border lg:bg-black/50"></div>
            </Transition.Child>
            <Transition.Child
                enter="transition transform lg:transform-none"
                enterFrom="-translate-x-full lg:opacity-0"
                enterTo="translate-x-0 lg:opacity-100"
                leave="transition transform lg:transform-none"
                leaveFrom="translate-x-0 lg:opacity-100"
                leaveTo="-translate-x-full lg:opacity-0"
                className="z-[9999] fixed top-0 left-0 w-full h-full bg-secondary lg:bg-transparent"
                onClick={handleClose}
            >
                <div className="modal-dialog text-light mx-auto lg:my-7 w-full lg:w-auto h-full lg:h-auto lg:min-w-[500px] min-w-[576px]:max-w-[500px] absolute lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 pointer-events-auto">
                    <div className="modal-content-info h-full">
                        <button
                            className={clsx(
                                "text-light w-[30px] h-[30px] rounded-full absolute top-[7px] right-[5px] lg:-top-[5px] lg:-right-[35px] lg:bg-light/30 flex items-center justify-center",
                                "z-[10000] float-right text-[1.5rem] font-bold leading-none [text-shadow:0_1px_0_#fff] opacity-50",
                            )}
                            onClick={handleCloseBtn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 overflow-hidden">
                                <g
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                    strokeWidth="2"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    className="nc-icon-wrapper"
                                >
                                    <g className="nc-interact_menu-close-2-o-32">
                                        <path
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 6h28"
                                            transform="translate(0 10.00) rotate(45.00 16 6)"
                                        ></path>
                                        <path
                                            data-color="color-2"
                                            fill="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 16h28"
                                            opacity="0"
                                        ></path>
                                        <path
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 26h28"
                                            transform="translate(0 -10) rotate(-45 16 26)"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <Loading
                            className="modal-body-popup lg:text-center p-0 lg:bg-custom-chart-title flex flex-col lg:block h-full lg:h-auto"
                            loading={loading}
                        >
                            <div className="lg:hidden header-mobile px-5 py-4 mb-2">
                                <span className="text-[24px] font-bold mb-2 leading-[1.2]">
                                    {success && isNotDesktop ? t("transfer_successfully") : t("transfer")}
                                </span>
                            </div>
                            {(!success || !isNotDesktop) && (
                                <div className="header relative bg-secondary flex">
                                    <div
                                        className={clsx(
                                            "left-header p-8 flex-1 max-w-[50%] flex items-center flex-col text-center",
                                            {
                                                "order-first border-r border-r-light/[.17]": action === "usdtbo",
                                            },
                                        )}
                                    >
                                        <span className="text-sm mb-2">
                                            <span className="text-primary uppercase mr-1">USDT</span>
                                            <span>Wallet</span>
                                        </span>
                                        <span className="text-[1.625rem] font-bold">
                                            {Formatter.formatNumber(balanceData?.d?.usdtAvailableBalance || 0)}
                                        </span>
                                    </div>
                                    <div
                                        className={clsx(
                                            "right-header p-8 flex-1 max-w-[50%] flex items-center flex-col",
                                            {
                                                "order-first border-r border-r-light/[.17]": action === "bousdt",
                                            },
                                        )}
                                    >
                                        <span className="text-sm mb-2">{t("live_account")}</span>
                                        <span className="text-[1.625rem] font-bold">
                                            {Formatter.formatNumber(balanceData?.d?.availableBalance || 0)}
                                        </span>
                                    </div>
                                    <div
                                        className="change-amount-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                        onClick={handleChangeAction}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            className="w-10 h-10"
                                        >
                                            <g
                                                id="Group_10897"
                                                data-name="Group 10897"
                                                transform="translate(-559.431 -202.553)"
                                            >
                                                <g
                                                    id="Group_4613"
                                                    data-name="Group 4613"
                                                    transform="translate(559.431 202.553)"
                                                >
                                                    <g
                                                        id="Rectangle_2919"
                                                        data-name="Rectangle 2919"
                                                        transform="translate(0)"
                                                        fill="#e9f0fa"
                                                        stroke="#e5e5e5"
                                                        strokeWidth="1"
                                                    >
                                                        <rect width="30" height="30" rx="15" stroke="none"></rect>
                                                        <rect
                                                            x="0.5"
                                                            y="0.5"
                                                            width="29"
                                                            height="29"
                                                            rx="14.5"
                                                            fill="none"
                                                        ></rect>
                                                    </g>
                                                </g>
                                                <g id="conversion" transform="translate(567.976 210.905)">
                                                    <path
                                                        id="Path_13963"
                                                        data-name="Path 13963"
                                                        d="M13.474,6.51H1V5.376H12.1l-3.4-3.4.8-.8,4.37,4.37a.567.567,0,0,1-.4.968Z"
                                                        transform="translate(-1 -1.172)"
                                                        fill="#031219"
                                                    ></path>
                                                    <path
                                                        id="Path_13964"
                                                        data-name="Path 13964"
                                                        d="M5.536,33.338l-4.37-4.37a.567.567,0,0,1,.4-.968H14.041v1.134H2.936l3.4,3.4Z"
                                                        transform="translate(-1 -20.395)"
                                                        fill="#031219"
                                                    ></path>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            )}
                            <div className="content bg-secondary lg:bg-secondarySidebar lg:p-8 flex-1 flex items-center flex-col text-center justify-between lg:justify-start">
                                {success && isNotDesktop ? (
                                    <>
                                        <div className="h-full flex flex-col">
                                            <div className="content text-center p-8 bg-transparent">
                                                <img
                                                    src={laImg}
                                                    alt="la img"
                                                    className="max-w-[137px] h-auto align-middle mx-auto"
                                                />
                                            </div>
                                            <div className="mt-12">
                                                <span className="text-center">
                                                    {t.rich("you_have_successfully_transfer", {
                                                        amount: Formatter.formatNumber(amount || 0) + " USDT",
                                                        boTransferType:
                                                            action === "usdtbo"
                                                                ? t("live_account")
                                                                : `USDT ${t("wallet")}`,
                                                        strong: (chunks) => (
                                                            <span className="font-bold text-primary">{chunks}</span>
                                                        ),
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="px-5 py-4 lg:p-0 w-full">
                                            <button
                                                className="text-light bg-success-50 border-none rounded-[6px] px-10 py-[11px] cursor-pointer relative transition-all duration-300 font-bold inline-flex items-center justify-center w-full lg:w-[75%]"
                                                onClick={handleCloseBtn}
                                            >
                                                {t("close")}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-full px-5 lg:px-0">
                                            <h4 className="lg:hidden text-xs text-left mt-4 mb-2">
                                                {t("transfer_amount")}
                                            </h4>
                                            <div className="relative mb-4 w-full lg:w-[75%] mx-auto border-b lg:border-b-0 border-b-light/20">
                                                <input
                                                    type="number"
                                                    placeholder={
                                                        isNotDesktop
                                                            ? t("please_enter_transfer_amount")
                                                            : t("enter_amount")
                                                    }
                                                    className={clsx(
                                                        "lg:bg-light lg:border-b lg:border-b-[#868f93] rounded-[3px] lg:text-secondary-600 lg:px-2.5 h-10 leading-[40px] w-full block lg:text-base focus:outline-none focus:ring-0 focus:border-none focus:border-b",
                                                        "bg-transparent text-sm text-light border-none px-0",
                                                    )}
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                                <div className="input-append absolute top-0 right-0 rounded-r overflow-hidden flex items-center lg:block">
                                                    <span className="lg:hidden bg-[url('~/public/assets/images/icon-usdt-rounded.svg')] bg-cover bg-no-repeat w-[30px] h-[30px] mr-2" />
                                                    <span className="lg:hidden border-line relative mr-2 after:content-[''] after:inline-block after:w-[1px] after:h-[30px] after:absolute after:top-1/2 after:left-0 after:bg-light/20 after:-translate-y-1/2"></span>
                                                    <button
                                                        className="text-primary uppercase whitespace-nowrap bg-transparent lg:bg-light inline-block text-center align-middle select-none border border-transparent lg:px-3 py-[0.375rem] text-base leading-[1.5] font-normal"
                                                        onClick={handleSetAll}
                                                    >
                                                        {t("all")}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="lg:hidden text-guide mt-8 bg-custom-chart-title rounded-[6px] p-4 text-text text-left">
                                                {t("you_can_only_trade_when_assets_are")}
                                            </div>
                                        </div>
                                        <div className="px-5 py-4 lg:p-0 w-full">
                                            <button
                                                className="text-light bg-gradient-primary border-none rounded-[3px] px-10 py-[11px] cursor-pointer relative transition-all duration-300 font-bold inline-flex items-center justify-center w-full lg:w-[75%]"
                                                onClick={handleSubmit}
                                            >
                                                {t("transfer")}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Loading>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default ExchangeModal;
