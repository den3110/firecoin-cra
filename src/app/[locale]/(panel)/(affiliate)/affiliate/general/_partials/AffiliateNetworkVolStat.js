import { useTranslations } from "next-intl";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import Formatter from "@/utils/Formatter";
import HideInfo from "@/components/HideInfo";

const AffiliateNetworkVolStat = () => {
    const t = useTranslations();

    const [data, setData] = useState();

    const fetchData = useCallback(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/bo-networkvolume-statistics", {
                params: {
                    page: 1,
                    size: 12,
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setData(data.d);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="border border-custom-border bg-secondary w-full rounded-[20px] h-full relative">
            <div className="card-header px-5 py-4 flex items-center">
                <svg
                    id="b-chart"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    className="mr-2"
                >
                    <rect
                        id="Rectangle_4604"
                        data-name="Rectangle 4604"
                        width="24"
                        height="2"
                        transform="translate(0 18)"
                        fill="var(--primary)"
                    ></rect>
                    <path
                        id="Path_34533"
                        data-name="Path 34533"
                        d="M4,18H6a1,1,0,0,0,1-1V8A1,1,0,0,0,6,7H4A1,1,0,0,0,3,8v9A1,1,0,0,0,4,18Z"
                        transform="translate(0 -2)"
                        fill="var(--primary)"
                    ></path>
                    <path
                        id="Path_34534"
                        data-name="Path 34534"
                        d="M11,18h2a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H11a1,1,0,0,0-1,1V17A1,1,0,0,0,11,18Z"
                        transform="translate(0 -2)"
                        fill="var(--primary)"
                    ></path>
                    <path
                        id="Path_34535"
                        data-name="Path 34535"
                        d="M17,12v5a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1H18A1,1,0,0,0,17,12Z"
                        transform="translate(0 -2)"
                        fill="var(--primary)"
                    ></path>
                </svg>
                <span className="text-light font-bold text-xl">{t("Network_Volume_Stats")}</span>
                <Menu as="div" className="relative">
                    <Menu.Button as="span" className="flex cursor-pointer ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
                            <g className="stroke-primary" transform="translate(0.396 0.396)">
                                <g
                                    id="Ellipse_1825"
                                    data-name="Ellipse 1825"
                                    transform="translate(1.104 1.104)"
                                    fill="none"
                                    strokeLinecap="square"
                                    strokeMiterlimit="10"
                                    strokeWidth="1.5"
                                >
                                    <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                    <circle cx="7" cy="7" r="7.75" fill="none"></circle>
                                </g>
                                <g id="question" transform="translate(0.26 2.819)">
                                    <path
                                        id="Path_30768"
                                        data-name="Path 30768"
                                        d="M7.218,6.93a2.78,2.78,0,0,1,.228-1.41,2.976,2.976,0,0,1,.8-.862c.753-.595,1.073-.9,1.073-1.541,0-.708-.528-.993-1.239-.993a3.986,3.986,0,0,0-1.906.525l-.479-1A5.021,5.021,0,0,1,8.177,1a2.685,2.685,0,0,1,1.775.548,1.863,1.863,0,0,1,.656,1.512,2.034,2.034,0,0,1-.5,1.4,6.163,6.163,0,0,1-.876.787,3.352,3.352,0,0,0-.71.69,1.71,1.71,0,0,0-.18.993H7.218Z"
                                        transform="translate(0)"
                                        className="fill-primary"
                                    ></path>
                                    <circle
                                        id="Ellipse_1827"
                                        data-name="Ellipse 1827"
                                        cx="0.779"
                                        cy="0.779"
                                        r="0.779"
                                        transform="translate(6.982 8.013)"
                                        className="fill-primary"
                                    ></circle>
                                </g>
                            </g>
                        </svg>
                    </Menu.Button>
                    <Menu.Items>
                        <div
                            className={clsx(
                                "-translate-x-1/2 translate-y-[30px] w-[225px] p-2.5 bg-light text-secondary border-custom-border absolute top-0 left-0 z-[1000] min-w-[10rem] mt-0.5 text-base text-left rounded border border-black/[.15]",
                                "before:content-[''] before:absolute before:-top-2.5 before:left-[calc(50%+10px)] before:w-0 before:h-0 before:border-t-[0] before:border-x-[5px] before:border-b-[10px] before:border-transparent before:border-b-light",
                            )}
                        >
                            <p className="m-0 leading-[1.2] text-xs ">{t("commission_7lvl")}</p>
                        </div>
                    </Menu.Items>
                </Menu>
            </div>
            <div className="card-body px-5 pb-4 lg:h-[205px] lg:overflow-scroll">
                <div className="w-[360px] border-custom-border border-y grid grid-cols-12 -mx-[15px]">
                    <div className="col-span-5 px-[15px]">
                        <p className="capitalize leading-[26px] text-text text-xs ">{t("month")}</p>
                    </div>
                    <div className="col-span-7 px-[15px]">
                        <p className="capitalize leading-[26px] text-text text-xs ">{t("volume")}</p>
                    </div>
                </div>
                <div className="data-content">
                    {data?.c.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="w-[360px] border-custom-border border-b grid grid-cols-12 -mx-[15px] text-light"
                            >
                                <div className="col-span-5 px-[15px]">
                                    <p className="leading-[40px]">{item.m}</p>
                                </div>
                                <div className="col-span-7 px-[15px]">
                                    <p className="leading-[40px]">
                        <HideInfo placehodler="***"> ${Formatter.formatNumber(item.month_volume || 0, 2)}</HideInfo>

                                        
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="card-footer px-5 rounded-b-[13px] absolute left-0 right-0 bottom-0 bg-primary text-light">
                <div className="grid grid-cols-12 -mx-[15px]">
                    <div className="col-span-5 px-[15px]">
                        <p className="leading-[45px] text-lg font-bold">{t("total")}</p>
                    </div>
                    <div className="col-span-7 px-[15px]">
                        <p className="leading-[45px] text-lg font-bold">
                        <HideInfo placehodler="***">${Formatter.formatNumber(data?.c[0]?.total_volume || 0, 2)} </HideInfo>

                            
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateNetworkVolStat;
