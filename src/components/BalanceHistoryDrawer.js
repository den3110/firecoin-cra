import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { hideHistory } from "@/store/balanceReducer";
import { useTranslations } from "next-intl";
import Formatter from "@/utils/Formatter";
import clsx from "clsx";
import BalanceHistoryType from "@/components/_partials/BalanceHistoryType";
import { useMemo } from "react";

const BalanceHistoryDrawer = () => {
    const t = useTranslations();

    const { showHistory, history } = useSelector((state) => ({
        showHistory: state.balance.showHistory,
        history: state.balance.history,
    }));

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideHistory());
    };

    const tsTxid = useMemo(() => {
        return history?.ts.txid ? JSON.parse(history.ts.txid) : "";
    }, [history?.ts.txid]);

    return (
        <Transition show={showHistory && !!history?.ts}>
            <div className="auth-popup">
                <Transition.Child
                    as="div"
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="fixed top-0 left-0 z-[1050] w-full h-full bg-custom-border overflow-x-hidden overflow-y-auto"
                >
                    {/*Slide From left*/}
                    <Transition
                        as="div"
                        enter="transition-all duration-150"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-all duration-150"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                        className="modal-dialog absolute top-0 left-0 min-w-0 w-full m-0 h-dvh text-light border-secondary-600 rounded pointer-events-auto"
                    >
                        <div
                            className="close-page absolute right-0 top-0 bg-transparent text-[2.75em] text-light cursor-pointer z-[999] rounded-full w-10 h-10 text-center"
                            onClick={handleClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                className="align-middle overflow-hidden"
                            >
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
                                            stroke="#fff"
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
                                            stroke="#fff"
                                            strokeMiterlimit="10"
                                            d="M2 26h28"
                                            transform="translate(0 -10) rotate(-45 16 26)"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="modal-content p-5 bg-secondarySidebar h-full relative flex flex-col w-full bg-clip-padding outline-0 pointer-events-auto">
                            <div className="grid grid-cols-1 -mx-[15px] h-full">
                                <div className="items-center justify-center basis-full max-w-full relative w-full px-[15px]">
                                    <div className="px-[15px] text-light">
                                        <h4 className="text-lg font-semibold mt-[18px] mb-2 leading-[1.2] block">
                                            <span>{history?.title}</span>
                                        </h4>
                                        <div className="mt-[30px]">
                                            <div className="flex border-b border-b-text py-2.5 items-center">
                                                <span className="text-[#838fae] text-xs whitespace-nowrap mr-2">
                                                    {t("time")}
                                                </span>
                                                <span className="text-sm ml-auto">
                                                    {Formatter.formatHistoryTime(history?.ts.ts)}
                                                </span>
                                            </div>
                                            <div className="flex border-b border-b-text py-2.5 items-center">
                                                <span className="text-[#838fae] text-xs whitespace-nowrap mr-2">
                                                    {t("amount")}
                                                </span>
                                                <span
                                                    className={clsx("text-sm ml-auto", {
                                                        "text-up": !history?.isWithdraw,
                                                        "text-down": history?.isWithdraw,
                                                    })}
                                                >
                                                    {history?.isWithdraw ? "-" : "+"}
                                                    {Formatter.formatNumber(history?.ts.amount)}
                                                </span>
                                            </div>
                                            <div className="flex border-b border-b-text py-2.5 items-center justify-between">
                                                <span className="text-[#838fae] text-xs whitespace-nowrap mr-2">
                                                    {t("txid")}
                                                </span>
                                                {!history?.isCommission && history?.ts ? (
                                                    <BalanceHistoryType
                                                        ts={history?.ts}
                                                        tsTxid={tsTxid}
                                                        withoutPadding={true}
                                                    />
                                                ) : (
                                                    <span className="text-sm ml-auto">{history?.title}</span>
                                                )}
                                            </div>
                                            {!history?.isCommission && (
                                                <div className="flex border-b border-b-text py-2.5 items-center">
                                                    <span className="text-[#838fae] text-xs whitespace-nowrap mr-2">
                                                        {t("memo")}
                                                    </span>
                                                    <span className="text-sm ml-auto">{history?.ts.note || ""}</span>
                                                </div>
                                            )}
                                            <div className="flex border-b border-b-transparent py-2.5 items-center">
                                                <span className="text-[#838fae] text-xs whitespace-nowrap mr-2">
                                                    {t("status")}
                                                </span>
                                                <span className="text-sm ml-auto">
                                                    {history?.ts.status === "Succeed"
                                                        ? t("succeed")
                                                        : t(history?.ts.status)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Transition.Child>
            </div>
        </Transition>
    );
};

export default BalanceHistoryDrawer;
