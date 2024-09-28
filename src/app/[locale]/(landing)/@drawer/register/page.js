"use client";

import LandingDrawer from "@/components/LandingDrawer";
import RegisterForm from "@/components/forms/RegisterForm";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import { getCurrentSiteName } from "@/utils/clientInfo";

const RegisterPage = () => {
    const t = useTranslations();

    const [successData, setSuccessData] = useState();

    const [resendCounter, setResendCounter] = useState(0);

    const { enqueueSnackbar } = useSnackbar();

    const handleSuccess = (data) => {
        setSuccessData(data);
        setResendCounter(30);
    };

    useEffect(() => {
        if (resendCounter > 0) {
            const timer = setTimeout(() => {
                setResendCounter(resendCounter - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [resendCounter]);

    const handleResendEmail = () => {
        if (!successData) return;

        HttpClient.instanceClient()
            .post("/api/auth/account/resend-confirmation-email", {
                email: successData.email,
                captcha: "string",
                captcha_geetest: { captcha_output: "", gen_time: "", lot_number: "", pass_token: "" },
            })
            .then(({ data }) => {
                if (!data.ok) {
                    enqueueSnackbar(t("resend_verification_email_fail"), { variant: "error" });
                    return;
                }

                enqueueSnackbar(t("resend_verification_email_success"), { variant: "success" });
                setResendCounter(30);
            });
    };

    return (
        <LandingDrawer>
            {!successData ? (
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-12 leading-[1.2]">
                        {t("create_account", { domain: getCurrentSiteName() })}
                    </div>
                    <RegisterForm onSuccess={handleSuccess} />
                </div>
            ) : (
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-12 leading-[1.2]">{t("registration_successful")}</div>
                    <p className="text-light mb-4">
                        {t("a_verification_link_has")}{" "}
                        <a href={`mailto:${successData.email}`} className="text-primary">
                            {successData.email}
                        </a>
                        .
                    </p>
                    <p className="text-light mb-4">{t("please_wait_a_few_minutes")}</p>
                    <p className="mb-4">
                        <button
                            className="w-full bg-primary disabled:bg-secondary-400 py-[14px] px-10 font-bold text-center align-middle select-none border border-transparent text-base leading-[1.5] rounded"
                            disabled={resendCounter > 0}
                            onClick={handleResendEmail}
                        >
                            {resendCounter > 0 ? `00:${resendCounter}` : t("request_a_new_one")}
                        </button>
                    </p>
                </div>
            )}
            <div className="leading-tight">
                <div className="mb-2">
                    <span>{t("have_account", { domain: getCurrentSiteName() })}</span>
                    <Link href="/login" className="primary-link ml-2">
                        {t("log_in_to_your_account")}
                    </Link>
                </div>
            </div>
        </LandingDrawer>
    );
};

export default RegisterPage;
