import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";
import dayjs from "dayjs";
import Formatter from "@/utils/Formatter";
import Pagination from "@/components/Pagination";
import { useDesktop } from "@/hooks/responsives";
import clsx from "clsx";

const TradingPayoutDetails = ({ data, loading, type, page, onPaginationChange }) => {
    const {t } = useTranslation();

    const currentData = data?.[type === "trading" ? "tradingdetails" : "licensedetails"];

    const isDesktop = useDesktop();

    if (!isDesktop) {
        let Content = null;

        if (type === "trading") {
            Content = (
                <div className="table-mobile">
                    <table className="text-center">
                        <thead>
                            <tr className="text-left">
                                <th className="text-[#8d97a0] font-normal text-sm sticky left-0 bg-secondary z-[1] fake-right-border">
                                    {t("time")}
                                </th>
                                <th className="text-[#8d97a0] font-normal text-sm">{t("payout")}</th>
                                {type === "trading" && (
                                    <>
                                        <th className="text-[#8d97a0] font-normal text-sm">{t("trade_count")}</th>
                                        <th className="text-[#8d97a0] font-normal text-sm">{t("unique_traders")}</th>
                                        <th className="text-[#8d97a0] font-normal text-sm">{t("trade_volume")}</th>
                                    </>
                                )}
                                {type === "agency" && (
                                    <th className="text-[#8d97a0] font-normal text-sm">{t("sales_count")}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData?.c?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="sticky left-0 bg-secondary z-[1] fake-right-border">
                                            {dayjs(item.ts).format("MM/DD/YYYY")}
                                        </td>
                                        <td>{Formatter.formatNumber(item.payouts || 0, 2)}</td>
                                        {type === "trading" && (
                                            <>
                                                <td>{Formatter.formatNumber(item.traders || 0)}</td>
                                                <td>{Formatter.formatNumber(item.trade || 0)}</td>
                                                <td>{Formatter.formatNumber(item.vol || 0)}</td>
                                            </>
                                        )}
                                        {type === "agency" && <td>{Formatter.formatNumber(item.sales || 0)}</td>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            Content = (
                <ul className="px-5 mb-4">
                    <li className="px-5 py-2.5 mb-[5px] border-b border-text">
                        <div className="grid grid-cols-3 gap-x-[30px]">
                            <div>
                                <span className="text-[#8d97a0] font-normal text-sm">{t("time")}</span>
                            </div>
                            <div>
                                <span className="text-[#8d97a0] font-normal text-sm">{t("payout")}</span>
                            </div>
                            <div>
                                <span className="text-[#8d97a0] font-normal text-sm">{t("sales_count")}</span>
                            </div>
                        </div>
                    </li>
                    {currentData?.c?.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={clsx("px-5 py-2.5 mb-[5px] text-light", {
                                    "border-b border-text": index !== currentData?.c?.length - 1,
                                })}
                            >
                                <div className="grid grid-cols-3 gap-x-[30px]">
                                    <div>
                                        <span className="font-normal text-sm">
                                            {dayjs(item.ts).format("MM/DD/YYYY")}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-normal text-sm">
                                            {Formatter.formatNumber(item.payouts || 0, 2)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-normal text-sm">
                                            {Formatter.formatNumber(item.sales || 0)}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <Loading loading={loading} className="mt-6">
                <div className="flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" className="mr-2">
                        <g id="single-copy-06" transform="translate(-1.278)" >
                            <rect
                                id="Rectangle_4166"
                                data-name="Rectangle 4166"
                                width="10"
                                height="11"
                                transform="translate(1.778 2.5)"
                                strokeWidth="1"
                                stroke="var(--primary)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            ></rect>
                            <line
                                id="Line_1332"
                                data-name="Line 1332"
                                x2="6"
                                transform="translate(3.778 0.5)"
                                fill="none"
                                stroke="var(--primary)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                            ></line>
                        </g>
                    </svg>
                    <span className="font-bold text-light text-base mb-0 leading-[20px]">
                        {type === "trading" ? t("trading_payout_details") : t("agency_payout_details")}
                    </span>
                </div>
                {Content}
                <div>
                    <Pagination page={page} total={currentData?.t} size={10} onChange={onPaginationChange} />
                </div>
            </Loading>
        );
    }

    return (
        <Loading loading={loading} className="table-background h-full">
            <table className="table-fixed lg:table-auto overflow-x-auto lg:overflow-hidden border-custom-border mb-4">
                <thead>
                    <tr>
                        <th colSpan={5}>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="11"
                                    height="14"
                                    viewBox="0 0 11 14"
                                    className="mr-2"
                                >
                                    <g id="single-copy-06" transform="translate(-1.278)" >
                                        <rect
                                            id="Rectangle_4166"
                                            data-name="Rectangle 4166"
                                            width="10"
                                            height="11"
                                            transform="translate(1.778 2.5)"
                                            strokeWidth="1"
                                            stroke="var(--primary)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="none"
                                        ></rect>
                                        <line
                                            id="Line_1332"
                                            data-name="Line 1332"
                                            x2="6"
                                            transform="translate(3.778 0.5)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                        ></line>
                                    </g>
                                </svg>
                                <span className="font-bold text-light text-base mb-0 leading-[20px]">
                                    {type === "trading" ? t("trading_payout_details") : t("agency_payout_details")}
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr className="text-left">
                        <th className="text-[#8d97a0] font-normal text-[.75rem]">{t("time")}</th>
                        <th className="text-[#8d97a0] font-normal text-[.75rem]">{t("payout")}</th>
                        {type === "trading" && (
                            <>
                                <th className="text-[#8d97a0] font-normal text-[.75rem]">{t("trade_count")}</th>
                                <th className="text-[#8d97a0] font-normal text-[.75rem]">{t("unique_traders")}</th>
                                <th className="text-[#8d97a0] font-normal text-[.75rem]">{t("trade_volume")}</th>
                            </>
                        )}
                        {type === "agency" && (
                            <th className="text-[#8d97a0] font-normal text-[.75rem]">{t("sales_count")}</th>
                        )}
                    </tr>
                </thead>
                <tbody className="table-content">
                    {currentData?.c?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{dayjs(item.ts).format("MM/DD/YYYY")}</td>
                                <td>{Formatter.formatNumber(item.payouts || 0, 2)}</td>
                                {type === "trading" && (
                                    <>
                                        <td>{Formatter.formatNumber(item.traders || 0)}</td>
                                        <td>{Formatter.formatNumber(item.trade || 0)}</td>
                                        <td>{Formatter.formatNumber(item.vol || 0)}</td>
                                    </>
                                )}
                                {type === "agency" && <td>{Formatter.formatNumber(item.sales || 0)}</td>}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="bg-[#060642]">
                <Pagination page={page} total={currentData?.t} size={10} onChange={onPaginationChange} />
            </div>
        </Loading>
    );
};

export default TradingPayoutDetails;
