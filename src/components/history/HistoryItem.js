import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import clsx from "clsx";
import { useContext } from "react";
import BalanceContext from "@/contexts/BalanceContext";

const HistoryItem = ({ betAmount, winAmount, betType, createdDatetime, isOpen }) => {
    const {t } = useTranslation();
    const [balance] = useContext(BalanceContext);

    return (
        <div className="bg-custom-chart-title p-2 rounded">
            <div className="flex justify-between mb-2">
                <div className="font-bold">
                    BTC/USD{" "}
                    {balance === "DEMO" && (
                        <span className="leading-[20px] bg-gradient-primary text-light px-[5px] py-[3px] rounded text-[.6rem]">
                            DEMO
                        </span>
                    )}
                </div>
                <span className="inline-block w-[19px] h-[18px] bg-no-repeat bg-contain bg-[url('http://localhost:3001/assets2/images/bitcoin.svg')]"></span>
            </div>
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <div
                        className={clsx(
                            {
                                "trend-down": betType === "DOWN",
                                "trend-up": betType === "UP",
                            },
                            "inline-block w-[20px] h-[20px] bg-no-repeat bg-contain rounded-full mr-2",
                        )}
                    ></div>
                    <div className="uppercase font-bold">{betType === "DOWN" ? t("sell") : t("buy")}</div>
                </div>
                <div>{betAmount}$</div>
            </div>
            {isOpen ? (
                <div className="flex justify-between">
                    <div className="text-xs text-light/50">{t("time")}</div>
                    <div className="text-xs text-light font-bold">{dayjs(createdDatetime).format("HH:mm:ss")}</div>
                </div>
            ) : (
                <div className="flex justify-between">
                    <div className="text-xs text-light/50">{dayjs(createdDatetime).format("HH:mm:ss")}</div>
                    <div
                        className={clsx("font-bold", {
                            "text-down": winAmount <= 0,
                            "text-up": winAmount > 0,
                        })}
                    >
                        {(winAmount > 0 && "+") + winAmount}$
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryItem;
