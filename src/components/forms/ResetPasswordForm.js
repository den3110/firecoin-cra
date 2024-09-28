import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Form, Formik } from "formik";
import InputField from "@/components/inputs/InputField";
import Button from "@/components/inputs/Button";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import HttpClient from "@/services/HttpClient";

const RegisterForm = ({ onSuccess }) => {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = useMemo(() => {
        return Yup.object({
            password: Yup.string().min(6, t("your_password_must_be")),
            password_confirmation: Yup.string().oneOf([Yup.ref("password"), null], t("your_passwords_does_not_match")),
        });
    }, [t]);

    const searchParams = useSearchParams();

    const handleSubmit = (values) => {
        setLoading(true);
        HttpClient.instanceClient()
            .post("/api/auth/account/reset-password", {
                code: searchParams.get("c"),
                email: searchParams.get("e"),
                password: values.password,
                confirmPassword: values.password_confirmation,
            })
            .then(({ data }) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    return;
                }

                enqueueSnackbar(t("reset_password_success"), { variant: "success" });
                onSuccess(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Loading loading={loading}>
            <Formik
                initialValues={{
                    email: searchParams.get("e"),
                    password: "",
                    nickname: "",
                    referral_promo_code: "",
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
                        newLineError
                        readOnly
                    />
                    <InputField
                        id="password"
                        label={t("new_password")}
                        type="password"
                        name="password"
                        autocompleted="false"
                        required
                        maxLength={20}
                    />
                    <InputField
                        id="password_confirmation"
                        label={t("confirm_password")}
                        type="password"
                        name="password_confirmation"
                        autocompleted="false"
                        required
                    />

                    <Button htmltype="submit" className="w-full rounded-[5px] mt-8">
                        {t("reset_password")}
                    </Button>
                </Form>
            </Formik>
        </Loading>
    );
};

export default RegisterForm;
