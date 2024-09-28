import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import InputField from "@/components/inputs/InputField";
import Button from "@/components/inputs/Button";
import useRegisterMutation from "@/hooks/mutations/useRegisterMutation";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

const RegisterForm = ({ onSuccess }) => {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const { mutateAsync } = useRegisterMutation();
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = useMemo(() => {
        return Yup.object({
            email: Yup.string().email(t("invalid_email_address")).required(t("invalid_email_address")),
            password: Yup.string().min(6, t("your_password_must_be")),
            nickname: Yup.string()
                .min(6, t("nickname_between_6_20_character"))
                .max(20, t("nickname_between_6_20_character"))
                .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, t("nickname_between_6_20_character"))
                .required(t("nickname_between_6_20_character")),
        });
    }, [t]);

    const rValue = useMemo(() => {
        if (typeof window !== 'undefined') {
            const queryParams = new URLSearchParams(window.location.search);
            return queryParams.get('r') || '';  // Return an empty string if 'r' is not present
        }
        return '';
    }, []);

    const initialValues = useMemo(() => ({
        email: "",
        password: "",
        nickname: "",
        referral_promo_code: rValue,  // Set rValue as the default value for referral_promo_code
    }), [rValue]);

   
    const handleSubmit = (values) => {
        setLoading(true);

        mutateAsync({
            email: values.email,
            password: values.password,
            confirmPassword: values.password,
            nickName: values.nickname,
            referrerCode: values.referral_promo_code,
            captcha: "string",
            captcha_geetest: { captcha_output: "", gen_time: "", lot_number: "", pass_token: "" },
        })
            .then((data) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    return;
                }

                onSuccess({
                    email: values.email,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Loading loading={loading}>
            <Formik
                initialValues={initialValues}
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
                    />
                    <InputField
                        id="password"
                        label={t("password")}
                        type="password"
                        name="password"
                        placeholder={t("enter_password")}
                        autocompleted="false"
                        required
                        maxLength={20}
                        newLineError
                    />
                    <InputField
                        id="nickname"
                        label={t("nickname")}
                        type="text"
                        name="nickname"
                        placeholder={t("enter_nickname")}
                        autocompleted="false"
                        required
                        maxLength={20}
                        newLineError
                    />
                    <InputField
                        id="referral_promo_code"
                        label={t("referral_promo_code")}
                        type="text"
                        name="referral_promo_code"
                        placeholder={t("enter_invite_code")}
                        autocompleted="false"
                        newLineError
                    />
                    <Button htmltype="submit" className="w-full rounded-[5px] mt-8">
                        {t("register")}
                    </Button>
                </Form>
            </Formik>
        </Loading>
    );
};

export default RegisterForm;
