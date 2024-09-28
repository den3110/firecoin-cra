"use client";

import upgradeAgencyImg from "@/assets/images/upgrade-agency.svg";

import { useTranslations } from "next-intl";
import useAffiliateOverviewQuery from "@/hooks/queries/useAffiliateOverviewQuery";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Menu } from "@headlessui/react";
import HttpClient from "@/services/HttpClient";
import Formatter from "@/utils/Formatter";
import { Link } from "@/navigation";
import { useSnackbar } from "notistack";
import HideInfo from "@/components/HideInfo";

const rankImages = {};

for (let i = 1; i <= 7; i++) {
    rankImages[i] = require(`@/assets/images/rank/${i}.png`);
}

const UpgradeVipPage = () => {
    const t = useTranslations();

    const { data: overviewData, refetch } = useAffiliateOverviewQuery();

    const [levelToUpgrade, setLevelToUpgrade] = useState(0);
    const [fees, setFees] = useState();
    const [totalF1Agencies, setTotalF1Agencies] = useState(0);
    const [acceptance, setAcceptance] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLevelToUpgrade(Math.min(7, overviewData?.rank + 1));
    }, [overviewData?.rank]);

    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/vip-level/upgrade-level/total-f1-agencies")
            .then((res) => res.data)
            .then((data) => {
                setTotalF1Agencies(data.d?.totalF1Agencies || 0);
            });
    }, []);

    const handleSelectLevel = (delta) => {
        return () => {
            let newLevel = levelToUpgrade + delta;

            if (newLevel <= overviewData?.rank || newLevel > 7) {
                return;
            }

            setLevelToUpgrade(newLevel);
        };
    };

    const getFee = useCallback(() => {
        if (!levelToUpgrade) {
            return;
        }

        HttpClient.instanceClient()
            .get("/api/wallet/vip-level/upgrade-level/price", {
                params: {
                    levelUpgrade: levelToUpgrade,
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setFees(data.d);
            });
    }, [levelToUpgrade]);

    useEffect(() => {
        getFee();
    }, [getFee]);

    const canSubmit = useMemo(() => {
        return !submitting && acceptance && fees?.usdt_price > 0 && totalF1Agencies >= levelToUpgrade + 1;
    }, [acceptance, fees?.usdt_price, levelToUpgrade, totalF1Agencies]);

    const handleSubmit = () => {
        setSubmitting(true);
        HttpClient.instanceClient()
            .post("/api/wallet/vip-level/upgrade-level", {
                levelUpgrade: levelToUpgrade,
            })
            .then((res) => res.data)
            .then((data) => {
                if (!data.ok) {
                    return;
                }

                enqueueSnackbar(t("upgrade_vip_success"), { variant: "success" });

                refetch().then();
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <HideInfo isPage={true}>
<div className="custom-container px-[15px]">
            <div className="flex flex-col justify-center">
                <div className="w-full">
                    <div className="text-center header-image pt-[40px]">
                        <img src={upgradeAgencyImg} alt="upgrade agency" width={241} className="inline-block" />
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-10 md:col-span-6 lg:col-span-5">
                    <div className="p-0 rounded-[16px] mx-auto mt-[90px] mb-[50px] opacity-100 bg-upgrade-vip-box-bg max-w-[420px]">
                        <div
                            className={clsx(
                                "header border-[2px] border-upgrade-vip-header-border rounded-t-[16px] p-[15px] bg-upgrade-vip-box-bg",
                                overviewData?.rank >= 7 ? "rounded-b-[16px]" : "border-b-transparent",
                            )}
                        >
                            <div className="bg-light/10 px-2.5 py-[5px] rounded-[10px] flex items-start">
                                <img src={rankImages[overviewData?.rank]} alt="rank" width={60} />
                                <div className="ml-2 self-center flex-1">
                                    <h2 className="text-light text-[15px] font-bold mb-0 leading-[1.2] mt-0">
                                        {overviewData?.nn}
                                    </h2>
                                    <p className="mb-0 text-xs text-light/50">
                                        {t("level")} {overviewData?.rank}
                                    </p>
                                </div>
                            </div>
                            {overviewData?.rank >= 7 && (
                                <p className="text-[#fdfdfd] text-lg text-center py-5">{t("congrats_max_level")}</p>
                            )}
                        </div>
                        {overviewData?.rank < 7 && (
                            <>
                                <div className="content bg-upgrade-vip-content-bg p-[15px] border-x-[2px] border-x-upgrade-vip-header-border">
                                    <div className="flex justify-between mb-6">
                                        <span className="text-light/50">{t("upgrade_vip_level")}</span>
                                        <div className="flex items-start">
                                            <span
                                                className={clsx(
                                                    "cursor-pointer text-light rounded border-none outline-none w-[33px] h-[33px] leading-[33px]",
                                                    levelToUpgrade <= overviewData?.rank + 1
                                                        ? "text-center bg-light/20 opacity-1"
                                                        : "text-center bg-upgrade-vip-header-border text-upgrade-vip-box-bg",
                                                )}
                                                onClick={handleSelectLevel(-1)}
                                            >
                                                -
                                            </span>
                                            <span className="w-auto px-5 mx-[5px] bg-light text-upgrade-vip-box-bg text-center rounded border-none outline-none h-[33px] leading-[33px]">
                                                {t("level")} {levelToUpgrade}
                                            </span>
                                            <span
                                                className={clsx(
                                                    "cursor-pointer text-light rounded border-none outline-none w-[33px] h-[33px] leading-[33px]",
                                                    levelToUpgrade >= 7
                                                        ? "text-center bg-light/20 opacity-1"
                                                        : "text-center bg-upgrade-vip-header-border text-upgrade-vip-box-bg",
                                                )}
                                                onClick={handleSelectLevel(1)}
                                            >
                                                +
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-6">
                                        <Menu as="div" className="inline relative">
                                            <Menu.Button>
                                                <span className="cursor-pointer">
                                                    <span className="text-light/50 mr-2 font-normal">
                                                        {t("upgrade_fee")}
                                                    </span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 17 17"
                                                        className="align-middle inline"
                                                    >
                                                        <g id="c-question" transform="translate(0.396 0.396)">
                                                            <g
                                                                id="Ellipse_1825"
                                                                data-name="Ellipse 1825"
                                                                transform="translate(1.104 1.104)"
                                                                fill="none"
                                                                stroke="#facc00"
                                                                strokeLinecap="square"
                                                                strokeMiterlimit="10"
                                                                strokeWidth="1.5"
                                                            >
                                                                <circle
                                                                    cx="7"
                                                                    cy="7"
                                                                    r="7"
                                                                    className="stroke-upgrade-vip-icon"
                                                                ></circle>
                                                                <circle
                                                                    cx="7"
                                                                    cy="7"
                                                                    r="7.75"
                                                                    className="fill-upgrade-vip-icon"
                                                                ></circle>
                                                            </g>
                                                            <g id="question" transform="translate(0.26 2.819)">
                                                                <path
                                                                    id="Path_30768"
                                                                    data-name="Path 30768"
                                                                    d="M7.218,6.93a2.78,2.78,0,0,1,.228-1.41,2.976,2.976,0,0,1,.8-.862c.753-.595,1.073-.9,1.073-1.541,0-.708-.528-.993-1.239-.993a3.986,3.986,0,0,0-1.906.525l-.479-1A5.021,5.021,0,0,1,8.177,1a2.685,2.685,0,0,1,1.775.548,1.863,1.863,0,0,1,.656,1.512,2.034,2.034,0,0,1-.5,1.4,6.163,6.163,0,0,1-.876.787,3.352,3.352,0,0,0-.71.69,1.71,1.71,0,0,0-.18.993H7.218Z"
                                                                    transform="translate(0)"
                                                                    fill="#000"
                                                                ></path>
                                                                <circle
                                                                    id="Ellipse_1827"
                                                                    data-name="Ellipse 1827"
                                                                    cx="0.779"
                                                                    cy="0.779"
                                                                    r="0.779"
                                                                    transform="translate(6.982 8.013)"
                                                                    fill="#000"
                                                                ></circle>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </Menu.Button>
                                            <Menu.Items>
                                                <div
                                                    className={clsx(
                                                        "-translate-x-[21%] -translate-y-full w-[290px] p-2.5 bg-light text-upgrade-vip-tooltip -top-[15px] rounded-[16px] bottom-full mt-0 mb-0.5 absolute left-0 z-[1000] min-w-[10rem] text-left border border-light/[.15] h-fit",
                                                        "before:top-full before:left-1/2 before:border-transparent before:content-[''] before:h-0 before:w-0 before:absolute before:border-[8px] before:ml-[1px] before:border-t-light",
                                                    )}
                                                >
                                                    <p className="ml-1">{t("upgrade_fee_tooltip")}</p>
                                                </div>
                                            </Menu.Items>
                                        </Menu>
                                        <div className="text-right">
                                            <span className="text-[#fdfdfd]/[.34] block text-sm">
                                                {Formatter.formatCurrency(fees?.usdt_price || 0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-light/50">{t("f1_purchased")}</span>
                                        <span className="font-bold text-light text-[15px]">
                                            <span className="text-light/50">{totalF1Agencies}</span>/
                                            {levelToUpgrade + 1}
                                        </span>
                                    </div>
                                </div>
                                <div className="footer border-[2px] border-upgrade-vip-header-border border-t-0 p-[15px] bg-upgrade-vip-box-bg rounded-b-[16px]">
                                    <div className="mb-4 text-[#454545] flex">
                                        <input
                                            id="accept-box"
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 focus:outline-none focus:ring-transparent rounded-sm mr-2.5"
                                            value="1"
                                            checked={acceptance}
                                            onChange={(e) => setAcceptance(e.target.checked)}
                                        />
                                        <label htmlFor="accept-box" className="text-[#fdfdfd] text-xs">
                                            {t("i_confirm_that_and_accept.text_before")}{" "}
                                            <Link
                                                href="/faqs/general-provitions"
                                                className="text-upgrade-vip-header-border underline hover:text-[#007bff]"
                                            >
                                                {t("term_of_service")}
                                            </Link>
                                        </label>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            disabled={!canSubmit}
                                            className="bg-upgrade-vip-header-border rounded-[6px] px-[15px] py-[12px] w-full max-w-[300px] font-bold mx-auto inline-block text-custom-dropdown text-base leading-[1.5] border border-transparent disabled:opacity-[.65] disabled:cursor-no-drop"
                                            onClick={handleSubmit}
                                        >
                                            {t("upgrade_level")}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex w-full">
                <div className="basis-full lg:basis-[calc(100%/12*7)] text-left text-sm text-upgrade-vip-header-border opacity-60 max-w-[965px] mx-auto">
                    {t("upgrade_vip_des")}
                </div>
            </div>
        </div>
        </HideInfo>
        
    );
};

export default UpgradeVipPage;
