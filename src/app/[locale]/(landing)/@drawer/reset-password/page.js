"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import LandingDrawer from "@/components/LandingDrawer";
import { Link, useRouter } from "@/navigation";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { getCurrentSiteName } from "@/utils/clientInfo";

const ResetPasswordPage = () => {
    const t = useTranslations();

    const [successData, setSuccessData] = useState();
    const router = useRouter();

    const handleSuccess = (data) => {
        setSuccessData(data);

        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    return (
        <LandingDrawer>
            {!successData ? (
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-12 leading-[1.2]">{t("reset_password")}</div>
                    <p className="text-light">{t("enter_a_new_password")}</p>
                    <ResetPasswordForm onSuccess={handleSuccess} />
                </div>
            ) : (
                <div>
                    <div className="text-[2rem] font-bold mb-4 leading-[1.2]">
                        {t("request_a_new_password_success")}
                    </div>
                    <p className="text-light mb-4">
                        {t("your_account_has_been_reset_password")}
                        <br />
                        {t("please_login_to_continue", { link: t("login") })}
                    </p>
                </div>
            )}
            <div className="leading-tight">
                <div className="mb-2 text-center">
                    <span>{t("have_account", { domain:  getCurrentSiteName() })}</span>
                    <Link href="/login" className="primary-link ml-2">
                        {t("log_in_to_your_account")}
                    </Link>
                </div>
            </div>
        </LandingDrawer>
    );
};

export default ResetPasswordPage;
