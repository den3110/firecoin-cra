import { useCallback, useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";
import Formatter from "@/utils/Formatter";
import clsx from "clsx";
import BalanceHistoryStatus from "@/components/_partials/BalanceHistoryStatus";
import Pagination from "@/components/Pagination";
import { useDesktop } from "@/hooks/responsives";
import dayjs from "dayjs";
import { showHistory } from "@/store/balanceReducer";
import { useDispatch } from "react-redux";
import BoxNoResult from "./BoxNoResult";

const CommissionHistory = () => {
    const t = useTranslations();

    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const isDesktop = useDesktop();

    const dispatch = useDispatch();

    const fetchData = useCallback(() => {
        setLoading(true);
        HttpClient.instanceClient()
            .get("api/wallet/binaryoption/history/win-commission", {
                params: {
                    page,
                    size: 10,
                },
            })
            .then((res) => res.data)
            .then(({ d: data }) => {
                setData(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePaginationChange = useCallback(
        (_page) => {
            setPage(_page);
        },
        [setPage],
    );

    const handleShowDrawer = (data) => {
        return () => {
            dispatch(showHistory(data));
        };
    };

    return (
        <>
            <div>
                <Loading loading={loading}>
                    {isDesktop ? (
                        <ul className="border-x border-b border-custom-border rounded-b-[20px] bg-secondarySidebar">

                            {data?.t > 0 ? (
                                <li className="border-b border-b-custom-border">
                                    <div className="flex px-4 text-[#778e9f]">
                                        <div className="basis-[120px] max-w-[120px]">
                                            <span className="inline-block py-[15px]">{t("time")}</span>
                                        </div>
                                        <div className="basis-[130px] max-w-[130px] text-right">
                                            <span className="inline-block px-2.5 py-[15px]">{t("amount")}</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block px-2.5 py-[15px]">{t("type")}</span>
                                        </div>
                                        <div className="flex-[2] flex-shrink basis-[0%]">
                                            <span className="inline-block px-2.5 py-[15px]">{t("txid")}</span>
                                        </div>
                                        <div className="basis-full text-center max-w-[100px]">
                                            <span className="inline-block px-2.5 py-[15px]">{t("status")}</span>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <li className="flex px-4 text-center text-light">
                                    <div className="flex-1">
                                        <span className="inline-block px-2.5 py-[15px]">{t("no_data")}</span>
                                    </div>
                                </li>
                            )}
                            {data?.c.map((ts, index) => {
                                const isWithdraw = false;

                                let tsType;

                                switch (ts.type) {
                                    case "AGENCY_COMMISSION":
                                        tsType = t("AGENCY_COMMISSION_DESC");
                                        break;
                                    case "TRADING_COMMISSION":
                                        tsType = t("TRADING_COMMISSION_DESC");
                                        break;
                                }

                                const tsTxid = ts.txid ? JSON.parse(ts.txid) : "";

                                return (
                                    <div
                                        key={index}
                                        className={clsx("flex px-4 text-light", {
                                            "border-b border-b-custom-border": ts !== data.c[data.c.length - 1],
                                        })}
                                    >
                                        <div className="basis-[120px] max-w-[120px]">
                                            <span className="inline-block py-[15px]">
                                                {Formatter.formatHistoryTime(ts.ts)}
                                            </span>
                                        </div>
                                        <div className="basis-[130px] max-w-[130px] text-right">
                                            <span
                                                className={clsx("inline-block px-2.5 py-[15px]", {
                                                    "text-up": !isWithdraw,
                                                    "text-down": isWithdraw,
                                                })}
                                            >
                                                {isWithdraw ? "-" : "+"}
                                                {Formatter.formatNumber(ts.amount)}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block px-2.5 py-[15px]">{tsType}</span>
                                        </div>
                                        <div className="flex-[2] flex-shrink basis-[0%] w-full overflow-hidden">
                                            <span className="inline-block px-2.5 py-[15px]">{tsType}</span>
                                        </div>
                                        <div className="basis-full text-center max-w-[100px]">
                                            <span className="inline-block px-2.5 py-[15px] mr-1">
                                                <BalanceHistoryStatus status={ts.status} />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>
                    ) : (
                        <ul>
                             {data?.c.length === 0 && <BoxNoResult/>}

                            {data?.c.map((ts, index) => {
                                let tsType;

                                switch (ts.type) {
                                    case "AGENCY_COMMISSION":
                                        tsType = t("AGENCY_COMMISSION_DESC");
                                        break;
                                    case "TRADING_COMMISSION":
                                        tsType = t("TRADING_COMMISSION_DESC");
                                        break;
                                }

                                return (
                                    <li
                                        key={index}
                                        className="box-history rounded border border-custom-border bg-secondarySidebar p-4 mb-4"
                                        onClick={handleShowDrawer({ title: tsType, ts, isCommission: true })}
                                    >
                                        <div className="flex flex-col">
                                            <div className="relative">
                                                <h6 className="text-light text-base font-bold mb-2 leading-[1.2] mt-0">
                                                    {tsType}
                                                </h6>
                                                <button className="view-detail-icon border-0 absolute top-[5px] right-[5px] block overflow-hidden w-2 h-4 p-0 transition-all duration-200 ease-linear"></button>
                                            </div>
                                            <div className="flex">
                                                <div className="flex-1 mt-3">
                                                    <span className="text-[#838fae] leading-[1.6] mb-[5px] py-0 text-xs w-full block">
                                                        {t("time")}
                                                    </span>
                                                    <span className="leading-[1.6] py-0 text-light text-sm w-full block">
                                                        {dayjs(ts.ts).format("DD/MM/YY")}
                                                        <br />
                                                        {dayjs(ts.ts).format("HH:mm")}
                                                    </span>
                                                </div>
                                                <div className="flex-1 mt-3 ml-2">
                                                    <span className="text-[#838fae] leading-[1.6] mb-[5px] py-0 text-xs w-full block">
                                                        {t("amount")}
                                                    </span>
                                                    <span
                                                        className={clsx(
                                                            "leading-[1.6] py-0 text-sm w-full block text-up",
                                                        )}
                                                    >
                                                        +{Formatter.formatNumber(ts.amount)}
                                                    </span>
                                                </div>
                                                <div className="flex-1 mt-3 ml-2">
                                                    <span className="text-[#838fae] leading-[1.6] mb-[5px] py-0 text-xs w-full block">
                                                        {t("status")}
                                                    </span>
                                                    <span className="leading-[1.6] py-0 text-light text-sm w-full block">
                                                        {ts.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </Loading>
            </div>
            {data?.t > 0 && (
                <div className="py-[15px] text-center mb-6">
                    <Pagination page={page} total={data?.t} size={10} onChange={handlePaginationChange} />
                </div>
            )}
        </>
    );
};

export default CommissionHistory;
