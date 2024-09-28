"use client";

import { Form, FormikProvider, useFormik } from "formik";
import InputField from "@/components/inputs/InputField";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as Yup from "yup";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";

const PersonalDataForm = () => {
    const t = useTranslations();

    const [auth, _] = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = useMemo(() => {
        return Yup.object({
            first_name: Yup.string().required(),
            last_name: Yup.string().required(),
            twofa_code: auth?.user?.["2fa_login_req"] ? Yup.number().required() : Yup.number().notRequired(),
        });
    }, [auth?.user]);

    const formik = useFormik({
        initialValues: {
            email: auth?.user?.e,
            nickname: auth?.user?.nn,
            first_name: auth?.user?.fn,
            last_name: auth?.user?.ln,
            twofa_code: "",
        },
        validationSchema,
        onSubmit: (values, { setFieldValue }) => {
            return new Promise((resolve, reject) => {
                HttpClient.instanceClient()
                    .post("/api/auth/me/profile", {
                        ...auth?.user,
                        firstName: values.first_name,
                        fn: values.first_name,
                        lastName: values.last_name,
                        ln: values.last_name,
                        verifyCode: values.twofa_code,
                    })
                    .then((res) => res.data)
                    .then((data) => {
                        if (!data.ok) {
                            enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                            return;
                        }

                        enqueueSnackbar(t("your_profile_has_been_changed"), { variant: "success" });
                        setFieldValue("twofa_code", "");
                    })
                    .finally(() => {
                        resolve();
                    });
            });
        },
        onReset: () => {},
    });

    return (
        <div className="flex">
            <div className="mb-2 w-full">
                <FormikProvider value={formik}>
                    <Form>
                        <div className="grid grid-cols-12 lg:gap-x-[30px]">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                                <InputField size="profile" name="email" label={t("email")} disabled />
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                                <InputField size="profile" name="nickname" label={t("nickname")} disabled />
                            </div>
                        </div>
                        <div className="grid grid-cols-12 lg:gap-x-[30px]">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                                <InputField
                                    size="profile"
                                    name="first_name"
                                    label={t("first_name")}
                                    hideErrors={true}
                                    disabled={!auth?.user?.["2fa"]}
                                />
                                {!auth?.user?.["2fa"] && (
                                    <small className="text-danger text-[80%] font-normal italic mt-2 block">
                                        * {t("must_enable_2FA_modify_this_field")}
                                    </small>
                                )}
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 mb-4">
                                <InputField
                                    size="profile"
                                    name="last_name"
                                    label={t("last_name")}
                                    hideErrors={true}
                                    disabled={!auth?.user?.["2fa"]}
                                />
                                {!auth?.user?.["2fa"] && (
                                    <small className="text-danger text-[80%] font-normal italic mt-2 block">
                                        * {t("must_enable_2FA_modify_this_field")}
                                    </small>
                                )}
                            </div>
                        </div>
                        {auth?.user?.["2fa_login_req"] && (
                            <div className="grid grid-cols-12 lg:gap-x-[30px]">
                                <div className="col-span-12 md:col-span-6 mb-4">
                                    <InputField
                                        type="number"
                                        size="profile"
                                        name="twofa_code"
                                        label={t("twoFA_code")}
                                        hideErrors={true}
                                        disabled={!auth?.user?.["2fa"]}
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 lg:col-span-5">
                                    <button
                                        type="submit"
                                        className="text-light disabled:opacity-[.65] disabled:cursor-no-drop bg-gradient-primary border-none text-base px-12 py-4 inline-block font-normal text-center align-center leading-[1.5] rounded transition-colors duration-150"
                                        disabled={!auth?.user?.["2fa"] || formik.isSubmitting || !formik.isValid}
                                    >
                                        {t("update_account")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default PersonalDataForm;
