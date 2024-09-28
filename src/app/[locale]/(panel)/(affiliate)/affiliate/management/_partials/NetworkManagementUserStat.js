"use client";

import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAffiliateOverviewQuery from "@/hooks/queries/useAffiliateOverviewQuery";
import HttpClient from "@/services/HttpClient";
import dayjs from "dayjs";
import Formatter from "@/utils/Formatter";
import Highcharts from "highcharts";

import HighchartsReact from "highcharts-react-official";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const NetworkManagementUserStat = ({ username }) => {
    const {t } = useTranslation();

    const { data: overviewData } = useAffiliateOverviewQuery();

    const [type, setType] = useState("vol");

    const [range, setRange] = useState("this_month");
    const [data, setData] = useState();

    const monthYear = useMemo(() => {
        switch (range) {
            case "this_month":
                return {
                    month: dayjs().month() + 1,
                    year: dayjs().year(),
                };
            case "last_month":
                return {
                    month: dayjs().subtract(1, "month").month() + 1,
                    year: dayjs().subtract(1, "month").year(),
                };
            default:
                return {
                    month: null,
                    year: null,
                };
        }
    }, [range]);

    const fetchData = useCallback(() => {
        HttpClient.instanceClient()
            .get(
                "/api/wallet/binaryoption/history/" +
                    (type === "vol" ? "accumulatebetvol" : "accumulatecommission") +
                    "/nick/" +
                    username,
                {
                    params: {
                        ...monthYear,
                    },
                },
            )
            .then((res) => res.data)
            .then(({ d }) => {
                setData(d);
            });
    }, [monthYear, type, username]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const options = useMemo(() => {
        let seriesData = [];

        if (range === "all_time") {
            seriesData =
                data?.map((item) => {
                    return [item.ts, item.total];
                }) || [];
        } else {
            // fill zero for current month (by monthYear)
            let currentDayOfMonth = dayjs().set(monthYear).startOf("month");
            const endDateOfMonth = dayjs().set(monthYear).endOf("month");

            while (
                currentDayOfMonth.isSameOrBefore(endDateOfMonth) &&
                currentDayOfMonth.isSameOrBefore(dayjs().endOf("day")) // Include today
            ) {
                const found = data?.find((item) => {
                    return dayjs(item.ts).isSame(currentDayOfMonth, "day");
                });

                seriesData.push([currentDayOfMonth.valueOf(), found?.total || 0]);

                currentDayOfMonth = currentDayOfMonth.add(1, "day");
            }

            // Add today's data explicitly if missing
            if (!seriesData.some((item) => dayjs(item[0]).isSame(dayjs(), "day"))) {
                seriesData.push([dayjs().valueOf(), 0]);
            }
        }

        return {
            chart: {
                type: "areaspline",
                marginTop: 20,
                marginRight: 20,
                backgroundColor: "transparent",
                height: 400,
            },
            exporting: {
                enabled: false,
            },
            xAxis: {
                type: "datetime",
                tickInterval: 24 * 3600 * 1000, // 1 day interval
                labels: {
                    formatter: function () {
                        return dayjs(this.value).format("MM/DD");
                    },
                    style: { fontSize: "10px" },
                },
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
                    allowDecimals: false,
                    title: { enabled: false },
                    gridLineWidth: 0,
                    min: 0, // Ensure min is 0
                    max: Math.max(...seriesData.map((item) => item[1])) * 1.2, // Dynamically set max to avoid huge spikes
                },
            ],
            tooltip: {
                backgroundColor: "#fff",
                borderColor: "#DDD",
                borderWidth: 0,
                padding: 0,
                shared: true,
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
            credits: { enabled: false },
            series: [
                {
                    type: "areaspline",
                    yAxis: 0,
                    color: type === "vol" ? "#04C793" : "#FA4B62",
                    lineColor: type === "vol" ? "#04C793" : "#FA4B62",
                    data: seriesData,
                },
            ],
        };
    }, [data, monthYear, range, type]);

    return (
        <div className="border border-custom-border bg-secondary w-full rounded-[20px] h-full">
            <ul className="pl-2.5 lg:pl-8 border-b-custom-border border-b flex flex-wrap mb-0 ">
                <li className="nav-item">
                    <a
                        className={clsx("first-letter:uppercase text-light relative text-sm px-4 py-3 lg:py-2 block", {
                            "after:content-[''] after:inline-block after:w-[90%] after:h-[3px] after:rounded-t-[3px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2":
                                range === "all_time",
                        })}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setRange("all_time");
                        }}
                    >
                        {t("all_time")}
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={clsx("first-letter:uppercase text-light relative text-sm px-4 py-3 lg:py-2 block", {
                            "after:content-[''] after:inline-block after:w-[90%] after:h-[3px] after:rounded-t-[3px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2":
                                range === "this_month",
                        })}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setRange("this_month");
                        }}
                    >
                        {t("this_month")}
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={clsx("first-letter:uppercase text-light relative text-sm px-4 py-3 lg:py-2 block", {
                            "after:content-[''] after:inline-block after:w-[90%] after:h-[3px] after:rounded-t-[3px] after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2":
                                range === "last_month",
                        })}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setRange("last_month");
                        }}
                    >
                        {t("last_month")}
                    </a>
                </li>
            </ul>
            <div className="px-5 py-4 grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <p className="text-xl font-bold text-light mb-6">{t("recent_statistics")}</p>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setType("vol");
                        }}
                        className="text-success-50 flex items-center mb-4"
                    >
                        <span
                            className={clsx(
                                "border-success-50 border relative inline-block rounded-full w-5 h-5 mr-2",
                                {
                                    "after:bg-success-50 after:content-[''] after:w-3 after:h-3 after:absolute after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2":
                                        type === "vol",
                                },
                            )}
                        ></span>
                        <span>{t("bet_volume")}</span>
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setType("commission");
                        }}
                        className="text-danger flex items-center mb-4"
                    >
                        <span
                            className={clsx("border-danger border relative inline-block rounded-full w-5 h-5 mr-2", {
                                "after:bg-danger after:content-[''] after:w-3 after:h-3 after:absolute after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2":
                                    type === "commission",
                            })}
                        ></span>
                        <span>{t("bet_volume")}</span>
                    </a>
                </div>
                <div className="lg:col-span-2 afflilate-general-chart border-custom-border border rounded-[20px]">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>
        </div>
    );
};

export default NetworkManagementUserStat;
