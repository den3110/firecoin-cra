import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setQuickDepositMobileOpen, setQuickDepositModal } from "@/store/generalReducer";
import Formatter from "@/utils/Formatter";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import { useState } from "react";
import HttpClient from "@/services/HttpClient";

const QuickDepositMobileModal = () => {
    const {t } = useTranslation();

    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);

    const open = useSelector((state) => state.general.quickDepositMobileOpen);

    const dispatch = useDispatch();

    const { data: balanceData, isLoading, refetch } = useSpotBalancesQuery();

    const handleAll = () => {
        setAmount(balanceData?.d?.usdtAvailableBalance);
    };

    const handleClose = () => {
        dispatch(setQuickDepositMobileOpen(false));
    };

    const showModal = () => {
        dispatch(setQuickDepositModal({ open: true, amount }));
    };

    const handleSubmit = () => {
        setLoading(true);
        HttpClient.instanceClient()
            .post("/api/wallet/binaryoption/move-usdtbo", {
                amount,
                confirmed: true,
            })
            .then(({ data }) => {
                if (!data.ok) {
                    return;
                }

                refetch().then();
                showModal();

                handleClose();

                // btnRef.current?.click();

                setAmount("");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Transition
            as="div"
            show={open}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-in duration-300"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            className="block overflow-y-auto fixed top-0 left-0 z-[10000] w-full h-dvh right-0 border-0"
        >
            <div className="absolute left-0 max-w-full h-dvh overflow-y-auto top-0 w-full p-5 bg-secondarySidebar flex flex-col">
                <div className="block">
                    <h5 className="mb-4 text-left text-light text-[1.25rem] font-medium">
                        <b>{t("quick_deposit")}</b>
                    </h5>
                    <button
                        className="absolute right-[5px] top-[5px] block bg-transparent w-[30px] h-[30px] rounded-full text-center align-middle"
                        onClick={handleClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 mb-0.5 inline-block">
                            <g
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                strokeWidth="2"
                                fill="#fff"
                                stroke="#fff"
                                className="nc-icon-wrapper"
                            >
                                <g className="nc-interact_menu-close-2-o-32">
                                    <path
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeMiterlimit="10"
                                        d="M2 6h28"
                                        transform="translate(0 10.00) rotate(45.00 16 6)"
                                    ></path>
                                    <path
                                        data-color="color-2"
                                        fill="#fff"
                                        strokeMiterlimit="10"
                                        d="M2 16h28"
                                        opacity="0"
                                    ></path>
                                    <path
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeMiterlimit="10"
                                        d="M2 26h28"
                                        transform="translate(0 -10) rotate(-45 16 26)"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                    <div className="block py-2">
                        <p className="mb-2 text-xs text-light">{t("choose_wallet")}</p>
                        <div className="mb-4 dropdown blockCoin">
                            <button
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                className="h-[42px] relative bg-[#fafafa] inline-flex font-normal align-middle border-transparent text-base leading-[1.5] rounded w-full text-left px-3 py-1.5 items-center"
                            >
                                <span className="icon-usdt-rounded inline-block w-5"></span>
                                <span className="text-lg">
                                    {Formatter.formatNumber(balanceData?.d?.usdtAvailableBalance, 2)}
                                </span>
                            </button>
                            <div aria-labelledby="dropdownMenuButton" className="p-0 dropdown-menu w-100"></div>
                        </div>
                        <p className="mb-2 text-xs text-light">{t("deposit_amount")}</p>
                        <div className="form-group relative">
                            <input
                                type="number"
                                placeholder={t("qdeposit_enter_amount")}
                                className="form-control bg-[#fafafa] text-[#333] leading-[38px] h-[42px] pr-10 border-0 py-0.5 text-base font-normal placeholder:text-sm"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <span
                                className="absolute top-0 right-0 text-xs p-3 text-primary cursor-pointer"
                                onClick={handleAll}
                            >
                                <span className="icon-usdt-rounded-mobile mr-2 align-middle inline-block overflow-hidden w-[30px] h-5 border-r border-r-text bg-no-repeat"></span>
                                <span className="uppercase">{t("all")}</span>
                            </span>
                        </div>
                    </div>
                    <div className="block mobileFooter">
                        <div className="flex justify-between items-center pb-[15px]">
                            <p className="mb-2 text-xs text-light">{t("total_receive_amount")}*</p>
                            <p
                                title="0.00"
                                className="mb-2 text-[25px] overflow-hidden text-ellipsis whitespace-nowrap leading-[1.2] text-light"
                            >
                                {Formatter.formatCurrency(amount || 0)}
                            </p>
                        </div>
                        <button
                            type="button"
                            disabled={amount <= 0 || amount > balanceData?.d?.usdtAvailableBalance}
                            className="mb-2 w-full bg-success-50 text-white leading-[40px] py-0 disabled:cursor-no-drop disabled:opacity-[.65] inline-block font-normal rounded text-base"
                            onClick={handleSubmit}
                        >
                            <b>{t("confirm")}</b>
                        </button>
                        <p className="text-center text-text italic mb-4 text-base">
                            <small>*{t("this_price_is_only_for_reference")}</small>
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default QuickDepositMobileModal;
