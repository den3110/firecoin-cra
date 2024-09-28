"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import ToggleProfileButton from "@/components/inputs/ToggleProfileButton";
import TwoFaSetupModal from "@/app/[locale]/(panel)/user/profile/_partials/TwoFaSetupModal";
import useAuth from "@/hooks/useAuth";
import useUpdateUserInfo from "@/hooks/useUpdateUserInfo";
import HttpClient from "@/services/HttpClient";
import ChangePasswordModal from "@/app/[locale]/(panel)/user/profile/_partials/ChangePasswordModal";
import { useNavigate } from "react-router-dom";

const SecurityForm = () => {
    const navigate= useNavigate()
    const {t } = useTranslation();

    const [auth, setAuth] = useAuth();

    const updateUser = useUpdateUserInfo();

    const { enqueueSnackbar } = useSnackbar();

    const [twoFaCodeEnabled, setTwoFaCodeEnabled] = useState(() => {
        return !!auth?.user?.["2fa"];
    });
    const [hideSensitiveData, setHideSensitiveData] = useState(false);
    const [setupModalOpen, setSetupModalOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);

    const isEnableModal = useMemo(() => {
        return !auth?.user?.["2fa"];
    }, [auth?.user?.["2fa"]]);

    const handleSetTwoFaCodeEnabled = (value) => {
        setTwoFaCodeEnabled(value);

        setSetupModalOpen(true);
    };

    const handleCloseSetupModal = () => {
        setSetupModalOpen(false);

        updateUser().then((userData) => {
            setTwoFaCodeEnabled(!!userData?.["2fa"]);
        });
    };

    const handleHideSensitiveData = (value) => {
        HttpClient.instanceClient()
            .put(
                "/api/auth/me/hiding-info",
                {},
                {
                    params: {
                        isEnable: value,
                    },
                },
            )
            .then((res) => res.data)
            .then((data) => {
                if (!data.ok) {
                    return;
                }

                setHideSensitiveData(value);

                const token = localStorage.getItem("USER_TOKEN");

                HttpClient.instanceClient()
                    .get("/api/auth/me/profile")
                    .then((res) => {
                        setAuth({
                            initialized: true,
                            userToken: JSON.parse(token),
                            user: res.data.d,
                        });
                    })
                    .catch((err) => {
                        localStorage.removeItem("USER_TOKEN");

                        navigate("/");
                    });
            });

        // updateUser().then((userData) => {
        //     setHideSensitiveData(userData?.hideSensitiveData);
        // });
    };

    useEffect(() => {
        setHideSensitiveData(auth?.user?.enable_hiding_info);
    }, [auth?.user?.enable_hiding_info]);

    const handleCloseChangePasswordModal = () => {
        setChangePasswordOpen(false);
    };

    return (
        <div className="mb-2 w-full">
            <div className="grid grid-cols-12 mb-12 lg:gap-x-[30px]">
                <div className="col-span-8 md:col-span-3">
                    <div className="flex items-center text-light text-sm h-full">{t("password")}:</div>
                </div>
                <div className="col-span-12 md:col-span-9">
                    <div className="flex flex-col lg:flex-row lg:items-center h-full">
                        <p className="flex-1 text-text text-sm mb-0 flex-col flex">
                            <span>{t("would_you_like_to_change_your_password")}</span>
                        </p>
                        <div className="mt-4 lg:mt-0">
                            <button
                                className="px-3 py-1.5 bg-gradient-primary text-light inline-block font-normal align-middle text-center select-none text-base leading-[1.5] rounded transition-[color] duration-150 disabled:opacity-[.65]"
                                onClick={() => setChangePasswordOpen(true)}
                                disabled={isEnableModal}
                            >
                                {t("change_password")}
                            </button>
                        </div>
                    </div>
                </div>
                {isEnableModal && (
                    <div className="col-span-12 xl:text-right text-base">
                        <small className="inline-block text-danger italic mt-2 text-[80%] font-normal">
                            * {t("must_enable_2FA_change_pass")}
                        </small>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-12 mb-12 lg:gap-x-[30px] relative">
                <div className="col-span-8 md:col-span-3">
                    <div className="flex items-center text-light text-sm h-full">{t("twoFA_code")}:</div>
                </div>
                <div className="col-span-12 md:col-span-7">
                    <div className="flex items-center h-full">
                        <p className="text-text text-sm mb-0 flex-col flex">
                            <span>{t("required_for_fund_withdrawals")}</span>
                        </p>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-right">
                    <div className="absolute lg:static -top-1 right-0">
                        <ToggleProfileButton checked={twoFaCodeEnabled} onChange={handleSetTwoFaCodeEnabled} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 mb-12 lg:gap-x-[30px] relative">
                <div className="col-span-8 md:col-span-3">
                    <div className="flex items-center text-light text-sm h-full">
                        {t("hide_sensitive_data_switch")}:
                    </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                    <div className="flex items-center h-full">
                        <p className="text-text text-sm mb-0 flex-col flex">
                            <span>{t("hide_the_information")}</span>
                        </p>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-right">
                    <div className="absolute lg:static -top-1 right-0">
                        <ToggleProfileButton checked={hideSensitiveData} onChange={handleHideSensitiveData} />
                    </div>
                </div>
            </div>
            <ChangePasswordModal open={changePasswordOpen} onClose={handleCloseChangePasswordModal} />
            <TwoFaSetupModal open={setupModalOpen} onClose={handleCloseSetupModal} isEnable={isEnableModal} />
        </div>
    );
};

export default SecurityForm;
