import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useMemo } from "react";
import dayjs from "dayjs";
import Formatter from "@/utils/Formatter";
import { useDesktop } from "@/hooks/responsives";
import { useTranslations } from "next-intl";

const TradingPayoutChart = ({ data, type }) => {
    const t = useTranslations();
    const isDesktop = useDesktop();

    const options = useMemo(() => {
        const allTimeText = !isDesktop ? t("all_time") : t("all_time_payout");
        const currentMonthText = !isDesktop ? t("thismonth") : t("this_month_payout");

        const totalCommission = type === "trading" ? data?.info.trading_coms : data?.info.coms;
        const currentMonth =
            type === "trading" ? data?.info.currentmonth_trading_coms : data?.info.currentmonth_license_coms;

        const title = `
        <span class="chart-tooltip" style="margin-top:10px;min-width:200px;background-color:#4d505d;border: 1px solid #4d505d;color:#fff;font-size:14px;padding:5px 10px;border-radius:5px;display: block;">
            ${allTimeText}: <span style="font-weight: bold;">${Formatter.formatNumber(totalCommission)}</span>
            <br>
            ${currentMonthText}: <span style="font-weight: bold;">${Formatter.formatNumber(currentMonth)}</span>
        </span>
        `;

        const plotLines = [];

        const chartData = data?.chart || [];
        chartData.map(function (a, n) {
            const i = n + 1;
            chartData.length < 15
                ? 1 !== i &&
                  plotLines.push({
                      color: "#fff",
                      width: 1,
                      value: a,
                      dashStyle: "LongDash",
                  })
                : i % 5 === 0 &&
                  plotLines.push({
                      color: "#fff",
                      width: 1,
                      value: a,
                      dashStyle: "LongDash",
                  });
        });

        const tsMap = data?.chart.map((item) => item.ts) || [];
        const minTs = Math.min(...tsMap);
        const maxTs = Math.max(...tsMap);

        const r = dayjs(minTs).diff(dayjs(maxTs), "day");

        return {
            chart: {
                type: "areaspline",
                marginTop: 10,
                marginRight: 20,
                backgroundColor: "transparent",
                height: 400,
            },
            exporting: {
                enabled: false,
            },
            xAxis: {
                min: minTs,
                max: maxTs,
                lineColor: "#ccd6eb",
                type: "datetime",
                // 5 days
                tickInterval: r > 30 ? null : 864e5,
                labels: {
                    // step: 5,
                    formatter: function () {
                        return dayjs(this.value).format("MM/DD");
                    },
                    style: { fontSize: "10px", color: "#666666" },
                },
                // showFirstLabel: true,
                startOnTick: false,
                tickWidth: 0,
                minPadding: 0,
                plotLines,
                // gridLineWidth: 1,
                // gridLineDashStyle: "LongDash",
                // gridLineColor: "#8A8D96",
            },
            title: {
                text: title,
                useHTML: true,
            },

            plotOptions: {
                areaspline: { fillOpacity: 0.36 },
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
                    labels: { style: { color: "#666666" } },
                    gridLineWidth: 0,
                },
                // {
                //     title: { enabled: !1 },
                //     labels: { style: { marginRight: 5, color: "#30D6CE" } },
                //     allowDecimals: !1,
                //     opposite: !0,
                //     gridLineWidth: 0,
                // },
            ],
            credits: { enabled: !1 },

            tooltip: {
                backgroundColor: "#fff",
                borderColor: "#DDD",
                borderWidth: 0,
                padding: 0,
                shared: !0,
                useHTML: true,
                formatter: function () {
                    console.log(this.points);
                    const content = this.points
                        .map((point) => {
                            return `<div><span class="circle" style="background-color: #2177FF;"></span> <span>${Formatter.formatNumber(
                                point.y,
                                2,
                            )}</span></div>`;
                        })
                        .join("");

                    return `
<div class="chart-tooltip-header" style="z-index:1000;background-color:#fff">
    <span class="head">${dayjs(this.x).format("MM/DD/YYYY")}</span>
    <div class="body">${content}</div>
<div/>`;
                },
            },

            series: [
                {
                    type: "areaspline",
                    yAxis: 0,
                    color: type === "trading" ? "#E22A67" : "#bed7ff",
                    lineColor: type === "trading" ? "#E22A67" : "#2177FF",
                    data: data?.chart ? data?.chart.map((item) => [item.ts, item[type]]) : [],
                },
            ],
        };
    }, [
        data?.chart,
        data?.info.coms,
        data?.info.currentmonth_license_coms,
        data?.info.currentmonth_trading_coms,
        data?.info.trading_coms,
        isDesktop,
        t,
        type,
    ]);

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TradingPayoutChart;
