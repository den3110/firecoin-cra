"use client";

import useAffiliateOverviewQuery from "@/hooks/queries/useAffiliateOverviewQuery";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Loading from "@/components/Loading";
import Formatter from "@/utils/Formatter";
import RankZero from "@/app/[locale]/(panel)/(affiliate)/affiliate/general/_partials/RankZero";
import dynamic from "next/dynamic";
import AffiliateNetworkVolStat from "@/app/[locale]/(panel)/(affiliate)/affiliate/general/_partials/AffiliateNetworkVolStat";
import botImg from "@/assets/images/bot.svg";
import AffiliateRankModal from "@/app/[locale]/(panel)/(affiliate)/affiliate/general/_partials/AffiliateRankModal";
import BoxRank from "@/components/BoxRank";
import useAuth from "@/hooks/useAuth";
import copy from "copy-to-clipboard";
import { getCurrentHost } from "@/utils/clientInfo";
import HideInfo from "@/components/HideInfo";
import clientStylesConfig from "@/clientStylesConfig";

const AffiliateStats = dynamic(
    () => import("@/app/[locale]/(panel)/(affiliate)/affiliate/general/_partials/AffiliateStats"),
    {
        ssr: false,
    },
);

const GeneralAffiliatePage = () => {
    const t = useTranslations();
    const { enqueueSnackbar } = useSnackbar();
    const [siteInfo, setSiteInfo] = useState({});

    const { data: overviewData, isLoading } = useAffiliateOverviewQuery();

    const [auth, _] = useAuth();

    const [openRankModal, setOpenRankModal] = useState(false);

    const handleCopy = (text) => {
        return () => {
            if(copy(text))
                enqueueSnackbar(t("copied_to_clipboard"), { variant: "success" });
        };
    };


    
    useEffect(() => {

        const hostname = window.location.hostname;

        const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

        if(currentHostname)
            setSiteInfo(currentHostname);
    }, []);

    if (overviewData?.rank < 1) {
        return <RankZero />;
    }



    return (
        <>
            <div className="mt-6 w-full max-w-[1205px] mx-auto px-2.5 py-[25px]">
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-[15px]">
                        <div className="col-span-1">
                            <Loading
                                loading={isLoading}
                                className="border border-custom-border bg-secondary w-full p-5 rounded-[20px] h-full"
                            >
                                <div className="border-custom-border relative h-[100px] text-center gap-2 border-b pb-4 mb-4 flex items-center">
                                    <BoxRank
                                        rank={overviewData?.rank || 0}
                                        onRankModal={() => setOpenRankModal(true)}
                                    />
                                </div>
                                <div className="body">
                                    <h5 className="text-left text-light mb-4 text-[1.25rem] font-medium leading-[1.2]">
                                        {t("next_rank_conditions")}
                                    </h5>
                                    <div className="grid grid-cols-12 gap-[15px] leading-[20px]">
                                        <div className="col-span-12 md:col-span-7 relative">
                                            <p className="text-sm text-[#5d606c] mb-2">
                                                F1 {t("volume")} ({t("this_week")})
                                            </p>
                                            <p className="text-lg text-primary">
                                                <span className="text-light">
                                                    <HideInfo placehodler="***">{Formatter.formatNumber(overviewData?.current_week_f1_vol || 0)}</HideInfo>
                                                     /{" "}
                                                </span>
                                                <span className="text-text">
                                                <HideInfo placehodler="***"> {Formatter.formatNumber(
                                                        overviewData?.current_week_f1_nextrankvol || 0,
                                                    )}</HideInfo>

                                                   
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-span-12 md:col-span-5 relative">
                                            <p className="text-sm text-[#5d606c] mb-2">F1 VIP</p>
                                            <p className="text-lg text-primary">
                                                <span className="text-light">
                                                <HideInfo placehodler="***">{Formatter.formatNumber(overviewData?.f1_agencies || 0)}</HideInfo>

                                                     /{" "}
                                                </span>
                                                <span className="text-text">
                                                <HideInfo placehodler="***">   {Formatter.formatNumber(overviewData?.upnextrank_agencies || 0)}</HideInfo>

                                                 
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Loading>
                        </div>
                        <div className="col-span-1">
                            <div className="border border-custom-border bg-secondary w-full p-5 rounded-[20px] h-full">
                                <div className="referal-sponsor flex gap-2.5 mt-4 items-center">
                                    <p className="mb-0">
                                        <span className="text-xs text-[#5d606c] mb-2">{t("referral_sponsor")}</span>
                                    </p>
                                    <p className="text-lg text-light">
                                    <HideInfo placehodler="***">{overviewData?.sponsor || "***"}</HideInfo>

                                        </p>
                                </div>
                                <hr className="border-custom-border my-4 border-t" />
                                <div className="link-group flex m-0 after:block after:clear-both after:content-['']">
                                    <div className="grid grid-cols-2 gap-y-2 w-full">
                                        <div>
                                            <p className="text-xs text-[#5d606c] mb-2">{t("total_referrals")}</p>
                                            <p className="text-xl text-up mb-4">
                                            <HideInfo placehodler="***">{Formatter.formatNumber(overviewData?.referrals || 0)}</HideInfo>

                                                
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5d606c] mb-2">{t("total_agencies")}</p>
                                            <p className="text-xl text-[#00b6ff] mb-4">
                                            <HideInfo placehodler="***">{Formatter.formatNumber(overviewData?.agencies || 0)}</HideInfo>

                                                
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5d606c] mb-2">{t("trading_commission")}</p>
                                            <p className="text-xl text-danger mb-4">
                                            <HideInfo placehodler="***">{Formatter.formatNumber(overviewData?.trading_coms || 0, 2)}</HideInfo>

                                                
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5d606c] mb-2">{t("license_commission")}</p>
                                            <p className="text-xl text-primary mb-4">
                                            <HideInfo placehodler="***">{Formatter.formatNumber(overviewData?.license_coms || 0, 2)}</HideInfo>

                                                
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="border border-custom-border bg-secondary w-full p-5 rounded-[20px] h-full">
                                <p className="text-base font-bold text-light mb-4 align-middle">
                                    <svg
                                        id="unlink"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 15.885 15.885"
                                        className="mr-1 inline-block"
                                    >
                                        <path
                                            id="Path_34840"
                                            data-name="Path 34840"
                                            d="M13.347,9.63l1.191-1.191a4.961,4.961,0,0,0,1.39-3.475,4.657,4.657,0,0,0-1.489-3.475A4.657,4.657,0,0,0,10.964,0,4.657,4.657,0,0,0,7.489,1.489L6.3,2.581a.96.96,0,0,0,0,1.39.96.96,0,0,0,1.39,0L8.879,2.78a3.063,3.063,0,0,1,4.17,0,3.08,3.08,0,0,1,.894,2.184,2.7,2.7,0,0,1-.894,2.085L11.957,8.24a.96.96,0,0,0,0,1.39.96.96,0,0,0,1.39,0Z"
                                            transform="translate(-0.043)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34841"
                                            data-name="Path 34841"
                                            d="M8.24,11.957,7.049,13.148a3.063,3.063,0,0,1-4.17,0,3.08,3.08,0,0,1-.894-2.184,2.7,2.7,0,0,1,.894-2.085L3.971,7.688a.96.96,0,0,0,0-1.39.96.96,0,0,0-1.39,0L1.489,7.489A4.657,4.657,0,0,0,0,10.964a4.657,4.657,0,0,0,1.489,3.475,4.657,4.657,0,0,0,3.475,1.489,4.657,4.657,0,0,0,3.475-1.489L9.63,13.247a.951.951,0,1,0-1.39-1.291Z"
                                            transform="translate(0 -0.043)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34842"
                                            data-name="Path 34842"
                                            d="M9.368,5.2,5.2,9.368a.96.96,0,0,0,0,1.39,1.072,1.072,0,0,0,.695.3,1.072,1.072,0,0,0,.695-.3l4.17-4.17A.983.983,0,1,0,9.368,5.2Z"
                                            transform="translate(-0.035 -0.035)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34843"
                                            data-name="Path 34843"
                                            d="M2.283,3.673a.9.9,0,0,0,.695.3.9.9,0,0,0,.695-.3.96.96,0,0,0,0-1.39L1.688.3A.96.96,0,0,0,.3.3a.96.96,0,0,0,0,1.39Z"
                                            transform="translate(0 0)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34844"
                                            data-name="Path 34844"
                                            d="M13.688,12.3a.983.983,0,1,0-1.39,1.39l1.986,1.986a.96.96,0,0,0,1.39,0,.96.96,0,0,0,0-1.39Z"
                                            transform="translate(-0.087 -0.087)"
                                            fill="var(--primary)"
                                        ></path>
                                    </svg>
                                    {" " + t("registration_link") + " "}
                                </p>
                                <div className="relative mb-6 flex">
                                    <div className="left-control w-[90%]">
                                        <input
                                            className="bg-secondary text-light border-custom-border text-[.875rem] rounded-l-[.5rem] px-2.5 h-10 leading-[40px] w-full"
                                            value={`${getCurrentHost()}/register?r=${auth?.user?.rc}`}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="right-control">
                                        <button
                                            className="text-base text-light bg-gradient-primary border-none h-full rounded-r-[3px] flex justify-center items-center whitespace-nowrap cursor-pointer font-bold transition-all duration-300 text-center align-middle px-3 py-[.375rem] leading-[1.5]"
                                            onClick={handleCopy(
                                                `${getCurrentHost()}/register?r=${auth?.user?.rc}`,
                                            )}
                                        >
                                            {t("copy")}
                                        </button>
                                    </div>
                                </div>
                                <p className="text-base font-bold text-light mb-4 align-middle">
                                    <svg
                                        id="unlink"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 15.885 15.885"
                                        className="mr-1 inline-block"
                                    >
                                        <path
                                            id="Path_34840"
                                            data-name="Path 34840"
                                            d="M13.347,9.63l1.191-1.191a4.961,4.961,0,0,0,1.39-3.475,4.657,4.657,0,0,0-1.489-3.475A4.657,4.657,0,0,0,10.964,0,4.657,4.657,0,0,0,7.489,1.489L6.3,2.581a.96.96,0,0,0,0,1.39.96.96,0,0,0,1.39,0L8.879,2.78a3.063,3.063,0,0,1,4.17,0,3.08,3.08,0,0,1,.894,2.184,2.7,2.7,0,0,1-.894,2.085L11.957,8.24a.96.96,0,0,0,0,1.39.96.96,0,0,0,1.39,0Z"
                                            transform="translate(-0.043)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34841"
                                            data-name="Path 34841"
                                            d="M8.24,11.957,7.049,13.148a3.063,3.063,0,0,1-4.17,0,3.08,3.08,0,0,1-.894-2.184,2.7,2.7,0,0,1,.894-2.085L3.971,7.688a.96.96,0,0,0,0-1.39.96.96,0,0,0-1.39,0L1.489,7.489A4.657,4.657,0,0,0,0,10.964a4.657,4.657,0,0,0,1.489,3.475,4.657,4.657,0,0,0,3.475,1.489,4.657,4.657,0,0,0,3.475-1.489L9.63,13.247a.951.951,0,1,0-1.39-1.291Z"
                                            transform="translate(0 -0.043)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34842"
                                            data-name="Path 34842"
                                            d="M9.368,5.2,5.2,9.368a.96.96,0,0,0,0,1.39,1.072,1.072,0,0,0,.695.3,1.072,1.072,0,0,0,.695-.3l4.17-4.17A.983.983,0,1,0,9.368,5.2Z"
                                            transform="translate(-0.035 -0.035)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34843"
                                            data-name="Path 34843"
                                            d="M2.283,3.673a.9.9,0,0,0,.695.3.9.9,0,0,0,.695-.3.96.96,0,0,0,0-1.39L1.688.3A.96.96,0,0,0,.3.3a.96.96,0,0,0,0,1.39Z"
                                            transform="translate(0 0)"
                                            fill="var(--primary)"
                                        ></path>
                                        <path
                                            id="Path_34844"
                                            data-name="Path 34844"
                                            d="M13.688,12.3a.983.983,0,1,0-1.39,1.39l1.986,1.986a.96.96,0,0,0,1.39,0,.96.96,0,0,0,0-1.39Z"
                                            transform="translate(-0.087 -0.087)"
                                            fill="var(--primary)"
                                        ></path>
                                    </svg>
                                    {" " + t("referral_code") + " "}
                                </p>
                                <div className="relative mb-6 flex">
                                    <div className="left-control w-[90%]">
                                        <input
                                            className="bg-secondary text-light border-custom-border text-[.875rem] rounded-l-[.5rem] px-2.5 h-10 leading-[40px] w-full"
                                            value={auth?.user?.rc}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="right-control">
                                        <button
                                            className="text-base text-light bg-gradient-primary border-none h-full rounded-r-[3px] flex justify-center items-center whitespace-nowrap cursor-pointer font-bold transition-all duration-300 text-center align-middle px-3 py-[.375rem] leading-[1.5]"
                                            onClick={handleCopy(auth?.user?.rc)}
                                        >
                                            {t("copy")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-[15px] mt-6">
                        <div className="lg:col-span-2">
                            <AffiliateStats />
                        </div>
                        <div className="col-span-1">
                            <AffiliateNetworkVolStat />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-[15px] mt-6">
                        <div className="border border-custom-border bg-secondary w-full rounded-[20px] h-full">
                            <div className="card-header px-5 py-4 flex items-center ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22.678"
                                    height="22.678"
                                    viewBox="0 0 22.678 22.678"
                                    className="mr-2"
                                >
                                    <g id="headphones-mic" transform="translate(0.5 0.5)" >
                                        <path
                                            id="Path_29605"
                                            data-name="Path 29605"
                                            d="M1.5,9.826V6.014A5.515,5.515,0,0,1,7.014.5h6.893a5.515,5.515,0,0,1,5.514,5.514V9.826"
                                            transform="translate(0.379)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29606"
                                            data-name="Path 29606"
                                            d="M6.014,14.771H4.636A4.135,4.135,0,0,1,.5,10.636h0A4.135,4.135,0,0,1,4.636,6.5H6.014Z"
                                            transform="translate(0 2.271)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29607"
                                            data-name="Path 29607"
                                            d="M11.5,14.771h1.379a4.135,4.135,0,0,0,4.136-4.136h0A4.135,4.135,0,0,0,12.879,6.5H11.5Z"
                                            transform="translate(4.164 2.271)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29608"
                                            data-name="Path 29608"
                                            d="M12.15,16.636H5.257A2.756,2.756,0,0,1,2.5,13.879V12.5"
                                            transform="translate(0.757 4.543)"
                                            fill="none"
                                            stroke="var(--primary)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                    </g>
                                </svg>
                                <span className="text-xl text-light font-bold first-letter:capitalize">
                                    {t("get_in_touch")}
                                </span>
                            </div>
                            <div className="card-body p-5 pb-4">
                                <div className="grid grid-cols-3">
                                    <div className="col-span-1 flex flex-col items-center">
                                        <img src={botImg} alt="bot img" className="mb-4" />
                                        <p className="text-ellipsis whitespace-nowrap overflow-hidden text-light text-sm mb-2">
                                            {process.env.NEXT_PUBLIC_SUPPORT_NAME}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-light/50 text-sm mb-2">{t("email")}</p>
                                        <p className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15.223"
                                                height="13"
                                                viewBox="0 0 15.223 13"
                                            >
                                                <g id="email" transform="translate(0.5 0.5)">
                                                    <path
                                                        id="Path_29581"
                                                        data-name="Path 29581"
                                                        d="M13.775,13.5H1.448a.975.975,0,0,1-.948-1V2.5a.975.975,0,0,1,.948-1H13.775a.975.975,0,0,1,.948,1v10A.975.975,0,0,1,13.775,13.5Z"
                                                        transform="translate(-0.5 -1.5)"
                                                        fill="none"
                                                        stroke="var(--primary)"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        strokeWidth="1"
                                                    ></path>
                                                    <path
                                                        id="Path_29582"
                                                        data-name="Path 29582"
                                                        d="M2.5,4.5,7.715,9,12.93,4.5"
                                                        transform="translate(-0.604 -1.5)"
                                                        fill="none"
                                                        stroke="var(--primary)"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        strokeWidth="1"
                                                    ></path>
                                                    <line
                                                        id="Line_1314"
                                                        data-name="Line 1314"
                                                        y1="1.5"
                                                        x2="1.422"
                                                        transform="translate(1.896 7.5)"
                                                        fill="none"
                                                        stroke="var(--primary)"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        strokeWidth="1"
                                                    ></line>
                                                    <line
                                                        id="Line_1315"
                                                        data-name="Line 1315"
                                                        x1="1.422"
                                                        y1="1.5"
                                                        transform="translate(10.904 7.5)"
                                                        fill="none"
                                                        stroke="var(--primary)"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                        strokeWidth="1"
                                                    ></line>
                                                </g>
                                            </svg>
                                            <a
                                                href={`mailto:${siteInfo?.contactEmail}`}
                                                className="block text-ellipsis whitespace-nowrap overflow-hidden text-light text-sm no-underline ml-2"
                                            >
                                                {siteInfo?.contactEmail}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AffiliateRankModal open={openRankModal} onClose={() => setOpenRankModal(false)} />
        </>
    );
};

export default GeneralAffiliatePage;
