"use client";

import useAffiliateOverviewQuery from "@/hooks/queries/useAffiliateOverviewQuery";
import { useEffect } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const AffiliateLayout = ({ children }) => {
    const {t } = useTranslation();
    const { data } = useAffiliateOverviewQuery();

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (data?.rank !== null && data?.rank < 1 && !pathname.startsWith("/affiliate/general")) {
            router.push("/affiliate/general");
        }
    }, [data?.rank, pathname, router]);

    useEffect(() => {
        document.querySelector("#affiliate-menu .nav-link.active")?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }, [pathname]);

    if (data?.rank !== null && data?.rank < 1 && pathname.startsWith("/affiliate/general")) {
        return <div>{children}</div>;
    }

    return (
        <div
            className={clsx({
                "bg-[url('~/public/assets2/images/upgrade-agency.png')] min-h-[calc(100vh-65px)] bg-cover bg-[top_20px_center] bg-no-repeat pb-[50px]":
                    pathname.startsWith("/upgrade-vip"),
            })}
        >
            <div
                className={clsx("h-[55px]", {
                    "mb-4": !pathname.startsWith("/affiliate/management") && !pathname.startsWith("/upgrade-vip"),
                })}
            >
                <div></div>
                <div>
                    <div className="balance-link bg-custom-chart-title mb-6">
                        <div className="px-[15px] w-screen lg:w-auto">
                            <ul
                                id="affiliate-menu"
                                className="nav nav-pills flex-nowrap whitespace-nowrap w-full overflow-x-auto"
                            >
                                <li className="nav-item">
                                    <Link
                                        href="/affiliate/general"
                                        className={clsx("nav-link", {
                                            active: pathname === "/affiliate/general",
                                        })}
                                    >
                                        {t("general")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href="/affiliate/commission"
                                        className={clsx("nav-link", {
                                            active: pathname === "/affiliate/commission",
                                        })}
                                    >
                                        {t("commission")}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href="/affiliate/management"
                                        className={clsx("nav-link", {
                                            active: pathname === "/affiliate/management",
                                        })}
                                    >
                                        {t("network_management")}
                                    </Link>
                                </li>
                                <li className={`nav-item relative before:top-[20px] before:right-0 before:min-[1200px]:top-0 before:min-[1200px]:-right-[15px] before:absolute before:bg-[url('~/public/assets2/images/icon-new.svg')] before:block before:overflow-hidden before:w-[25px] before:h-[21px] before:content-[''] before:bg-[length:100%_100%]`}>
                                    <Link
                                        href="/upgrade-vip"
                                        className={clsx("nav-link", {
                                            active: pathname === "/upgrade-vip",
                                        })}
                                    >
                                        {t("upgrade_vip_level")}
                                    </Link>
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <Link*/}
                                {/*        href="/user/binary-wallet"*/}
                                {/*        className={clsx("nav-link", {*/}
                                {/*            active: pathname === "/user/binary-wallet",*/}
                                {/*        })}*/}
                                {/*    >*/}
                                {/*        {t("exchange_wallet")}*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default AffiliateLayout;
