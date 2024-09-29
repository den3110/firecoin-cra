"use client";

import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PersonalDataForm from "@/app/[locale]/(panel)/user/profile/_partials/PersonalDataForm";
import SecurityForm from "@/app/[locale]/(panel)/user/profile/_partials/SecurityForm";
import useAuth from "@/hooks/useAuth";
import { lazy, Suspense, useState } from "react";
import AccountVerificationForm from "@/app/[locale]/(panel)/user/profile/_partials/AccountVerificationForm";
import useUserAvatarUrl from "@/hooks/useUserAvatarUrl";

const ChangeAvatarModal = lazy(() => import('@/app/[locale]/(panel)/user/profile/_partials/ChangeAvatarModal'));

const ProfilePage = () => {
    const {t } = useTranslation();

    const [auth, _] = useAuth();

    const [changeAvatarModalOpen, setChangeAvatarModalOpen] = useState(false);

    const avatarUrl = useUserAvatarUrl();

    return (
        <div className="py-12">
            <div className="custom-container">
                <div className="grid grid-cols-12 justify-center">
                    <div className="col-span-12">
                        <div className="profile-personal bg-secondarySidebar border-custom-border rounded-[20px] border mb-4 overflow-hidden">
                            <div className="panel-header py-4 border-light/10 px-7 border-b border-b-secondary-400">
                                <h3 className="my-0 text-[1.125rem] text-light font-medium leading-[1.2]">
                                    {t("personal_data")}
                                </h3>
                            </div>
                            <div className="panel-body px-7 py-3">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                        <div className="upload-avatar flex mb-4">
                                            <div className="flex items-center justify-between lg:justify-start">
                                                <div>
                                                    <div
                                                        className="user-avatar"
                                                        style={{
                                                            backgroundImage: `url('${avatarUrl}')`,
                                                        }}
                                                    >
                                                        <div
                                                            className={clsx(
                                                                "overlay bg-[#0e0031]/30 z-[2] absolute w-full h-full top-0 left-0 rounded-full",
                                                                "after:absolute after:content-['\\F030'] after:font-bold after:text-light after:text-center after:z-[2] after:text-[1.5em] after:bg-[url('~/public/assets2/images/camera.svg')]",
                                                                "after:bg-no-repeat after:bg-[50%] after:w-6 after:h-5 after:top-1/2 after:left-1/2 after:-mt-3 after:-ml-2.5",
                                                            )}
                                                            onClick={() => setChangeAvatarModalOpen(true)}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="px-8 border-none bg-gradient-primary cursor-pointer text-light text-base py-4 ml-6 flex font-normal text-center align-middle leading-[1.5] rounded transition-colors duration-150"
                                                    onClick={() => setChangeAvatarModalOpen(true)}
                                                >
                                                    {t("upload_your_profile_picture")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <PersonalDataForm />
                            </div>
                        </div>
                        <div className="profile-personal bg-secondarySidebar border-custom-border rounded-[20px] border mb-4 overflow-hidden">
                            <div className="panel-header py-4 border-light/10 px-7 border-b border-b-secondary-400">
                                <h3 className="my-0 text-[1.125rem] text-light font-medium leading-[1.2]">
                                    {t("account_verification")}
                                </h3>
                            </div>
                            <div className="panel-body px-7 pt-3">
                                <AccountVerificationForm />
                            </div>
                        </div>
                        <div className="profile-personal bg-secondarySidebar border-custom-border rounded-[20px] border mb-4 overflow-hidden">
                            <div className="panel-header py-4 border-light/10 px-7 border-b border-b-secondary-400">
                                <h3 className="my-0 text-[1.125rem] text-light font-medium leading-[1.2]">
                                    {t("security")}
                                </h3>
                            </div>
                            <div className="panel-body px-7 py-3">
                                <SecurityForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<div><div></div></div>}>
                <ChangeAvatarModal open={changeAvatarModalOpen} onClose={() => setChangeAvatarModalOpen(false)} />
            </Suspense>
        </div>
    );
};

export default ProfilePage;
