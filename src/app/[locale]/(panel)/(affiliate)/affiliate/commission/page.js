"use client";

import { useTranslation } from "react-i18next";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import CustomDateRangePicker from "@/components/inputs/CustomDateRangePicker";
import dayjs from "dayjs";
// import dynamic from "next/dynamic";
import HttpClient from "@/services/HttpClient";
import TradingPayoutDetails from "@/app/[locale]/(panel)/(affiliate)/affiliate/commission/_partials/TradingPayoutDetails";
import HideInfo from "@/components/HideInfo";

const TradingPayoutChart = lazy(() => import('@/app/[locale]/(panel)/(affiliate)/affiliate/commission/_partials/TradingPayoutChart'));
const AffiliateCommissionPage = () => {
    const {t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [preparedType, setPreparedType] = useState("trading");
    const [type, setType] = useState(preparedType);
    const [preparedDateRange, setPreparedDateRange] = useState(() => {
        return [dayjs().startOf("month").toDate(), dayjs().toDate()];
    });
    const [searchDateRange, setSearchDataRange] = useState(preparedDateRange);
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const fetchData = useCallback(() => {
        setLoading(true);
        HttpClient.instanceClient()
            .get("api/wallet/binaryoption/history/totalcommissiondetails?", {
                params: {
                    page,
                    size: 10,
                    agency: type === "agency",
                    trading: type === "trading",
                    fromDate: dayjs(searchDateRange[0]).format("MM/DD/YYYY"),
                    toDate: dayjs(searchDateRange[1]).format("MM/DD/YYYY"),
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setData(data.d);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, searchDateRange, type]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePaginationChange = useCallback((page) => {
        setPage(page);
    }, []);

    const handleSearch = useCallback(() => {
        setPage(1);
        setType(preparedType);
        setSearchDataRange(preparedDateRange);
    }, [preparedDateRange, preparedType]);

    return (
        <HideInfo isPage={true}>
            <div className="w-full pt-4 lg:pt-0">
            <div className="px-[15px] mx-auto">
                <div className="header-content mb-6 flex flex-col lg:flex-row items-center lg:justify-between">
                    <h1 className="hidden lg:block text-light cursor-pointer font-bold text-[1.875rem] capitalize mb-2 leading-[1.2]">
                        {t("commission")}{" "}
                        <span className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" >
                                <g id="c-question" transform="translate(0.396 0.396)" >
                                    <g
                                        id="Ellipse_1825"
                                        data-name="Ellipse 1825"
                                        
                                        transform="translate(1.104 1.104)"
                                        fill="none"
                                        strokeLinecap="square"
                                        strokeMiterlimit="10"
                                        strokeWidth="1.5"
                                        stroke="var(--primary)"
                                    >
                                        <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                        <circle cx="7" cy="7" r="7.75" fill="none"></circle>
                                    </g>
                                        
                                    <g id="question" transform="translate(0.26 2.819)" >
                                        <path
                                            id="Path_30768"

                                            data-name="Path 30768"
                                            d="M7.218,6.93a2.78,2.78,0,0,1,.228-1.41,2.976,2.976,0,0,1,.8-.862c.753-.595,1.073-.9,1.073-1.541,0-.708-.528-.993-1.239-.993a3.986,3.986,0,0,0-1.906.525l-.479-1A5.021,5.021,0,0,1,8.177,1a2.685,2.685,0,0,1,1.775.548,1.863,1.863,0,0,1,.656,1.512,2.034,2.034,0,0,1-.5,1.4,6.163,6.163,0,0,1-.876.787,3.352,3.352,0,0,0-.71.69,1.71,1.71,0,0,0-.18.993H7.218Z"
                                            transform="translate(0)"
                                            fill="var(--primary)"
                                        ></path>
                                        <circle
                                            id="Ellipse_1827"
                                            data-name="Ellipse 1827"
                                            cx="0.779"
                                            cy="0.779"
                                            r="0.779"
                                            transform="translate(6.982 8.013)"
                                            fill="var(--primary)"
                                        ></circle>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </h1>
                    <div className="lg:items-end flex flex-col lg:flex-row p-5 lg:p-0 rounded-[13px] lg:rounded-0 border-text border lg:border-0">
                        <div className="block-line flex flex-col lg:mr-4">
                            <span className="text-xs block text-[#8d97a0] leading-[20px]">{t("commission_type")}</span>
                            <Menu as="div" className="hidden lg:block relative">
                                <Menu.Button>
                                    <button
                                        type="button"
                                        className={clsx(
                                            "capitalize px-3 py-1.5 text-light font-normal transition-all duration-200 whitespace-nowrap inline-block text-center align-middle bg-transparent border border-transparent text-base leading-[1.5] rounded",
                                            "after:inline-block after:ml-[.255em] after:align-[.255em] after:content-[''] after:border-[.3em] after:border-b-0 after:border-x-transparent",
                                        )}
                                    >
                                        {preparedType === "trading" ? t("trading_commission") : t("license_commission")}
                                    </button>
                                    <Menu.Items>
                                        <div className="font-normal text-base absolute translate-y-[38px] top-0 left-0 will-change-transform border-custom-border bg-secondary border float-left z-[1000] min-w-[10rem] mt-0.5 text-[#212529] text-left rounded">
                                            <Menu.Item>
                                                <a
                                                    href="#"
                                                    className="capitalize border-b border-b-custom-border text-light py-2 transition-all duration-300 w-full block px-6 clear-both whitespace-nowrap bg-transparent"
                                                    onClick={() => setPreparedType("trading")}
                                                >
                                                    {t("trading_commission")}
                                                </a>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <a
                                                    href="#"
                                                    className="capitalize text-light py-2 transition-all duration-300 w-full block px-6 clear-both whitespace-nowrap bg-transparent"
                                                    onClick={() => setPreparedType("agency")}
                                                >
                                                    {t("license_commission")}
                                                </a>
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Menu.Button>
                            </Menu>
                            <div className="grid lg:hidden grid-cols-2 gap-x-2 mt-2.5 mb-4">
                                <button
                                    className={clsx(
                                        "text-light text-sm leading-[40px] w-full inline-block text-center align-middle border border-transparent rounded transition-colors",
                                        preparedType === "trading" ? "bg-[#e22a67]" : "bg-secondary-400",
                                    )}
                                    onClick={() => setPreparedType("trading")}
                                >
                                    {t("trading_commission")}
                                </button>
                                <button
                                    className={clsx(
                                        "text-light text-sm leading-[40px] w-full inline-block text-center align-middle border border-transparent rounded transition-colors whitespace-nowrap",
                                        preparedType === "agency" ? "bg-[#e22a67]" : "bg-secondary-400",
                                    )}
                                    onClick={() => setPreparedType("agency")}
                                >
                                    {t("license_commission")}
                                </button>
                            </div>
                        </div>
                        <div className="block-line flex flex-col mr-4">
                            <span className="text-xs block text-[#8d97a0] leading-[20px] mb-2.5 lg:mb-0">
                                {t("date")}
                            </span>
                            <CustomDateRangePicker
                                value={preparedDateRange}
                                onChange={(value) => setPreparedDateRange(value)}
                                className="text-light max-w-[320px] lg:mr-0"
                            />
                        </div>
                        <button
                            className="px-6 py-3 text-light bg-gradient-primary border-none rounded-[6px] cursor-pointer relative transition-all font-bold inline-flex items-center justify-center"
                            onClick={handleSearch}
                        >
                            {t("search")}
                        </button>
                    </div>
                </div>
                <div className="notice-commission">
                    <p dangerouslySetInnerHTML={{ __html: t("noticeComission") }} className="mb-4"></p>
                </div>
                <div className="body grid grid-cols-3 gap-x-[15px]">
                    <div className="col-span-3 lg:col-span-1">
                        <div className="border-custom-border bg-secondary relative rounded-[20px] overflow-hidden border">
                            <div className="header p-[15px] border-b border-custom-border [letter-spacing:.01em]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="19.135"
                                    height="16.02"
                                    viewBox="0 0 19.135 16.02"
                                    className="inline"
                                >
                                    <g id="edit-curves" transform="translate(0 -2)" >
                                        <path
                                            id="Path_29616"
                                            data-name="Path 29616"
                                            d="M5,13.9C14.346,13.9,9.673,3,19.02,3"
                                            transform="translate(-0.885 0)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29617"
                                            data-name="Path 29617"
                                            d="M18.135,17.02H1V3"
                                            transform="translate(0 0)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                    </g>
                                </svg>
                                <span className="font-bold text-light text-base ml-2 mb-0">
                                    {type === "trading" ? t("trading_payout_chart") : t("agency_payout_chart")}
                                </span>
                            </div>
                            <div className="wrap-chart-below border-none afflilate-commission-chart">
                                <Suspense fallback={<div><div></div></div>}>
                                    <TradingPayoutChart data={data} type={type} />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 lg:col-span-2">
                        <TradingPayoutDetails
                            loading={loading}
                            data={data}
                            type={type}
                            page={page}
                            onPaginationChange={handlePaginationChange}
                        />
                    </div>
                </div>
            </div>
        </div>
        </HideInfo>
       
    );
};

export default AffiliateCommissionPage;
