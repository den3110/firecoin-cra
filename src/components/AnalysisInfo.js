import "@/components/gauges/Gauge.scss";

import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Indicators from "@/components/Indicators";
import LastResult from "@/components/LastResult";

const AnalysisInfo = () => {
    const {t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState("indicator");

    const handleSelectTab = (tab) => {
        return (e) => {
            e?.preventDefault();
            setSelectedTab(tab);
        };
    };

    return (
        <div className="analysis-info relative min-h-[120px] sm:min-h-[176px] lg:min-h-0">
            <ul className="flex border-b border-b-custom-chart-title lg:border-b-0">
                <li>
                    <a
                        href="#"
                        className={clsx(
                            "block px-[10px] lg:px-[25px] text-sm lg:text-base hover:text-light leading-[28px] relative",
                            {
                                "text-light/30": selectedTab !== "indicator",
                                "text-light font-bold after:block after:content-[''] w-full lg:after:w-[calc(100%+50px)] lg:after:-mx-[25px] after:rounded-[10px] after:h-1 after:left-0 after:-bottom-1 after:bg-gradient-primary":
                                    selectedTab === "indicator",
                            },
                        )}
                        onClick={handleSelectTab("indicator")}
                    >
                        {t("indicators")}
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className={clsx(
                            "block px-[10px] lg:px-[25px] text-sm lg:text-base hover:text-light leading-[28px] relative",
                            {
                                "text-light/30": selectedTab !== "last_result",
                                "text-light font-bold after:block after:content-[''] w-full lg:after:w-[calc(100%+50px)] lg:after:-mx-[25px] after:rounded-[10px] after:h-1 after:left-0 after:-bottom-1 after:bg-gradient-primary":
                                    selectedTab === "last_result",
                            },
                        )}
                        onClick={handleSelectTab("last_result")}
                    >
                        {t("last_results")}
                    </a>
                </li>
            </ul>
            <div>
                <div
                    className={clsx({
                        "visibility-hidden": selectedTab !== "indicator",
                        "visibility-visible": selectedTab === "indicator",
                    })}
                >
                    <Indicators isOpen={selectedTab == "indicator"} />
                </div>

                <div
                    className={clsx({
                        hidden: selectedTab !== "last_result",
                        block: selectedTab === "last_result",
                    })}
                >
                    <LastResult />
                </div>
            </div>
        </div>
    );
};

export default AnalysisInfo;
