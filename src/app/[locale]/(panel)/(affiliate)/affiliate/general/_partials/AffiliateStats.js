"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAffiliateOverviewQuery from "@/hooks/queries/useAffiliateOverviewQuery";
import HttpClient from "@/services/HttpClient";
import dayjs from "dayjs";
import Formatter from "@/utils/Formatter";
import Highcharts from "highcharts";

import HighchartsReact from "highcharts-react-official";
import HideInfo from "@/components/HideInfo";

const AffiliateStats = () => {
    const t = useTranslations();

    const { data: overviewData } = useAffiliateOverviewQuery();

    const [range, setRange] = useState("this_month");
    const [data, setData] = useState();

    const fetchData = useCallback(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/history/accumulatecharts", {
                params: {
                    commission: true,
                    referrers: true,
                    agencies: true,
                    betvolumes: false,
                    month: (range === "this_month" ? dayjs().month() : dayjs().subtract(1, "month").month()) + 1,
                    year: (range === "this_month" ? dayjs().year() : dayjs().subtract(1, "month").year()) + 1,
                },
            })
            .then((res) => res.data)
            .then(({ d }) => {
                setData(d);
            });
    }, [range]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const options = useMemo(() => {
        return {
            chart: {
                type: "areaspline",
                marginTop: 20,
                marginRight: 60,
                backgroundColor: "transparent",
                height: 225,
            },
            exporting: {
                enabled: false,
            },
            xAxis: {
                type: "datetime",
                // 5 days
                tickInterval: range === "this_month" ? 24 * 3600 * 1000 : null,
                labels: {
                    // step: 5,
                    formatter: function () {
                        return dayjs(this.value).format("MM/DD");
                    },
                    style: { fontSize: "10px" },
                },
                showFirstLabel: true,
                startOnTick: false,
                tickWidth: 0,
                minPadding: 0,
                plotLines: [
                    {
                        color: "#fff",
                        width: 1,
                        value: dayjs().valueOf(),
                        zIndex: 5,
                    },
                ],
                gridLineWidth: 1,
                gridLineDashStyle: "LongDash",
                gridLineColor: "#8A8D96",
            },
            title: { text: "" },
            plotOptions: {
                areaspline: { fillOpacity: 0.2 },
                series: {
                    marker: { enabled: false },
                    lineWidth: 1,
                },
            },
            legend: { enabled: false },
            yAxis: [
                {
                    allowDecimals: !1,
                    title: { enabled: !1 },
                    labels: { style: { color: "#E22A67" } },
                    gridLineWidth: 0,
                },
                {
                    title: { enabled: !1 },
                    labels: { style: { marginRight: 5, color: "#30D6CE" } },
                    allowDecimals: !1,
                    opposite: !0,
                    gridLineWidth: 0,
                },
            ],
            tooltip: {
                backgroundColor: "#fff",
                borderColor: "#DDD",
                borderWidth: 0,
                padding: 0,
                shared: !0,
                useHTML: true,
                formatter: function () {
                    const content = this.points
                        .map((point) => {
                            return `<div><span class="circle" style="background-color: ${
                                point.color
                            }"></span> <span>${Formatter.formatNumber(point.y, 2)}</span></div>`;
                        })
                        .join("");

                    return `
<div class="chart-tooltip-header" style="z-index:1000;background-color:#fff">
    <span class="head">${dayjs(this.x).format("MM/DD/YYYY")}</span>
    <div class="body">${content}</div>
<div/>`;
                },
            },
            credits: { enabled: !1 },
            series: [
                {
                    type: "areaspline",
                    yAxis: 1,
                    color: "#2177FF",
                    lineColor: "#2177FF",
                    data: data?.referrers ? data?.referrers.map((item) => [item.ts, item.total]) : [],
                },
                {
                    type: "areaspline",
                    yAxis: 1,
                    color: "#30D6CE",
                    lineColor: "#30D6CE",
                    data: data?.agencies ? data?.agencies.map((item) => [item.ts, item.total]) : [],
                },
                {
                    type: "areaspline",
                    yAxis: 0,
                    color: "#E22A67",
                    lineColor: "#E22A67",
                    data: data?.commissions ? data?.commissions.map((item) => [item.ts, item.total]) : [],
                },
            ],
        };
    }, [data?.agencies, data?.commissions, data?.referrers, range]);

    return (
        <div className="border border-custom-border bg-secondary w-full rounded-[20px] h-full">
            <ul className="pl-8 border-b-custom-border border-b flex flex-wrap mb-0 ">
                <li className="nav-item">
                    <a
                        className={clsx("first-letter:uppercase text-light relative text-base px-4 py-3 block", {
                            "after:content-[''] after:inline-block after:w-[90%] after:h-[3px] after:rounded-t-[3px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2":
                                range === "this_month",
                        })}
                        href="#"
                        onClick={() => setRange("this_month")}
                    >
                        {t("this_month")}
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={clsx("first-letter:uppercase text-light relative text-base px-4 py-3 block", {
                            "after:content-[''] after:inline-block after:w-[90%] after:h-[3px] after:rounded-t-[3px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2":
                                range === "last_month",
                        })}
                        href="#"
                        onClick={() => setRange("last_month")}
                    >
                        {t("last_month")}
                    </a>
                </li>
            </ul>
            <div className="px-5 py-4 grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <p className="text-xl font-bold text-light my-6">{t("recent_statistics")}</p>
                    <p className="text-success-50 mb-6 mt-0">
                        {t("total_referrals_new")}{" "}
                        <span>
                        <HideInfo placehodler="***"> (
                            {Formatter.formatNumber(
                                data?.referrers ? data?.referrers[data?.referrers.length - 1].total : 0,
                            )}
                            ) </HideInfo>
                           
                        </span>
                    </p>
                    <p className="text-[#00b6ff] mb-6 mt-0">
                        {t("total_agencies_new")}{" "}
                        <span>
                        <HideInfo placehodler="***"> (
                            {Formatter.formatNumber(
                                data?.agencies ? data?.agencies[data?.agencies.length - 1].total : 0,
                            )}
                            ) </HideInfo>

                           
                        </span>
                    </p>
                    <p className="text-danger mb-6 mt-0">
                        {t("total_commission_new")}{" "}
                        <span>
                        <HideInfo placehodler="***"> (
                            {Formatter.formatNumber(
                                data?.commissions ? data?.commissions[data?.commissions.length - 1].total : 0,
                                2,
                            )}
                            ) </HideInfo>

                           
                        </span>
                    </p>
                </div>
                <div className="lg:col-span-2 afflilate-general-chart">
                <HideInfo placehodler="">  <HighchartsReact highcharts={Highcharts} options={options} /></HideInfo>

                   
                </div>
            </div>
        </div>
    );
};

export default AffiliateStats;
