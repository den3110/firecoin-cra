"use client";

import { useTranslations } from "next-intl";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import Formatter from "@/utils/Formatter";
import { Link, usePathname } from "@/navigation";
import clsx from "clsx";
import HideBalance from "@/components/HideBalance";
import { useContext } from "react";
import UIContext from "@/contexts/UIContext";
import imgEyes from "@/assets/images/eyes.svg";
// import Image from "next/image";
import BalanceModal from "@/components/modals/balance/BalanceModal";
import TransferConfirmModal from "@/components/modals/balance/TransferConfirmModal";
import Sticky from "react-sticky-el";

const BalanceLayout = ({ children }) => {
    const t = useTranslations();
    const pathname = usePathname();
    const { hideBalances, setHideBalances } = useContext(UIContext);

    const { data } = useSpotBalancesQuery();

    const handleToggleHideBalance = () => {
        setHideBalances(!hideBalances);
    };

    return (
        <div className="text-light sticky-container">
            <div className="bg-gradient-primary py-[48px] h-[160px]">
                <div className="custom-container">
                    <div className="mb-2 flex justify-between relative">
                        <h2 className="text-light/40 text-base lg:text-lg leading-[1.2]">{t("total_assets")} (USDT)</h2>
                        <a
                            href="#"
                            className="absolute top-0 right-0 flex items-center hover:text-light"
                            onClick={handleToggleHideBalance}
                        >
                            <span className="w-10 h-10 flex items-center justify-center">
                                <img
                                    src={imgEyes}
                                    alt="img eyes"
                                    className={clsx("mx-auto", hideBalances ? "invisible" : "visible")}
                                />
                            </span>
                            <span>{hideBalances ? t("show_balance") : t("hide_balance")}</span>
                        </a>
                    </div>
                    <div className="font-bold mt-4 mr-2 flex items-center text-[2rem] lg:text-[44px]">
                        <div className="h-[30px] leading-[30px]">
                            <HideBalance>
                                {Formatter.formatNumber(data?.d.availableBalance + data?.d.usdtAvailableBalance) || 0}
                            </HideBalance>
                        </div>
                    </div>
                </div>
            </div>
            <Sticky stickyClassName="top-[56px] lg:top-[65px] z-[1000]" boundaryElement="sticky-container">
                <div className="h-[55px] mb-4">
                    <div></div>
                    <div>
                        <div className="balance-link bg-custom-chart-title mb-6">
                            <div className="custom-container">
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <Link
                                            href="/user/balance"
                                            className={clsx("nav-link", {
                                                active: pathname === "/user/balance",
                                            })}
                                        >
                                            {t("main_wallet")}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            href="/user/binary-wallet"
                                            className={clsx("nav-link", {
                                                active: pathname === "/user/binary-wallet",
                                            })}
                                        >
                                            {t("exchange_wallet")}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Sticky>
            {children}
            <BalanceModal />
            <TransferConfirmModal />
        </div>
    );
};

export default BalanceLayout;
