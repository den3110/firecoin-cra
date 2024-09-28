import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import HttpClient from "@/services/HttpClient";
import SocketClient from "@/services/SocketClient";
import SocketContext from "@/contexts/SocketContext";
import dynamic from "next/dynamic";

const OsGauge = dynamic(() => import("@/components/gauges/OsGauge"), { ssr: false });
const SuGauge = dynamic(() => import("@/components/gauges/SuGauge"), { ssr: false });
const MaGauge = dynamic(() => import("@/components/gauges/MaGauge"), { ssr: false });

const Ye = {
    buy: 2,
    neutral: 3,
    sell: 1,
};

const convertTextState = (t) => {
    switch (t) {
        case "buy":
            return Ye.buy;
        case "sell":
            return Ye.sell;
        case "neutral":
            return Ye.neutral;
        default:
    }
};

const meterResult = (t) => {
    let e = -80;
    let n = 0;
    if (t.sell) {
        if (t.buy) {
            if (t.sell === t.buy) {
                e = 0;
            } else {
                n = (180 * t.buy) / (t.buy + t.sell);
                e = n - 90;
            }
        } else {
            e = -90;
        }
    } else {
        e = 90;
    }

    if (e <= -85) {
        e = -80;
    }

    if (e >= 85) {
        e = 80;
    }

    return e;
};

const Indicators = () => {
    const [indicators, setIndicators] = useState(null);
    const { socketInitialized } = useContext(SocketContext);

    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/chart/indicator")
            .then((res) => res.data)
            .then((_data) => {
                setIndicators(_data.d);
            });
    }, []);

    const handleIndicators = useCallback((data) => {
        // console.log("handleIndicators", data);
        setIndicators(data);
    }, []);

    useEffect(() => {
        if (!socketInitialized || !SocketClient.getInstance().socket()) {
            return;
        }

        SocketClient.getInstance().socket().emit("BO_CHART_INDICATORS_SUBSCRIBE");
        SocketClient.getInstance().socket().on("BO_CHART_INDICATORS", handleIndicators);

        return () => {
            SocketClient.getInstance().socket().emit("BO_CHART_INDICATORS_UNSUBSCRIBE");
            SocketClient.getInstance().socket().off("BO_CHART_INDICATORS", handleIndicators);
        };
    }, [handleIndicators, socketInitialized]);

    const result = useMemo(() => {
        const oscillators = {
            buy: 0,
            sell: 0,
            neutral: 0,
            items: {},
            meter: {
                numberValue: 0,
                textValue: "",
            },
        };
        const movingAverages = {
            buy: 0,
            sell: 0,
            neutral: 0,
            items: {},
            meter: {
                numberValue: 0,
                textValue: "",
            },
        };
        const summary = {
            buy: 0,
            sell: 0,
            neutral: 0,
            items: {},
            meter: {
                numberValue: 0,
                textValue: "",
            },
        };

        if (!indicators) {
            return {
                oscillators,
                movingAverages,
                summary,
            };
        }

        oscillators.items.relativeStrengthIndex = convertTextState(indicators.rsi[1]);
        oscillators.items.stochasticOscillator = convertTextState(indicators.so[1]);
        oscillators.items.commodityChannelIndex = convertTextState(indicators.cci[1]);
        oscillators.items.awesomeOscillator = convertTextState(indicators.ao[1]);
        oscillators.items.momentum = convertTextState(indicators.m[1]);
        oscillators.items.macd = convertTextState(indicators.macd[1]);
        oscillators.items.stochasticRSIFast = convertTextState(indicators.srf[1]);
        oscillators.items.williamsPercentRange = convertTextState(indicators.wpr[1]);
        oscillators.items.ultimateOscillator = convertTextState(indicators.uo[1]);

        movingAverages.items.exponentialMovingAverage5 = convertTextState(indicators.ema_5[1]);
        movingAverages.items.exponentialMovingAverage10 = convertTextState(indicators.ema_10[1]);
        movingAverages.items.exponentialMovingAverage20 = convertTextState(indicators.ema_20[1]);
        movingAverages.items.exponentialMovingAverage30 = convertTextState(indicators.ema_30[1]);
        movingAverages.items.exponentialMovingAverage50 = convertTextState(indicators.ema_50[1]);
        movingAverages.items.exponentialMovingAverage100 = convertTextState(indicators.ema_100[1]);
        movingAverages.items.simpleMovingAverage5 = convertTextState(indicators.sma_5[1]);
        movingAverages.items.simpleMovingAverage10 = convertTextState(indicators.sma_10[1]);
        movingAverages.items.simpleMovingAverage20 = convertTextState(indicators.sma_20[1]);
        movingAverages.items.simpleMovingAverage30 = convertTextState(indicators.sma_30[1]);
        movingAverages.items.simpleMovingAverage50 = convertTextState(indicators.sma_50[1]);
        movingAverages.items.simpleMovingAverage100 = convertTextState(indicators.sma_100[1]);

        // count oscillators
        oscillators.buy = 0;
        oscillators.sell = 0;
        oscillators.neutral = 0;
        for (const [key, value] of Object.entries(oscillators.items)) {
            switch (value) {
                case Ye.sell:
                    oscillators.sell = oscillators.sell + 1;
                    break;
                case Ye.buy:
                    oscillators.buy = oscillators.buy + 1;
                    break;
                default:
                    oscillators.neutral = oscillators.neutral + 1;
                    break;
            }
        }
        oscillators.meter.numberValue = meterResult(oscillators);

        // count movingAverages
        movingAverages.buy = 0;
        movingAverages.sell = 0;
        movingAverages.neutral = 0;
        for (const [key, value] of Object.entries(movingAverages.items)) {
            switch (value) {
                case Ye.sell:
                    movingAverages.sell = movingAverages.sell + 1;
                    break;
                case Ye.buy:
                    movingAverages.buy = movingAverages.buy + 1;
                    break;
                default:
                    movingAverages.neutral = movingAverages.neutral + 1;
                    break;
            }
            movingAverages.meter.numberValue = meterResult(movingAverages);
        }
        oscillators.meter.numberValue = meterResult(oscillators);

        // summary
        summary.buy = oscillators.buy + movingAverages.buy;
        summary.sell = oscillators.sell + movingAverages.sell;
        summary.neutral = oscillators.neutral + movingAverages.neutral;
        summary.meter.numberValue = meterResult(summary);

        return {
            oscillators,
            movingAverages,
            summary,
        };
    }, [indicators]);

    return (
        <div className="gauge-meter">
            <OsGauge result={result} />
            <SuGauge result={result} />
            <MaGauge result={result} />
        </div>
    );
};

export default Indicators;
