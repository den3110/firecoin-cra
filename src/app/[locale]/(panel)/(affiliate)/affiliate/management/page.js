"use client";

import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useState } from "react";
import { Menu } from "@headlessui/react";
import NetworkManagementSearchResult from "@/app/[locale]/(panel)/(affiliate)/affiliate/management/_partials/NetworkManagementSearchResult";
import { useDesktop } from "@/hooks/responsives";
import NetworkManagementViewUser from "@/app/[locale]/(panel)/(affiliate)/affiliate/management/_partials/NetworkManagementViewUser";
import HideInfo from "@/components/HideInfo";

const AffiliateManagementPage = () => {
    const {t } = useTranslation();

    const [preparedSearchBy, setPreparedSearchBy] = useState("level");
    const [preparedLevel, setPreparedLevel] = useState(1);
    const [preparedUsername, setPreparedUsername] = useState("");

    const [searchBy, setSearchBy] = useState(preparedSearchBy);
    const [level, setLevel] = useState(preparedLevel);
    const [username, setUsername] = useState(preparedUsername);

    const [userToView, setUserToView] = useState(null);

    const isDesktop = useDesktop();

    const handleSearch = () => {
        setSearchBy(preparedSearchBy);
        setLevel(preparedLevel);
        setUsername(preparedUsername);
    };

    const handleViewUser = (user) => {
        setUserToView(user);
    };

    if (userToView) {
        return <NetworkManagementViewUser username={userToView} onViewUser={handleViewUser} />;
    }

    return (
        <HideInfo isPage={true}>
   <div>
            <div className="w-full">
                <div className="filter-list bg-custom-chart-title max-[575px]:px-5 max-[1024px]:px-[15px] lg:px-[42px] py-[37px] mb-[33px]">
                    <h1 className="text-light font-bold text-[1.875rem] capitalize mb-6 leading-[1.2]">
                        {t("manage_your_affiliate")}
                    </h1>
                    <div>
                        <div
                            className={clsx(
                                "relative lg:mr-12 align-middle inline-block mb-4 lg:mb-0",
                                isDesktop &&
                                    "before:content-[''] before:w-[1px] before:h-[45px] before:absolute before:z-[898888] before:-right-[25px] before:top-[22px] before:opacity-60 before:bg-custom-divider",
                            )}
                        >
                            <p className="text-light/50 mb-1 mt-0">{t("search_type")}</p>
                            <button
                                className={clsx(
                                    "text-light border-none rounded-[10px] min-w-[162px] py-[9px] relative transition-all inline-flex items-center justify-center mr-4 text-center align-middle text-base leading-[1.5]",
                                    preparedSearchBy === "level"
                                        ? "border-transparent bg-gradient-primary font-bold"
                                        : "bg-secondary-400 border border-text font-normal",
                                )}
                                onClick={() => setPreparedSearchBy("level")}
                            >
                                {t("by_level")}
                            </button>
                            <button
                                className={clsx(
                                    "text-light border-none rounded-[10px] min-w-[162px] py-[9px] relative transition-all inline-flex items-center justify-center text-center align-middle text-base leading-[1.5]",
                                    preparedSearchBy === "username"
                                        ? "border-transparent bg-gradient-primary font-bold"
                                        : "bg-secondary-400 border border-text font-normal",
                                )}
                                onClick={() => setPreparedSearchBy("username")}
                            >
                                {t("username")}
                            </button>
                        </div>
                        <div className="align-middle w-full lg:w-1/2 inline-block">
                            <div>
                                <p className="mb-1 text-light/50">
                                    {preparedSearchBy === "level"
                                        ? t("view_your_referrals_by_level")
                                        : t("view_your_referrals_by_username")}
                                </p>
                                <div className="flex">
                                    {preparedSearchBy === "level" ? (
                                        <Menu as="div" className="dropdown mr-2 relative flex-1 lg:flex-none">
                                            <Menu.Button className="w-full lg:w-auto">
                                                <button
                                                    className={clsx(
                                                        "font-normal border-transparent rounded-[5px] bg-secondary-400 text-light border w-full lg:min-w-[162px] py-[9px] transition-all duration-200 whitespace-nowrap relative inline-block text-center align-middle select-none text-base leading-[1.5] m-0",
                                                        "after:inline-block after:ml-[.255em] after:align-[.255em] after:content-[''] after:border-t-[.3em] after:border-x-[.3em] after:border-x-transparent",
                                                    )}
                                                >
                                                    {t("level")} {preparedLevel}
                                                </button>
                                            </Menu.Button>
                                            <Menu.Items>
                                                <div className="border-custom-border bg-custom-chart-title absolute top-full left-0 z-[1000] float-left min-w-[10rem] py-2 mt-0.5 text-base text-custom-dropdown text-left bg-clip-padding border rounded">
                                                    {/*Level 1 - 7*/}
                                                    {[...Array(7)].map((_, index) => (
                                                        <Menu.Item key={index + 1}>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={clsx(
                                                                        "text-light py-2 block w-full px-6 clear-both whitespace-nowrap bg-transparent hover:text-primary",
                                                                        index + 1 !== 7 &&
                                                                            "border-b border-b-custom-border",
                                                                    )}
                                                                    onClick={() => setPreparedLevel(index + 1)}
                                                                >
                                                                    {t("level")} {index + 1}
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Menu>
                                    ) : (
                                        <input
                                            className="bg-light text-[#333] h-[45px] rounded-[8px] border-b-[#868f93] border-b px-2.5 leading-[40px] block text-sm transition-colors duration-150 focus:ring-0"
                                            placeholder={t("enter_username")}
                                            value={preparedUsername}
                                            onChange={(e) => setPreparedUsername(e.target.value)}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        className="ml-4 text-light bg-gradient-primary border-none min-w-[170px] cursor-pointer px-[28px] transition-all duration-500 h-[42px] whitespace-nowrap relative font-bold inline-flex items-center justify-center text-center align-middle text-base leading-[1.5] rounded"
                                        onClick={handleSearch}
                                    >
                                        <span>{t("search")}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NetworkManagementSearchResult
                    level={level}
                    username={username}
                    searchBy={searchBy}
                    onViewUser={handleViewUser}
                />
            </div>
        </div>
        </HideInfo>
     
    );
};

export default AffiliateManagementPage;
