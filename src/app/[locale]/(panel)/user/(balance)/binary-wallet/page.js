"use client";

import { useTranslations } from "next-intl";
import ExchangeHistory from "@/components/modals/balance/_partials/ExchangeHistory";
import ExchangeBalances from "@/components/modals/balance/_partials/ExchangeBalances";
import BalanceHistoryDrawer from "@/components/BalanceHistoryDrawer";
import HideInfo from "@/components/HideInfo";

const BinaryWalletPage = () => {
    const t = useTranslations();

    return (
        <>
            <div className="custom-container mb-12">
                <div className="px-2">
                    <ExchangeBalances />
                </div>
            </div>
            <HideInfo placehodler="">
            <div className="custom-container">
                <h4 className="text-[24px] mb-4 leading-[1.2]">
                    <b>{t("transaction_history")}</b>
                </h4>
                <ExchangeHistory />
                <BalanceHistoryDrawer />
            </div>
            </HideInfo>
            
        </>
    );
};

export default BinaryWalletPage;
