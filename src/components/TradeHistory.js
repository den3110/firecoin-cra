import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
import { useCallback, useEffect, useState } from "react";
import Formatter from "@/utils/Formatter";
import clsx from "clsx";
import Pagination from "@/components/Pagination";
import { useDesktop } from "@/hooks/responsives";

import iconUpSm from "@/assets/images/icon-up-sm.svg";
import iconDownSm from "@/assets/images/icon-down-sm.svg";
import { useSnackbar } from "notistack";
import HttpClient from "@/services/HttpClient";
import HideBalance from "@/components/HideBalance";
import CustomDateRangePicker from "@/components/inputs/CustomDateRangePicker";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";

const TradeHistory = () => {
    const t = useTranslations();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(null);

    const [page, setPage] = useState(1);
    const [searchDateRange, setSearchDateRange] = useState(() => {
        return [dayjs().toDate(), dayjs().subtract(1, "week").toDate()];
    });

    const isDesktop = useDesktop();

    const { enqueueSnackbar } = useSnackbar();

    const handlePaginationChange = (page) => {
        setPage(page);
    };

    const fetchData = useCallback(() => {
        setLoading(true);
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/tradehistory", {
                params: {
                    size: 10,
                    page,
                    fromDate: searchDateRange[0],
                    toDate: searchDateRange[1],
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setData(data.d);
            })
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    const handleCopy = (orderId) => (e) => {
        e.preventDefault();

        if(copy(orderId))
            enqueueSnackbar(t("copied_to_clipboard"), { variant: "success" });
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="text-[1.875rem] font-bold capitalize leading-[1.2] mb-2 lg:mb-0">
                    {t("trade_history")}
                </div>
                <div className="flex flex-col lg:flex-row">
                    <CustomDateRangePicker value={searchDateRange} onChange={(range) => setSearchDateRange(range)} />
                    <button className="rounded-lg bg-gradient-primary font-bold px-6 py-3" onClick={() => fetchData()}>
                        {t("search")}
                    </button>
                </div>
            </div>
            <Loading loading={loading}>
                {isDesktop ? (
                    <div className="table-responsive">
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>{t("orderID")}</th>
                                    <th>{t("start_time")}</th>
                                    <th>{t("option_type")}</th>
                                    <th>{t("selected")}</th>
                                    <th>{t("base_price")}</th>
                                    <th>{t("close_price")}</th>
                                    <th>{t("amount")}</th>
                                    <th>{t("payout")}</th>
                                </tr>
                            </thead>
                            <tbody className="text-light">
                                {data?.c && data.c.length > 0 ? (
                                    data?.c.map((transaction) => {
                                        return (
                                            <tr key={transaction.order_id}>
                                                <td>{transaction.order_id}</td>
                                                <td>{Formatter.formatLocalTime(transaction.open_time)}</td>
                                                <td>{t(transaction.period.replace(" ", "_"))}</td>
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <span
                                                            className={clsx("icon", {
                                                                up: transaction.type === "UP",
                                                                down: transaction.type === "DOWN",
                                                            })}
                                                        ></span>
                                                        <span className="font-bold">
                                                            {transaction.type === "UP" ? t("buy") : t("sell")}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <HideBalance>
                                                        {Formatter.formatNumber(transaction.price, 2)}
                                                    </HideBalance>
                                                </td>
                                                <td>
                                                    <HideBalance>
                                                        {Formatter.formatNumber(transaction.close_price, 2)}
                                                    </HideBalance>
                                                </td>
                                                <td>
                                                    <HideBalance>{transaction.bet_amount}</HideBalance>
                                                </td>
                                                <td>
                                                    <HideBalance>
                                                        {transaction.win_amount > 0 ? (
                                                            <span className="text-up">+{transaction.win_amount}</span>
                                                        ) : (
                                                            "0"
                                                        )}
                                                    </HideBalance>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={9}>
                                            <div className="flex flex-col h-full justify-center items-center">
                                                {t("no_data")}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            {data?.t > 0 && Math.ceil(data.t / 10) > 0 && (
                                <tfoot>
                                    <tr>
                                        <td colSpan={9}>
                                            <Pagination
                                                page={page}
                                                total={data?.t || 0}
                                                size={10}
                                                onChange={handlePaginationChange}
                                            />
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                ) : (
                    <div>
                        <ul>
                            {data?.c.length === 0 && (
                                <li className="rounded-[13px] bg-secondarySidebar">
                                    <p className="leading-[46px] text-center text-light">{t("no_data")}</p>
                                </li>
                            )}
                            {data?.c.map((transaction) => (
                                <li
                                    key={transaction.order_id}
                                    className="bg-secondarySidebar border border-custom-border rounded-[13px] py-2.5 px-5 mb-[18px]"
                                >
                                    <div className="flex justify-between items-center mb-[18px]">
                                        <div className="font-bold">BTC/USD</div>
                                        <div className="text-text italic">
                                            {Formatter.formatLocalTime(transaction.open_time)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-[18px]">
                                        <div className="block">
                                            <div className="text-text">{t("your_selected")}</div>
                                            <div className="flex gap-2">
                                                <img
                                                    src={transaction.type === "UP" ? iconUpSm : iconDownSm}
                                                    alt="icon"
                                                />
                                                <span>{transaction.type === "UP" ? t("buy") : t("sell")}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="border border-text rounded-[5px] inline-block leading-[27px] px-5 py-1"
                                                onClick={handleCopy(transaction.order_id)}
                                            >
                                                {t("copy_orderid")}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-[18px]">
                                        <div>
                                            <div className="text-text">{t("base_price")}</div>
                                            <div>
                                                <HideBalance>
                                                    {Formatter.formatNumber(transaction.price, 2)}
                                                </HideBalance>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-text">{t("close_price")}</div>
                                            <div>
                                                <HideBalance>
                                                    {Formatter.formatNumber(transaction.close_price, 2)}
                                                </HideBalance>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-2.5">
                                        <div>
                                            <div className="text-text">{t("amount")}</div>
                                            <div>
                                                <HideBalance>{transaction.bet_amount}</HideBalance>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-text">{t("payout")}</div>
                                            <div>
                                                <HideBalance>
                                                    {transaction.win_amount > 0 ? (
                                                        <span className="text-up">+ {transaction.win_amount}</span>
                                                    ) : (
                                                        "0"
                                                    )}
                                                </HideBalance>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Pagination page={page} total={data?.t || 0} size={10} onChange={handlePaginationChange} />
                    </div>
                )}
            </Loading>
        </div>
    );
};

export default TradeHistory;
