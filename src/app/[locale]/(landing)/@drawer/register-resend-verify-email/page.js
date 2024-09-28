"use client";

import LandingDrawer from "@/components/LandingDrawer";
import { Link } from "@/navigation";
import { useTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import InputField from "@/components/inputs/InputField";
import Button from "@/components/inputs/Button";
import Loading from "@/components/Loading";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import { getCurrentSiteName } from "@/utils/clientInfo";

const RegisterResendVerifyEmailPage = () => {
    const {t } = useTranslation();

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
            .post("/api/auth/account/resend-confirmation-email", {
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
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-12 leading-[1.2]">
                        {t("resend_confirmation_email")}
                    </div>
                    <p className="text-light/50 mb-4">{t("please_enter_your_email_to")}</p>
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
                                />
                                <Button htmltype="submit" className="w-full rounded-[5px]">
                                    {t("resend")}
                                </Button>
                            </Form>
                        </Formik>
                    </Loading>
                </div>
            ) : (
                <div>
                    <div className="text-2xl font-bold my-4 lg:mb-12 leading-[1.2]">{t("confirmation_email_sent")}</div>
                    <p className="mb-4 text-light/50">{t("a_verification_link_has_been")}</p>
                </div>
            )}
            <div className="leading-tight">
                <div className="mb-2 text-center">
                    <span>{t("have_account", { domain: getCurrentSiteName()})}</span>
                    <Link href="/login" className="primary-link ml-2">
                        {t("log_in_to_your_account")}
                    </Link>
                </div>
            </div>
        </LandingDrawer>
    );
};

export default RegisterResendVerifyEmailPage;
