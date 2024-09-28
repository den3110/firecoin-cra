import { useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
import BoxRank from "@/components/BoxRank";
import Formatter from "@/utils/Formatter";
import UserAvatar from "@/components/UserAvatar";
import dynamic from "next/dynamic";

const NetworkManagementUserStat = dynamic(
    () => import("@/app/[locale]/(panel)/(affiliate)/affiliate/management/_partials/NetworkManagementUserStat"),
    {
        ssr: false,
    },
);

const NetworkManagementViewUser = ({ username, onViewUser }) => {
    const t = useTranslations();

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        setLoading(true);
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/user/overview/nick/" + username)
            .then((res) => res.data)
            .then((data) => {
                setUserInfo(data.d);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [username]);

    const handleBack = () => {
        onViewUser?.(null);
    };

    // if (!userInfo) {
    //     return null;
    // }

    return (
        <div className="wrapper-content">
            <div className="w-full">
                <div className="pl-4 pr-4">
                    <div className="my-4 flex items-center">
                        <button
                            className="text-light border-none bg-light/[.18] cursor-pointer inline-block font-normal text-center align-middle px-3 py-[.375rem] text-base leading-[1.5] rounded"
                            onClick={handleBack}
                        >
                            <span className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16.003"
                                    height="12.059"
                                    viewBox="0 0 16.003 12.059"
                                >
                                    <g id="rounded-head-arrow" transform="translate(16.003 12.059) rotate(180)">
                                        <path
                                            id="Path_29622"
                                            data-name="Path 29622"
                                            d="M15.5,4.945l-5-4.5a1.5,1.5,0,1,0-2,2.229l2.09,1.885H1.5a1.5,1.5,0,1,0,0,3h9.092L8.5,9.444a1.5,1.5,0,1,0,2.006,2.23l5-4.5a1.5,1.5,0,0,0,0-2.23Z"
                                            className="fill-primary"
                                        ></path>
                                    </g>
                                </svg>
                                <span className="text-sm ml-2">{t("back")}</span>
                            </span>
                        </button>
                        <span className="leading-[1.3] text-ellipsis whitespace-nowrap overflow-hidden text-light ml-4">
                            {username}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] gap-y-[15px]">
                        <div className="mb-4">
                            <Loading
                                className="border-custom-border bg-secondary border w-full p-5 rounded-[20px] h-full"
                                loading={loading}
                            >
                                <div className="heading relative h-[100px] text-center gap-2 pb-4 mb-4 items-center flex">
                                    <BoxRank rank={userInfo?.rank} />
                                </div>
                                <div className="body">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[15px]">
                                        <div>
                                            <p className="text-light/50 text-sm mb-2">{t("total_referrals")}</p>
                                            <p className="text-xl text-success-50 m-0">
                                                {Formatter.formatNumber(userInfo?.referrals)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-light/50 text-sm mb-2">{t("total_agencies")}</p>
                                            <p className="text-xl text-primary m-0">
                                                {Formatter.formatNumber(userInfo?.agencies)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-light/50 text-sm mb-2">{t("total_commission")}</p>
                                            <p className="text-xl text-danger m-0">
                                                {Formatter.formatNumber(userInfo?.trading_coms)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-light/50 text-sm mb-2">{t("sponsor")}</p>
                                            <p className="text-xl text-light m-0">
                                                {userInfo?.sponsor ? userInfo.sponsor : "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Loading>
                        </div>
                        <div className="mb-4">
                            <Loading
                                className="border-custom-border bg-secondary border w-full p-5 rounded-[20px] h-full"
                                loading={loading}
                            >
                                <div className="w-full mx-[15px]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22.678"
                                        height="22.678"
                                        viewBox="0 0 22.678 22.678"
                                        className="inline"
                                    >
                                        <g id="headphones-mic" transform="translate(0.5 0.5)">
                                            <path
                                                id="Path_29605"
                                                data-name="Path 29605"
                                                d="M1.5,9.826V6.014A5.515,5.515,0,0,1,7.014.5h6.893a5.515,5.515,0,0,1,5.514,5.514V9.826"
                                                transform="translate(0.379)"
                                                fill="none"
                                                className="stroke-primary"
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
                                                className="stroke-primary"
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
                                                className="stroke-primary"
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
                                                className="stroke-primary"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="10"
                                                strokeWidth="2"
                                            ></path>
                                        </g>
                                    </svg>
                                    <span className="text-light text-xl ml-2">{t("information")}</span>
                                </div>
                                <div className="w-full px-[15px] lg:mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[30px] w-full">
                                        <div className="md:col-span-5">
                                            <UserAvatar url={userInfo?.photo_url} />
                                            <h5 className="mt-4 text-center text-xl text-light font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                                {userInfo?.nn}
                                            </h5>
                                        </div>
                                        <div className="md:col-span-7">
                                            <p className="text-light/50 mt-0 mb-4">{t("email")}</p>
                                            <p className="text-ellipsis whitespace-nowrap overflow-hidden mb-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="13"
                                                    viewBox="0 0 16 13"
                                                    className="mr-1 inline"
                                                >
                                                    <g id="email" transform="translate(0.5 0.5)">
                                                        <path
                                                            id="Path_29581"
                                                            data-name="Path 29581"
                                                            d="M14.5,13.5H1.5a1,1,0,0,1-1-1V2.5a1,1,0,0,1,1-1h13a1,1,0,0,1,1,1v10A1,1,0,0,1,14.5,13.5Z"
                                                            transform="translate(-0.5 -1.5)"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></path>
                                                        <path
                                                            id="Path_29582"
                                                            data-name="Path 29582"
                                                            d="M2.5,4.5,8,9l5.5-4.5"
                                                            transform="translate(-0.5 -1.5)"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></path>
                                                        <line
                                                            id="Line_1314"
                                                            data-name="Line 1314"
                                                            y1="1.5"
                                                            x2="1.5"
                                                            transform="translate(2 7.5)"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></line>
                                                        <line
                                                            id="Line_1315"
                                                            data-name="Line 1315"
                                                            x1="1.5"
                                                            y1="1.5"
                                                            transform="translate(11.5 7.5)"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></line>
                                                    </g>
                                                </svg>
                                                <span className="underline text-light">
                                                    {" "}
                                                    {userInfo?.email || "N/A"}
                                                </span>
                                            </p>
                                            <p className="text-light/50 mt-0 mb-4">{t("phone_number")}</p>
                                            <p className="text-ellipsis whitespace-nowrap overflow-hidden mb-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="13.902"
                                                    height="13.902"
                                                    viewBox="0 0 13.902 13.902"
                                                    className="mr-1 inline"
                                                >
                                                    <g id="phone-call" transform="translate(-0.5 -0.5)">
                                                        <path
                                                            id="Path_29623"
                                                            data-name="Path 29623"
                                                            d="M11.138,9.294,9.294,11.138l-5.53-5.53L5.608,3.765,2.843,1,1,2.843A11.06,11.06,0,0,0,12.059,13.9L13.9,12.059Z"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></path>
                                                        <path
                                                            id="Path_29624"
                                                            data-name="Path 29624"
                                                            d="M8.5,4a3.226,3.226,0,0,1,3.226,3.226"
                                                            transform="translate(-0.588 -0.235)"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></path>
                                                        <path
                                                            id="Path_29625"
                                                            data-name="Path 29625"
                                                            d="M8.5,1a5.99,5.99,0,0,1,5.99,5.99"
                                                            transform="translate(-0.588)"
                                                            fill="none"
                                                            className="stroke-primary"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="1"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                <span className="underline text-light">
                                                    {" "}
                                                    {userInfo?.phone || "N/A"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Loading>
                        </div>
                        <div className="mb-4 lg:col-span-2">
                            <NetworkManagementUserStat username={username} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkManagementViewUser;
