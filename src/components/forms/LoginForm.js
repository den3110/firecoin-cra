"use client";

import { Form, Formik } from "formik";
import InputField from "@/components/inputs/InputField";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import Button from "@/components/inputs/Button";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import Loading from "@/components/Loading";
import useLoginMutation from "@/hooks/mutations/useLoginMutation";
import useAuth from "@/hooks/useAuth";
import { useSnackbar } from "notistack";
import { getCurrentSiteName } from "@/utils/clientInfo";

const LoginForm = () => {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const { mutateAsync } = useLoginMutation();
    const [auth, setAuth] = useAuth();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = useMemo(() => {
        return Yup.object({
            email: Yup.string().email(t("your_email_is_invalid")).required(t("your_email_is_invalid")),
            password: Yup.string().required(t("password_required")),
        });
    }, [t]);

    const handleSubmit = (values) => {
        setLoading(true);

        mutateAsync({
            client_id: getCurrentSiteName(),
            grant_type: "password",
            email: values.email,
            password: values.password,
            captcha: "string",
            captcha_geetest: { captcha_output: "", gen_time: "", lot_number: "", pass_token: "" },
        })
            .then((data) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    // toast.error(t(data.d.err_code));
                    return;
                }

                if (data.d.require2Fa) {
                    setAuth({ ...auth, twoFaToken: data.d.t });
                    return;
                }

                localStorage.setItem("USER_TOKEN", JSON.stringify(data.d));
                setAuth({
                    initialized: true,
                    userToken: data.d,
                });

                router.push("/index");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
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
                        required
                    />
                    <InputField
                        id="password"
                        label={t("password")}
                        type="password"
                        name="password"
                        placeholder={t("enter_password")}
                        autocompleted="false"
                        required
                    />
                    <div className="flex mb-6">
                        <Link href="/forgot-password" className="block text-right text-light-50 ml-auto">
                            {t("forgot_password")}?
                        </Link>
                    </div>
                    <Button htmltype="submit" className="w-full rounded-[5px]">
                        {t("login")}
                    </Button>
                </Form>
            </Formik>
        </Loading>
    );
};

export default LoginForm;
