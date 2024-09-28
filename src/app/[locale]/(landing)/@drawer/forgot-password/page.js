"use client";

import LandingDrawer from "@/components/LandingDrawer";
import { useTranslations } from "next-intl";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import HttpClient from "@/services/HttpClient";
import Loading from "@/components/Loading";
import { Form, Formik } from "formik";
import InputField from "@/components/inputs/InputField";
import Button from "@/components/inputs/Button";
import { Link } from "@/navigation";
import { getCurrentSiteName } from "@/utils/clientInfo";

const ForgotPasswordPage = () => {
    const t = useTranslations();

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validationSchema = useMemo(() => {
        return Yup.object({
            email: Yup.string().email(t("your_email_is_invalid")).required(t("your_email_is_invalid")),
        });
    }, [t]);

    const handleSubmit = (values) => {
        setLoading(true);
        HttpClient.instanceClient()
            .post("/api/auth/account/forgot-password", {
                email: values.email,
                captcha: "string",
                captcha_geetest: { captcha_output: "", gen_time: "", lot_number: "", pass_token: "" },
            })
            .then(({ data }) => {
                if (!data.ok) {
                    enqueueSnackbar(t("reset_password_fail"), { variant: "error" });
                    return;
                }

                setSuccess(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <LandingDrawer>
            {!success ? (
                <div className="w-full max-w-[350px] self-center">
                    <div className="text-2xl font-bold my-4 leading-[1.2]">{t("forgot_password")}</div>
                    <Loading loading={loading}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <InputField
                                    id="email"
                                    label={t("email")}
                                    type="text"
                                    name="email"
                                    placeholder={t("enter_email")}
                                    autocompleted="false"
                                    className="mb-6"
                                    required
                                />
                                <Button htmltype="submit" className="w-full rounded-[5px]">
                                    {t("resend_email")}
                                </Button>
                            </Form>
                        </Formik>
                    </Loading>
                    <div className="leading-tight">
                        <div className="mb-2 text-center whitespace-nowrap mt-4">
                            <span>{t("have_account", { domain: getCurrentSiteName() })}</span>
                            <Link href="/login" className="primary-link ml-2">
                                {t("log_in_to_your_account")}
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="text-[2rem] font-bold my-4 lg:mb-12 leading-[1.2]">
                        {t("request_a_new_password_success")}
                    </div>
                    <p
                        className="mb-4 text-light"
                        dangerouslySetInnerHTML={{ __html: t.raw("a_verification_link") }}
                    ></p>
                    <div className="leading-tight">
                        <div className="mb-2 whitespace-nowrap mt-4">
                            <span>{t("have_account", { domain: getCurrentSiteName() })}</span>
                            <Link href="/login" className="primary-link ml-2">
                                {t("log_in_to_your_account")}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <div></div>
        </LandingDrawer>
    );
};

export default ForgotPasswordPage;
