"use client";

import LandingDrawer from "@/components/LandingDrawer";
import { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import HttpClient from "@/services/HttpClient";
import { getCurrentSiteName } from "@/utils/clientInfo";

const VerifyAccountPage = () => {
    const t = useTranslations();

    const searchParams = useSearchParams();

    const [email, setEmail] = useState(() => {
        return searchParams.get("e");
    });
    const [token, setToken] = useState(() => {
        return searchParams.get("c");
    });

    const [loading, setLoading] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!email || !token) {
            setIsSuccess(false);
            return;
        }

        setLoading(true);
        HttpClient.instanceClient()
            .post("/api/auth/account/verify-email", {
                email,
                token,
                captcha: "string",
                captcha_geetest: { captcha_output: "", gen_time: "", lot_number: "", pass_token: "" },
            })
            .then(({ data }) => {
                if (!data.ok) {
                    setIsSuccess(false);
                    return;
                }

                setIsSuccess(true);
            })
            .catch(() => {
                setIsSuccess(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [email, token]);

    console.log("VerifyAccountPage", { email, token, loading, isSuccess });

    return (
        <LandingDrawer>
            <div className="w-full">
                <div>
                    <div className="text-center">
                        <div className="flex justify-center">
                            {loading ? (
                                <div className="animate-spin mb-[43px] border-[3px] border-black/20 border-l-success-50 relative inline-block align-top rounded-full w-[86px] h-[86px]"></div>
                            ) : isSuccess ? (
                                // Check mark
                                <div
                                    className={clsx(
                                        "mb-[43px] border-[3px] border-success-50 relative inline-block align-top rounded-full w-[86px] h-[86px]",
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "after:-scale-x-[1] after:-rotate-[135deg] after:animate-[checkmark-animation_0.8s_ease]",
                                            "after:content-[''] after:opacity-1 after:h-[43px] after:w-[21.5px] after:[transform-origin:left_top] after:border-r-[3px] after:border-t-[3px] after:border-[#1ebf75] after:left-[21.5px] after:top-[43px] after:absolute",
                                        )}
                                    ></div>
                                </div>
                            ) : (
                                <div
                                    className={clsx(
                                        "mb-[43px] border-[3px] border-[#de2349] relative inline-block align-top rounded-full w-[86px] h-[86px]",
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "w-[26px] h-[26px] absolute left-1/2 top-1/2 -ml-[13px] -mt-[13px] rotate-45",
                                            "before:content-[''] before:w-[3px] before:h-[26px] before:bg-[#de2349] before:block before:absolute before:top-0 before:left-1/2 before:-ml-[1.5px]",
                                            "after:content-[''] after:w-[26px] after:h-[3px] after:bg-[#de2349] after:block after:absolute after:top-1/2 after:left-0 after:-mt-[1.5px]",
                                        )}
                                    ></div>
                                </div>
                            )}
                        </div>
                        <h2 className="text-light text-[24px] font-bold mb-12">
                            {loading
                                ? t("activating_your_account")
                                : isSuccess
                                  ? t("account_success_active")
                                  : t("activation_error")}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="leading-tight">
                <div className="mb-2">
                    <span>{t("have_account", { domain:  getCurrentSiteName() })}</span>
                    <Link href="/login" className="primary-link ml-2">
                        {t("log_in_to_your_account")}
                    </Link>
                </div>
            </div>
        </LandingDrawer>
    );
};

export default VerifyAccountPage;
