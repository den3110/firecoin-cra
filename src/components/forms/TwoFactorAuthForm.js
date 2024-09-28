import { Form, Formik } from "formik";
import InputField from "@/components/inputs/InputField";
import Button from "@/components/inputs/Button";
import Loading from "@/components/Loading";
import { useMemo, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useTwoFactorLogin from "@/hooks/mutations/useTwoFactorLogin";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useRouter } from "@/navigation";
import { useSnackbar } from "notistack";
import { getCurrentSiteName } from "@/utils/clientInfo";

const TwoFactorAuthForm = () => {
    const {t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const { mutateAsync } = useTwoFactorLogin();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (values) => {
        setLoading(true);
        mutateAsync({
            client_id: getCurrentSiteName(),
            token: auth.twoFaToken,
            code: values.code,
            td_code: "",
            td_p_code: "",
        })
            .then((data) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    return;
                }

                localStorage.setItem("USER_TOKEN", JSON.stringify(data.d));
                setAuth((prev) => ({
                    ...prev,
                    initialized: true,
                    userToken: data.d,
                    twoFaToken: null,
                }));

                router.push("/index");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const validationSchema = useMemo(() => {
        return Yup.object({
            code: Yup.string().required(t("fa_code_required")),
        });
    }, [t]);

    return (
        <Loading loading={loading}>
            <Formik
                initialValues={{
                    code: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <InputField
                        id="code"
                        label={t("google_authentication_code")}
                        type="text"
                        name="code"
                        autocompleted="false"
                        paste
                        required
                    />
                    <Button htmltype="submit" className="mt-2 w-full rounded-[5px]">
                        {t("submit")}
                    </Button>
                </Form>
            </Formik>
        </Loading>
    );
};

export default TwoFactorAuthForm;
