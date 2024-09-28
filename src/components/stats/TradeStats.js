import { useTranslation } from "react-i18next";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useRef } from "react";

import Highcharts from "highcharts";
import Formatter from "@/utils/Formatter";
import clsx from "clsx";
import HideBalance from "@/components/HideBalance";
import HideInfo from "../HideInfo";

const TradeStats = ({ data }) => {
    const {t } = useTranslation();
    const chartRef = useRef(null);

    const options = useMemo(() => {
        const e = '<p class="trade-stat label">'
            .concat(t("total_trade"), '</p>\n        <p class="trade-stat value">\n        ')
            .concat(data?.trades || 0, "</p>");

        return {
            chart: {
                type: "pie",
                height: 200,
                backgroundColor: "transparent",
            },
            title: {
                text: e,
                align: "center",
                verticalAlign: "middle",
                style: {
                    color: "#fff",
                },
                useHTML: !0,
                floating: !0,
                y: 20,
                x: 0,
            },
            plotOptions: {
                pie: {
                    innerSize: "80%",
                    dataLabels: {
                        enabled: !1,
                    },
                    borderWidth: 0,
                    borderRadius: 0,
                },
                series: {
                    dataLabels: [
                        {
                            enabled: !0,
                        },
                    ],
                },
            },
            colors: ["#2d55fd", "#7b738e", "#ff2a55"],
            legend: {
                enabled: false,
                display: false,
            },
            labels: {
                enabled: false,
            },
            series: {
                name: "",
                type: "pie",
                data: [],
                dataLabels: [
                    {
                        enabled: false,
                    },
                ],
            },
            xAxis: {
                type: "pie",
                title: {
                    enabled: !1,
                },
                label: {
                    enabled: !1,
                },
            },
            yAxis: {
                allowDecimals: !1,
                title: {
                    enabled: !1,
                },
                label: {
                    enabled: !1,
                },
            },
            tooltip: {
                shared: !0,
            },
            credits: {
                enabled: !1,
            },
            exporting: {
                enabled: false,
            },
        };
    }, [data?.trades, t]);

    useEffect(() => {
        if (!chartRef.current) return;

        chartRef.current.chart.update(
            {
                series: {
                    data: [
                        {
                            name: "Total win round",
                            y: data?.win,
                            color: "#2d55fd",
                        },
                        {
                            name: "Total draw round",
                            y: data?.refund,
                            color: "#7b738e",
                        },
                        {
                            name: "Total lose round",
                            y: data?.lose,
                            color: "#ff2a55",
                        },
                    ],
                    dataLabels: [
                        {
                            enabled: false,
                        },
                    ],
                },
            },
            true,
            true,
        );

        chartRef.current.chart.redraw();
        chartRef.current.chart.reflow();
    }, [data?.lose, data?.refund, data?.win]);

    
    return (
        <div className="mb-4 trade-stat">
            <div className="bo-stats border border-custom-border bg-secondarySidebar min-h-[292px] rounded-[22px]">
                <div
                    className={clsx("text-lg mb-4 pt-4 pl-12 leading-[20px] font-bold text-left", {
                        hidden: data?.trades > 0,
                    })}
                >
                    Trade Stats
                </div>
                <div className="grid lg:grid-cols-2">
                    <div className={clsx("mb-4 px-[15px]", { hidden: (data?.trades || 0) > 0 })}>
                        <div className="flex items-center justify-center">
                            <div className="w-[151px] h-[151px] border-[15px] border-secondary-400 rounded-full flex flex-col justify-center items-center">
                                <div className="leading-[20px] mb-2">{t("total_trade")}</div>
                                <div className="text-xl font-bold leading-[1]">
                                    <HideInfo  placehodler="***">
                                        <HideBalance>{data?.trades || 0}</HideBalance>
                                    </HideInfo>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx("mb-4 px-[15px]", {
                            hidden: (data?.trades || 0) <= 0,
                        })}
                    >
                        <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
                    </div>
                    <div className="md:py-4 px-[15px] mb-4 flex flex-col lg:flex-row items-center items-start align-middle">
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center mb-4">
                                <span className="inline-block rounded-full bg-custom-win relative w-[20px] h-[20px] mr-[5px] overflow-hidden after:bg-custom-chart-title after:absolute after:w-4 after:h-4 after:block after:top-0.5 after:left-0.5 after:rounded-full"></span>
                                <span className="text-base">{t("total_win_round")}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <span className="inline-block rounded-full bg-custom-draw relative w-[20px] h-[20px] mr-[5px] overflow-hidden after:bg-custom-chart-title after:absolute after:w-4 after:h-4 after:block after:top-0.5 after:left-0.5 after:rounded-full"></span>
                                <span className="text-base">{t("total_draw_round")}</span>
                            </div>
                            <div className="flex items-center mb-4">
                                <span className="inline-block rounded-full bg-custom-lose relative w-[20px] h-[20px] mr-[5px] overflow-hidden after:bg-custom-chart-title after:absolute after:w-4 after:h-4 after:block after:top-0.5 after:left-0.5 after:rounded-full"></span>
                                <span className="text-base">{t("total_lose_round")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="sm:mb-4 border-r border-r-light/[0.22] text-center">
                        <p className="mb-2 text-[#a0b1bc]">{t("win_rate")}</p>
                        <p className="text-xl leading-none font-bold mb-4">
                        <HideInfo  placehodler="***">
                       {((data?.win_rate || 0) * 100).toFixed(2)}%
                        </HideInfo>
                        </p>
                    </div>
                    <div className="sm:mb-4 text-center">
                        <p className="mb-2 text-[#a0b1bc]">{t("total_trade_amount")}</p>
                        <p className="text-xl leading-none font-bold mb-4">
                        <HideInfo  placehodler="******">
                        <HideBalance>                            <HideBalance>${Formatter.formatNumber(data?.bet_amount || 0, 2)}</HideBalance>
</HideBalance>
                        </HideInfo>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeStats;
