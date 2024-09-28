import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import CloseHistory from "@/components/history/CloseHistory";
import OpenHistory from "@/components/history/OpenHistory";
import UIContext from "@/contexts/UIContext";

const BetHistory = () => {
    const t = useTranslations();

    const [selectedTab, setSelectedTab] = useState("open");
    const { totalOpenHistory } = useContext(UIContext);

    const handleSelectTab = (tab) => {
        return (e) => {
            e?.preventDefault();
            setSelectedTab(tab);
        };
    };

    return (
        <div className="text-light lg:flex lg:flex-col h-full">
            <ul className="hidden sm:flex">
                <li className="flex-1">
                    <a
                        href="#"
                        className={clsx(
                            "block px-2 lg:px-4 py-1 lg:py-2 sm:text-[10px] lg:text-sm hover:text-light leading-[20px] relative uppercase text-center border-b border-b-custom-chart-title",
                            {
                                "text-light/30": selectedTab !== "open",
                                "text-light after:block after:absolute after:content-[''] after:w-full after:rounded-[10px] after:h-1 after:left-0 after:-bottom-1 after:bg-gradient-primary":
                                    selectedTab === "open",
                            },
                        )}
                        onClick={handleSelectTab("open")}
                    >
                        {t("open")}
                        {totalOpenHistory > 0 && <span className="total-count">{totalOpenHistory}</span>}
                    </a>
                </li>
                <li className="flex-1">
                    <a
                        href="#"
                        className={clsx(
                            "block px-2 lg:px-4 py-1 lg:py-2 sm:text-[10px] lg:text-sm hover:text-light leading-[20px] relative uppercase text-center border-b border-b-custom-chart-title",
                            {
                                "text-light/30": selectedTab !== "close",
                                "text-light after:block after:absolute after:content-[''] after:w-full after:rounded-[10px] after:h-1 after:left-0 after:-bottom-1 after:bg-gradient-primary":
                                    selectedTab === "close",
                            },
                        )}
                        onClick={handleSelectTab("close")}
                    >
                        {t("close")}
                    </a>
                </li>
            </ul>
            <ul className="h-[53px] flex sm:hidden pb-4">
                <li className="flex-1 pr-1">
                    <a
                        href="#"
                        className={clsx(
                            "h-full flex items-center relative text-light text-center border border-transparent rounded font-bold justify-center px-4 py-2",
                            selectedTab === "open" ? "bg-gradient-primary" : "bg-custom-chart-title",
                        )}
                        onClick={handleSelectTab("open")}
                    >
                        {t("open_orders")}
                    </a>
                </li>
                <li className="flex-1 pl-1">
                    <a
                        href="#"
                        className={clsx(
                            "h-full flex items-center relative text-light text-center border border-transparent rounded font-bold justify-center px-4 py-2",
                            selectedTab === "close" ? "bg-gradient-primary" : "bg-custom-chart-title",
                        )}
                        onClick={handleSelectTab("close")}
                    >
                        {t("closed_orders")}
                    </a>
                </li>
            </ul>
            <div className="max-h-[calc(100%-53px)] lg:max-h-none lg:h-auto lg:flex-1 overflow-y-auto">
                {selectedTab === "open" ? <OpenHistory /> : <CloseHistory />}
            </div>
        </div>
    );
};

export default BetHistory;
