import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Loading from "@/components/Loading";
import HttpClient from "@/services/HttpClient";
import Formatter from "@/utils/Formatter";
import Pagination from "@/components/Pagination";
import { useDesktop } from "@/hooks/responsives";

const NetworkManagementSearchResult = ({ username, level, searchBy, onViewUser }) => {
    const {t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const [days, setDays] = useState(30);

    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const isDesktop = useDesktop();

    useEffect(() => {
        setPage(1);
    }, [days, searchBy, level, username]);

    const fetchData = useCallback(() => {
        setLoading(true);
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/user/affiliate", {
                params: {
                    page,
                    size: 10,
                    days,
                    lvl: searchBy === "level" ? level : null,
                    nickName: searchBy === "username" ? username : null,
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setData(data.d);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [days, level, page, searchBy, username]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    let Table = null;

    if (!isDesktop) {
        Table = (
            <div className="table-mobile w-[calc(100vw-15px*2)]">
                <table className="text-center">
                    <thead>
                        <tr className="text-left">
                            <th className="text-[#8d97a0] font-normal text-sm sticky left-0 bg-secondary z-[1] fake-right-border">
                                {t("username")}
                            </th>
                            <th className="text-[#8d97a0] font-normal text-sm">{t("level")}</th>
                            <th className="text-[#8d97a0] font-normal text-sm">{t("total_trade_volume")}</th>
                            <th className="text-[#8d97a0] font-normal text-sm">{t("total_commission_earned")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*{currentData?.c?.map((item, index) => {*/}
                        {/*    return (*/}
                        {/*        <tr key={index}>*/}
                        {/*            <td className="sticky left-0 bg-secondary z-[1] fake-right-border">*/}
                        {/*                {dayjs(item.ts).format("MM/DD/YYYY")}*/}
                        {/*            </td>*/}
                        {/*            <td>{Formatter.formatNumber(item.payouts || 0, 2)}</td>*/}
                        {/*            {type === "trading" && (*/}
                        {/*                <>*/}
                        {/*                    <td>{Formatter.formatNumber(item.traders || 0)}</td>*/}
                        {/*                    <td>{Formatter.formatNumber(item.trade || 0)}</td>*/}
                        {/*                    <td>{Formatter.formatNumber(item.vol || 0)}</td>*/}
                        {/*                </>*/}
                        {/*            )}*/}
                        {/*            {type === "agency" && <td>{Formatter.formatNumber(item.sales || 0)}</td>}*/}
                        {/*        </tr>*/}
                        {/*    );*/}
                        {/*})}*/}

                        {data?.c?.map((item) => (
                            <tr key={item.nick} className="text-light">
                                <td className="sticky left-0 bg-secondary z-[1] fake-right-border">
                                    <a
                                        href="#"
                                        className="text-primary underline hover:text-light hover:no-underline"
                                        onClick={() => onViewUser?.(item.nick)}
                                    >
                                        {item.nick}
                                    </a>
                                </td>
                                <td>{item.rank}</td>
                                <td>{Formatter.formatNumber(item.tradevol)}</td>
                                <td>{Formatter.formatNumber(item.trading_coms)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={4} className="border-t-0">
                                <Pagination
                                    page={page}
                                    total={data?.t || 0}
                                    size={10}
                                    onChange={(_page) => setPage(_page)}
                                />
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    } else {
        Table = (
            <div className="table-responsive network-management-table">
                <Loading loading={loading}>
                    <table className="table overflow-hidden table-bordered mb-0 bg-secondary">
                        <thead>
                            <tr>
                                <th>{t("username")}</th>
                                <th>{t("level")}</th>
                                <th>{t("total_trade_volume")}</th>
                                <th>{t("total_commission_earned")}</th>
                            </tr>
                        </thead>
                        {data?.c?.length > 0 ? (
                            <>
                                <tbody>
                                    {data?.c?.map((item) => (
                                        <tr key={item.nick} className="text-light">
                                            <td>
                                                <a
                                                    href="#"
                                                    className="text-primary underline hover:text-light hover:no-underline"
                                                    onClick={() => onViewUser?.(item.nick)}
                                                >
                                                    {item.nick}
                                                </a>
                                            </td>
                                            <td>{item.rank}</td>
                                            <td>{Formatter.formatNumber(item.tradevol)}</td>
                                            <td>{Formatter.formatNumber(item.coms)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan={4} className="border-t-0">
                                            <Pagination
                                                page={page}
                                                total={data?.t || 0}
                                                size={10}
                                                onChange={(_page) => setPage(_page)}
                                            />
                                        </th>
                                    </tr>
                                </tfoot>
                            </>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan={4} className="text-light">
                                        {t("no_data")}
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </Loading>
            </div>
        );
    }

    return (
        <div className="max-w-full min-[1024px]:pl-[42px] w-full pr-[15px] pl-[15px]">
            <div className="mb-4 flex flex-col lg:flex-row">
                <h1 className="text-light font-bold text-[1.875rem] capitalize mb-2 leading-[1.2] lg:flex-1">
                    {t("search_results")}
                </h1>
                <div className="lg:ml-auto flex items-center whitespace-nowrap overflow-x-scroll w-[calc(100vw-15px*2)] lg:w-auto">
                    <span className="hidden lg:block text-text mr-6">{t("time_range")}:</span>
                    <button
                        className={clsx(
                            "mr-4 border-custom-border cursor-pointer px-[11px] py-[5px] rounded-[5px] border transition-all duration-200 inline-block text-center align-middle text-base leading-[1.5]",
                            days === 1
                                ? "font-bold text-light bg-gradient-primary"
                                : "font-normal bg-transparent text-text",
                        )}
                        onClick={() => setDays(1)}
                    >
                        {t("yesterday")}
                    </button>
                    <button
                        className={clsx(
                            "mr-4 border-custom-border cursor-pointer px-[11px] py-[5px] rounded-[5px] border transition-all duration-200 inline-block text-center align-middle text-base leading-[1.5]",
                            days === 7
                                ? "font-bold text-light bg-gradient-primary"
                                : "font-normal bg-transparent text-text",
                        )}
                        onClick={() => setDays(7)}
                    >
                        {t("last_7_days")}
                    </button>
                    <button
                        className={clsx(
                            "mr-4 border-custom-border cursor-pointer px-[11px] py-[5px] rounded-[5px] border transition-all duration-200 inline-block text-center align-middle text-base leading-[1.5]",
                            days === 30
                                ? "font-bold text-light bg-gradient-primary"
                                : "font-normal bg-transparent text-text",
                        )}
                        onClick={() => setDays(30)}
                    >
                        {t("last_30_days")}
                    </button>
                    <button
                        className={clsx(
                            "border-custom-border cursor-pointer px-[11px] py-[5px] rounded-[5px] border transition-colors duration-200 inline-block text-center align-middle text-base leading-[1.5]",
                            days === -1
                                ? "font-bold text-light bg-gradient-primary"
                                : "font-normal bg-transparent text-text",
                        )}
                        onClick={() => setDays(-1)}
                    >
                        {t("all_time")}
                    </button>
                </div>
            </div>
            <div className="search-result">{Table}</div>
        </div>
    );
};

export default NetworkManagementSearchResult;
