"use client";

import { useTranslation } from "react-i18next";
import { Fragment, useMemo } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import clsx from "clsx";
import { Menu } from "@headlessui/react";

const FaqNavigator = () => {
    const {t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const items = useMemo(() => {
        return [
            {
                label: t("general-provitions"),
                href: "/faqs/general-provitions",
            },
            {
                label: t("terms-of-use"),
                href: "/faqs/terms-of-use",
            },
            {
                //communications
                label: t("communications"),
                href: "/faqs/communications",
            },
            {
                label: t("claims-resolution"),
                href: "/faqs/claims-resolution",
            },
            {
                //governing-law
                label: t("governing-law"),
                href: "/faqs/governing-law",
            },
            {
                //force-majeure
                label: t("force-majeure"),
                href: "/faqs/force-majeure",
            },
            {
                //liability-of-the-parties
                label: t("liability-of-the-parties"),
                href: "/faqs/liability-of-the-parties",
            },
            {
                //term-and-termination
                label: t("term-and-termination"),
                href: "/faqs/term-and-termination",
            },
            {
                //final-provisions
                label: t("final-provisions"),
                href: "/faqs/final-provisions",
            },
            {
                //rights-and-obligations
                label: t("rights-and-obligations"),
                href: "/faqs/rights-and-obligations",
            },
        ];
    }, [t]);

    const handleBack = () => {
        router.push("/");
    };

    const currentItem = items.find((item) => item.href === pathname);

    return (
        <>
            <div className="text-right">
                <button
                    className="bg-transparent border border-primary text-primary text-base transition-all duration-200 inline-block font-normal text-center align-middle px-3 py-[.375rem] rounded"
                    onClick={handleBack}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16.003"
                        height="12.059"
                        viewBox="0 0 16.003 12.059"
                        className="inline-block mr-2"
                    >
                        <path
                            id="Path_29622"
                            data-name="Path 29622"
                            d="M15.5,4.945l-5-4.5a1.5,1.5,0,1,0-2,2.229l2.09,1.885H1.5a1.5,1.5,0,1,0,0,3h9.092L8.5,9.444a1.5,1.5,0,1,0,2.006,2.23l5-4.5a1.5,1.5,0,0,0,0-2.23Z"
                            transform="translate(16.003 12.059) rotate(180)"
                            className="fill-primary"
                        ></path>
                    </svg>
                    {t("back")}
                </button>
            </div>
            <div className="pt-4 hidden lg:block">
                <ul>
                    {currentItem || pathname === "/faqs/privacy-policy" ? (
                        items.map((item, index) => (
                            <li key={index} className="mb-[5px]">
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "border border-transparent rounded-lg leading-[45px] block indent-[10px] whitespace-nowrap overflow-x-hidden text-ellipsis w-[calc(100%-20px)]",
                                        pathname === item.href
                                            ? "text-light bg-gradient-primary border border-primary"
                                            : "text-black hover:border hover:border-primary",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="mb-[5px]">
                            <Link
                                href={pathname}
                                className={clsx(
                                    "border border-transparent rounded-lg leading-[45px] block indent-[10px] whitespace-nowrap overflow-x-hidden text-ellipsis w-[calc(100%-20px)]",
                                    "text-light bg-gradient-primary border border-primary",
                                )}
                            >
                                {pathname === "/faqs/privacy-policy"
                                    ? t("privacy_policy")
                                    : t(pathname.split("/").pop())}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <Menu as="div" className="block lg:hidden w-full mt-4 text-base relative">
                <Menu.Button as={Fragment}>
                    <button className="pr-[30px] text-light bg-primary block w-full whitespace-nowrap overflow-hidden text-ellipsis text-left align-middle border border-transparent px-3 py-[.375rem] text-base leading-[1.5] rounded font-normal">
                        {currentItem
                            ? currentItem.label
                            : pathname === "/faqs/privacy-policy"
                              ? t("privacy_policy")
                              : t(pathname.split("/").pop())}
                    </button>
                </Menu.Button>
                <Menu.Items
                    as="div"
                    className="absolute top-0 left-0 will-change-transform translate-y-[40px] p-0 w-full z-[1000] float-left min-w-[10rem] mt-[0.125rem] text-base text-left bg-light bg-clip-padding border border-black/[.15] rounded"
                >
                    {currentItem || pathname === "/faqs/privacy-policy" ? (
                        items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={clsx(
                                    "py-0 leading-[40px] whitespace-nowrap overflow-hidden text-ellipsis block w-full px-6 clear-both font-normal",
                                    pathname === item.href ? "text-light bg-primary" : "text-[#212529] bg-transparent",
                                )}
                            >
                                {item.label}
                            </Link>
                        ))
                    ) : (
                        <Link
                            href={pathname}
                            className={clsx(
                                "py-0 leading-[40px] whitespace-nowrap overflow-hidden text-ellipsis block w-full px-6 clear-both font-normal",
                                "text-light bg-primary",
                            )}
                        >
                            {pathname === "/faqs/privacy-policy" ? t("privacy_policy") : t(pathname.split("/").pop())}
                        </Link>
                    )}
                </Menu.Items>
            </Menu>
        </>
    );
};

export default FaqNavigator;
