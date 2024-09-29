"use client";

import HighchartsReact from "highcharts-react-official";
// import HighchartsExporting from "highcharts/modules/exporting";
import Highcharts from "highcharts/highstock";
import HC_indicatorsAll from "highcharts/indicators/indicators";
// import HC_priceIndicator from "highcharts/modules/price-indicator";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import useTradingChartOptions from "@/hooks/useTradingChartOptions";
import SocketClient from "@/services/SocketClient";
import { useDesktop } from "@/hooks/responsives";
import SocketContext from "@/contexts/SocketContext";
import PriceDataContext from "@/contexts/PriceDataContext";

if (typeof Highcharts === "object") {
    HC_indicatorsAll(Highcharts);
    // HC_priceIndicator(Highcharts);
}

const TradeChart = () => {
    const highchartsRef = useRef(null);
    const wrapperRef = useRef(null);
    const data = useContext(PriceDataContext);
    const [currentCandlestick, setCurrentCandlestick] = useState(null);
    const isLargeDesktop = useDesktop();
    // const { setCounter } = useContext(TradeContext);
    // const isDesktop = useDesktop();

    const { socketInitialized } = useContext(SocketContext);

    const ohlc = useMemo(() => {
        return data.map((item) => {
            return {
                x: item[0],
                open: item[1],
                high: item[2],
                low: item[3],
                close: item[4],
                vol: item[5],
            };
        });
    }, [data]);

    const volume = useMemo(() => {
        const volumes = data.map((item) => {
            return {
                x: item[0],
                y: item[5],
                color: item[1] > item[4] ? "#FA4B62" : "#04C793",
            };
        });

        if (currentCandlestick) {
            volumes.push({
                x: currentCandlestick[0],
                y: currentCandlestick[5],
                color: currentCandlestick[1] > currentCandlestick[4] ? "#FA4B62" : "#04C793",
            });
        }

        return volumes;
    }, [currentCandlestick, data]);

    const options = useTradingChartOptions(highchartsRef, wrapperRef);

    const series = useMemo(() => {
        return {
            series: [
                {
                    id: "aapl",
                    data: ohlc,
                },
                {
                    id: "volume",
                    data: volume,
                },
            ],
        };
    }, [ohlc, volume]);

    const applyResponsive = useCallback(
        (width) => {
            // setExtremes
            const lastPoint =
                highchartsRef.current?.chart.series[0].points[highchartsRef.current?.chart.series[0].points.length - 1];

            // or current timestamp
            const latestX = lastPoint?.x || new Date().getTime();

            if (isLargeDesktop) {
                // 1197px -> 33 minutes
                // screen width -> ? minutes
                let minutes = Math.min(Math.round((width / 1197) * 33), 49.5);
                highchartsRef.current?.chart.xAxis[0].setExtremes(latestX - minutes * 60 * 1000, latestX);
            } else {
                // 390px -> 8 minutes
                // screen width -> ? minutes
                highchartsRef.current?.chart.xAxis[0].setExtremes(latestX - (width / 390) * 8 * 60 * 1000, latestX);
            }

            highchartsRef.current?.chart.redraw();
            highchartsRef.current?.chart.reflow();
        },
        [isLargeDesktop],
    );

    const updateLastPoint = useCallback(
        ({ volume, order, ...point }) => {
            const chart = highchartsRef.current?.chart;

            if (!chart) {
                return;
            }

            // candlestick
            const series = chart.series[0];
            const lastPoint = series.points[series.points.length - 1];

            if (!lastPoint) {
                return;
            }

            // volume
            const volumeSeries = chart.series[1];
            const lastVolumePoint = volumeSeries.points[volumeSeries.points.length - 1];
            const volumeObj = {
                x: point.x,
                y: volume,
                color: point.open > point.close ? "#FA4B62" : "#04C793",
            };

            if (lastPoint.x === point.x) {
                lastPoint.update({
                    ...point,
                    vol: volume,
                });
                lastVolumePoint.update(volumeObj);
            } else {
                series.addPoint({
                    ...point,
                    vol: volume,
                });
                volumeSeries.addPoint(volumeObj);

                // setExtremes
                applyResponsive(wrapperRef.current.offsetWidth);
            }
            chart.xAxis[0].options.plotLines[0].value = point.x;
            chart.yAxis[0].options.plotLines[0].value = point.close;

            const f = chart.yAxis[0].plotLinesAndBands[0];
            f?.label &&
                f?.label.attr({
                    text:
                        '<div class="last-price-label flex flex-col"><span class="price">' +
                        point.close.toFixed(2) +
                        '</span><span class="time self-end">00:' +
                        (order > 9 ? order : "0" + order) +
                        "</span></div>",
                });

            // applyResponsive(wrapperRef.current.offsetWidth);

            // reflow
            chart.redraw();
            chart.reflow();
        },
        [applyResponsive],
    );

    useEffect(() => {
        highchartsRef.current?.chart.update(series);

        applyResponsive(window.innerWidth);
    }, [applyResponsive, series]);

    const handlePrices = useCallback(
        (data) => {
            // {
            //     "lowPrice": 37130.83,
            //     "session": 1399066,
            //     "isBetSession": false,
            //     "highPrice": 37131.63,
            //     "openPrice": 37130.83,
            //     "closePrice": 37131.63,
            //     "baseVolume": 0.5935801347086386,
            //     "orderClose": 1,
            //     "createDateTime": 1700572290000,
            //     "ordinal": 41971980,
            //     "order": 29
            // }

            updateLastPoint({
                x: data.createDateTime,
                open: data.openPrice,
                high: data.highPrice,
                low: data.lowPrice,
                close: data.closePrice,
                volume: data.baseVolume,
                order: data.order,
            });

            // setCounter(data.order);
        },
        [updateLastPoint],
    );

    // Handle sockets
    useEffect(() => {
        if (!socketInitialized || !SocketClient.getInstance().socket()) {
            console.log("Socket not connected");
            return;
        }

        SocketClient.getInstance().socket().emit("BO_PRICE_SUBSCRIBE");
        SocketClient.getInstance().socket().on("BO_PRICE", handlePrices);

        return () => {
            SocketClient.getInstance().socket().emit("BO_PRICE_UNSUBSCRIBE");
            SocketClient.getInstance().socket().off("BO_PRICE", handlePrices);
        };
    }, [handlePrices, socketInitialized]);

    // Redraw chart on resize wrapperRef
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            applyResponsive(entries[0].contentRect.width);

            highchartsRef.current?.chart.redraw();
            highchartsRef.current?.chart.reflow();
        });

        resizeObserver.observe(wrapperRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [applyResponsive]);

    return (
        <div id="trade-chart" ref={wrapperRef} className="flex-1 max-h-[calc(75vh-51px)]">
            <div className="absolute top-0 left-0 w-full bg-[url('~/public/assets/images/pocinex_bg_chart.png')] bg-contain bg-no-repeat bg-center">
                <HighchartsReact
                    ref={highchartsRef}
                    highcharts={Highcharts}
                    constructorType={"stockChart"}
                    options={options}
                />
            </div>
        </div>
    );
};

export default TradeChart;
