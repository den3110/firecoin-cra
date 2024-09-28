import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HC_more from "highcharts/highcharts-more";
import { convertTextValueMeter } from "@/utils/gaugeUtils";
import GeneralTooltip from "@/components/GeneralTooltip";
import { useTranslation } from "react-i18next";

if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
    HC_more(Highcharts);
}

const SuGauge = ({ result }) => {
    const {t } = useTranslation();

    return (
        <div className="gauge-meter-sub gauge-meter--su">
            <div className="v-popover gauge-meter-popover">
                <div className="trigger inline-block">
                    <GeneralTooltip
                        content={t(
                            "this_indicator_is_combined_by_all_factors_that_make_up_the_oscillator_and_moving_averages_indicator",
                        )}
                    >
                        <h3 className="gauge-meter-title">
                            Summary
                            <span className="gauge-meter-title-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                    <g id="c-question" transform="translate(3.068 -8.774)">
                                        <g
                                            id="Ellipse_1825"
                                            data-name="Ellipse 1825"
                                            transform="translate(-2.068 9.774)"
                                            fill="none"
                                            stroke="#fefefe"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="1"
                                        >
                                            <circle cx="10" cy="10" r="10" stroke="none"></circle>
                                            <circle cx="10" cy="10" r="10.5" fill="none"></circle>
                                        </g>
                                        <g id="question" transform="translate(3.497 13.43)">
                                            <path
                                                id="Path_30768"
                                                data-name="Path 30768"
                                                d="M8.359,10.774a4.349,4.349,0,0,1,.4-2.323,5.026,5.026,0,0,1,1.4-1.421c1.317-.981,1.876-1.491,1.876-2.54,0-1.166-.924-1.637-2.166-1.637a7.306,7.306,0,0,0-3.334.866L5.694,2.063A9.2,9.2,0,0,1,10.035,1a4.89,4.89,0,0,1,3.1.9A3,3,0,0,1,14.287,4.4,3.24,3.24,0,0,1,13.4,6.7,10.58,10.58,0,0,1,11.872,8,5.71,5.71,0,0,0,10.63,9.137a2.68,2.68,0,0,0-.315,1.637H8.359Z"
                                                transform="translate(-5.694 -1)"
                                                fill="#fefefe"
                                            ></path>
                                            <ellipse
                                                id="Ellipse_1827"
                                                data-name="Ellipse 1827"
                                                cx="1.363"
                                                cy="1.284"
                                                rx="1.363"
                                                ry="1.284"
                                                transform="translate(2.252 11.56)"
                                                fill="#fefefe"
                                            ></ellipse>
                                        </g>
                                    </g>
                                </svg>
                            </span>
                        </h3>
                    </GeneralTooltip>
                </div>
            </div>
            <h4 className="gauge-meter-sub-title">{convertTextValueMeter(result.summary.meter.numberValue)}</h4>
            <div className="gauge-meter-border">
                <div className="gauge-meter-background rank-2"></div>
                <ul className="gauge-meter-label-list">
                    <li className="gauge-meter-label-item gauge-meter-label-item--strong-sell">
                        strong
                        <br />
                        sell
                    </li>
                    <li className="gauge-meter-label-item gauge-meter-label-item--sell active">sell</li>
                    <li className="gauge-meter-label-item gauge-meter-label-item--neutral">neutral</li>
                    <li className="gauge-meter-label-item gauge-meter-label-item--buy">buy</li>
                    <li className="gauge-meter-label-item gauge-meter-label-item--strong-buy">
                        strong
                        <br />
                        buy
                    </li>
                </ul>
                <ul className="gauge-meter-status-list">
                    <li className="gauge-meter-status-item">
                        <span className="gauge-meter-status-value gauge-meter-status-value--sell">
                            {result.summary.sell}
                        </span>
                        <span className="gauge-meter-status-text">Sell</span>
                    </li>
                    <li className="gauge-meter-status-item">
                        <span className="gauge-meter-status-value gauge-meter-status-value--neutral">
                            {result.summary.neutral}
                        </span>
                        <span className="gauge-meter-status-text">Neutral</span>
                    </li>
                    <li className="gauge-meter-status-item">
                        <span className="gauge-meter-status-value gauge-meter-status-value--buy">
                            {result.summary.buy}
                        </span>
                        <span className="gauge-meter-status-text">Buy</span>
                    </li>
                </ul>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {
                            type: "gauge",
                            plotBorderWidth: null,
                            backgroundColor: "rgba(0,0,0,0)",
                            plotBackgroundColor: null,
                            plotBackgroundImage: null,
                            height: 88,
                            spacingBottom: 0,
                            spacingTop: 0,
                            spacingLeft: 0,
                            spacingRight: 0,
                            events: {
                                render: function () {
                                    result.summary.meter.textValue = convertTextValueMeter(
                                        result.summary.meter.numberValue,
                                    );
                                },
                            },
                            animation: {
                                duration: 1500,
                                easing: "easeOutBounce",
                            },
                        },
                        credits: {
                            enabled: !1,
                        },
                        title: {
                            text: "",
                        },
                        pane: [
                            {
                                startAngle: -90,
                                endAngle: 90,
                                background: null,
                                center: ["50%", "105%"],
                                size: 176,
                            },
                        ],
                        exporting: {
                            enabled: !1,
                        },
                        tooltip: {
                            enabled: !1,
                        },
                        yAxis: [
                            {
                                min: -90,
                                max: 90,
                                minorTickPosition: "outside",
                                tickPosition: "outside",
                                labels: {
                                    rotation: "auto",
                                    distance: 0,
                                    style: {
                                        color: "rgba(0,0,0,0)",
                                    },
                                },
                                pane: 0,
                                title: "",
                                minorTickColor: "rgba(0,0,0,0)",
                                lineColor: "rgba(0,0,0,0)",
                                tickColor: "rgba(0,0,0,0)",
                            },
                        ],
                        plotOptions: {
                            gauge: {
                                dataLabels: {
                                    enabled: !1,
                                },
                                dial: {
                                    radius: "85%",
                                    baseLength: "1%",
                                    rearLength: 0,
                                    backgroundColor: {
                                        linearGradient: {
                                            x1: 1,
                                            y1: 0,
                                            x2: 0,
                                            y2: 0,
                                        },
                                        stops: [
                                            [0, "#fff"],
                                            [1, "#000"],
                                        ],
                                    },
                                    baseWidth: 6,
                                    topWidth: 3,
                                },
                            },
                        },
                        series: [
                            {
                                name: "Summary",
                                data: [result.summary.meter.numberValue],
                                yAxis: 0,
                            },
                        ],
                        responsive: {
                            rules: [
                                {
                                    condition: {
                                        maxWidth: 120,
                                    },
                                    chartOptions: {
                                        chart: {
                                            height: 60,
                                        },
                                        pane: [
                                            {
                                                size: 110,
                                            },
                                        ],
                                    },
                                },
                                {
                                    condition: {
                                        maxWidth: 89,
                                    },
                                    chartOptions: {
                                        chart: {
                                            height: 44,
                                        },
                                        pane: [
                                            {
                                                size: 88,
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default SuGauge;
