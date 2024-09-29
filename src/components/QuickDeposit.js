import Button from "@/components/inputs/Button";
import { Menu } from "@headlessui/react";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import Formatter from "@/utils/Formatter";
import { Fragment, useRef, useState } from "react";
import HttpClient from "@/services/HttpClient";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setQuickDepositModal } from "@/store/generalReducer";
import { useTranslation } from "react-i18next";

const QuickDeposit = () => {
    const {t }= useTranslation();

    const btnRef = useRef(null);

    const { data: balanceData, isLoading, refetch } = useSpotBalancesQuery();

    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState();

    const dispatch = useDispatch();

    const showModal = () => {
        dispatch(setQuickDepositModal({ open: true, amount }));
    };

    const handleAll = () => {
        setAmount(balanceData?.d?.usdtAvailableBalance);
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

                btnRef.current?.click();

                setAmount("");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <Menu as="div" className="mr-2 qDeposit relative">
                <Menu.Button ref={btnRef} as="div">
                    <Button>{t("quick_deposit")}</Button>
                </Menu.Button>
                <Menu.Items as="div">
                    <div className="block overflow-y-auto w-[250px] -translate-x-[100px] translate-y-[5px] border border-light/10 rounded-[10px] bg-secondarySidebar absolute top-full left-0 z-[1000] float-left min-w-[10rem] text-base text-custom-dropdown text-left">
                        <div
                            className={clsx("wrap relative px-[15px] py-2.5", {
                                "before:absolute before:top-0 before:left-0 before:block before:overflow-hidden before:content-[''] before:bg-[url('~/public/assets/images/spin.svg')] before:bg-no-repeat before:bg-[50%_center] before:z-[2] before:right-0 before:bottom-0 before:bg-black/[.45] before:bg-[length:40px_40px]":
                                    loading || isLoading,
                            })}
                        >
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
                                        className="form-control bg-[#fafafa] text-[#333] leading-[38px] rounded h-[42px] pr-10 border-0 py-0.5 text-base font-normal placeholder:text-sm"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <span
                                        className="absolute top-0 right-0 text-xs p-3 text-primary cursor-pointer"
                                        onClick={handleAll}
                                    >
                                        <span className="uppercase">{t("all")}</span>
                                    </span>
                                </div>
                                <div className="sizeLarge">
                                    <p className="mb-2 text-xs text-light">*{t("total_receive_amount")}</p>
                                    <p
                                        title="0.00"
                                        className="mb-2 text-[25px] overflow-hidden text-ellipsis whitespace-nowrap leading-[1.2] text-light"
                                    >
                                        {Formatter.formatCurrency(amount || 0)}
                                    </p>
                                </div>
                            </div>
                            <div className="block mobileFooter">
                                {/*<div className="sizeSmall">*/}
                                {/*    <div className="amount d-flex pdb-15">*/}
                                {/*        <span className="mb-2 colorSecondary title">Total Receive Amount*</span>*/}
                                {/*        <span*/}
                                {/*            title="0.00"*/}
                                {/*            className="mb-2 text-[25px] overflow-hidden text-ellipsis whitespace-nowrap leading-[1.2] text-light"*/}
                                {/*        >*/}
                                {/*            <b>{Formatter.formatCurrency(amount || 0)}</b>*/}
                                {/*        </span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <button
                                    type="button"
                                    disabled={amount <= 0 || amount > balanceData?.d?.usdtAvailableBalance}
                                    className="mb-2 w-full bg-success-50 text-white leading-[40px] py-0 disabled:cursor-no-drop disabled:opacity-[.65] inline-block font-normal rounded text-base"
                                    onClick={handleSubmit}
                                >
                                    <b>{t("confirm")}</b>
                                </button>
                                <p className="text-center text-text italic mb-4">
                                    <small>*{t("this_price_is_only_for_reference")}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </Menu.Items>
            </Menu>
        </>
    );
};

export default QuickDeposit;
