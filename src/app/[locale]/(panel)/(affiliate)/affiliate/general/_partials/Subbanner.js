"use client";

import { getCurrentSiteName } from "@/utils/clientInfo";
import { useTranslation } from "react-i18next";
import { register } from "swiper/element/bundle";

register();

const Subbanner = () => {
    const {t } = useTranslation();

    // const isNotDesktop = useIsNotDesktop();

    return (
        <>
            <div className="sub-banner flex lg:hidden items-center h-[140px]">
                <div className="custom-container">
                    <swiper-container direction="horizontal" slides-per-view={1}>
                        <swiper-slide>
                            <div>
                                <div className="h-full items-center flex">
                                    <div className="flex items-center">
                                        <div className="">
                                            <div className="bg-[url('~/public/assets2/images/invite-1.svg')] w-[52px] h-[55px] mr-4 bg-cover bg-no-repeat"></div>
                                        </div>
                                        <div>
                                            <div className="text-content">
                                                <p className="text-light mb-1 mt-0">{t("invite_friends")}</p>
                                                <p className="text-light/50 mb-0 text-[.75rem]">
                                                    {t("invite_friends_to_register_through_the_link", {
                                                        domain: getCurrentSiteName(),
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="border-sub-banner m-auto w-[90px] border-b border-b-light/[.19]"></div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <div className="h-full items-center flex">
                                    <div className="flex items-center">
                                        <div className="">
                                            <div className="bg-[url('~/public/assets2/images/invite-2.svg')] w-[52px] h-[55px] mr-4 bg-cover bg-no-repeat"></div>
                                        </div>
                                        <div>
                                            <div className="text-content">
                                                <p className="text-light mb-1 mt-0">{t("friends_sign_up")}</p>
                                                <p className="text-light/50 mb-0 text-[.75rem]">
                                                    {t("friends_accept_the_invitation_complete_registration_and_play")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="border-sub-banner m-auto w-[90px] border-b border-b-light/[.19]"></div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div>
                                <div className="h-full items-center flex">
                                    <div className="flex items-center">
                                        <div className="">
                                            <div className="bg-[url('~/public/assets2/images/invite-3.svg')] w-[52px] h-[55px] mr-4 bg-cover bg-no-repeat"></div>
                                        </div>
                                        <div>
                                            <div className="text-content">
                                                <p className="text-light mb-1 mt-0">
                                                    {t("get_a_corresponding_proportion_of_commission")}
                                                </p>
                                                <p className="text-light/50 mb-0 text-[.75rem]">{t("easily_get_commission")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper-container>
                </div>
            </div>
            <div className="sub-banner hidden lg:flex items-center h-[120px]">
                <div className="custom-container">
                    <div className="flex items-center">
                        <div className="flex-1 cursor-grab px-[15px]">
                            <div className="h-full items-center flex">
                                <div className="flex items-center">
                                    <div className="">
                                        <div className="bg-[url('~/public/assets2/images/invite-1.svg')] w-[52px] h-[55px] mr-4 bg-cover bg-no-repeat"></div>
                                    </div>
                                    <div>
                                        <div className="text-content">
                                            <p className="text-light mb-1 mt-0">{t("invite_friends")}</p>
                                            <p className="text-light/50 mb-0">
                                                {t("invite_friends_to_register_through_the_link", {
                                                    domain: getCurrentSiteName(),
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-sub-banner m-auto w-[90px] border-b border-b-light/[.19]"></div>
                        <div className="flex-1 cursor-grab px-[15px]">
                            <div className="h-full items-center flex">
                                <div className="flex items-center">
                                    <div className="">
                                        <div className="bg-[url('~/public/assets2/images/invite-2.svg')] w-[52px] h-[55px] mr-4 bg-cover bg-no-repeat"></div>
                                    </div>
                                    <div>
                                        <div className="text-content">
                                            <p className="text-light mb-1 mt-0">{t("friends_sign_up")}</p>
                                            <p className="text-light/50 mb-0">
                                                {t("friends_accept_the_invitation_complete_registration_and_play")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-sub-banner m-auto w-[90px] border-b border-b-light/[.19]"></div>
                        <div className="flex-1 cursor-grab px-[15px]">
                            <div className="h-full items-center flex">
                                <div className="flex items-center">
                                    <div className="">
                                        <div className="bg-[url('~/public/assets2/images/invite-3.svg')] w-[52px] h-[55px] mr-4 bg-cover bg-no-repeat"></div>
                                    </div>
                                    <div>
                                        <div className="text-content">
                                            <p className="text-light mb-1 mt-0">
                                                {t("get_a_corresponding_proportion_of_commission")}
                                            </p>
                                            <p className="text-light/50 mb-0">{t("easily_get_commission")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subbanner;
