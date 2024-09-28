import { Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { Form, FormikProvider, useFormik } from "formik";
import InputFieldInChangePassword from "@/components/inputs/InputFieldInChangePassword";
import * as Yup from "yup";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const ChangePasswordModal = ({ open = true, onClose }) => {
    const t = useTranslations();

    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            current_password: "",
            new_password: "",
            confirm_new_password: "",
            twofa_code: "",
        },
        validationSchema: Yup.object({
            current_password: Yup.string().required(t("The_current_password_field_is_required")),
            new_password: Yup.string()
                .required(t("New_password_field_is_required"))
                .min(6, t("your_password_must_be"))
                // not current_password
                .notOneOf([Yup.ref("current_password"), null], t("can_not_use_current_password")),
            confirm_new_password: Yup.string()
                .required(t("New_password_confirmation_field_is_required"))
                .oneOf([Yup.ref("new_password"), null], t("your_passwords_does_not_match")),
            twofa_code: Yup.string().required(""),
        }),
        onSubmit: (values) => {
            HttpClient.instanceClient()
                .post("/api/auth/account/change-password", {
                    currentPassword: values.current_password,
                    newPassword: values.new_password,
                    confirmNewPassword: values.confirm_new_password,
                    verifyCode: values.twofa_code,
                })
                .then((res) => res.data)
                .then((data) => {
                    if (!data.ok) {
                        return enqueueSnackbar(t(data.d.err_code), {
                            variant: "error",
                        });
                    }

                    enqueueSnackbar(t("your_password_has_been_changed"), { variant: "success" });
                    handleCloseModal();
                });
        },
    });

    const handleCloseModal = () => {
        onClose?.();

        formik.resetForm();
    };

    const handleCloseModalBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    useEffect(() => {
        // add .no-scrollclass to body
        if (open) {
            document.body.classList.add("no-scroll");

            return () => {
                document.body.classList.remove("no-scroll");
            };
        }
    }, [open]);

    return (
        <Transition show={open}>
            <Transition.Child
                enter="transition-opacity"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="modal z-[9999] lg:z-[99] fixed top-0 left-0 w-full h-full outline-0 bg-custom-border lg:bg-black/50"></div>
            </Transition.Child>
            <Transition.Child
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="pr-[15px] block fixed top-0 left-0 z-[9999] w-full h-full overflow-hidden outline-0"
                    onClick={handleCloseModalBackdrop}
                >
                    <div className="m-0 lg:mt-7 lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 text-light w-full lg:min-w-[500px] min-[576px]:max-w-[500px] absolute pointer-events-auto">
                        <div className="min-[600px]:pb-4 lg:rounded-[10px] bg-secondarySidebar relative flex flex-col h-dvh lg:h-auto w-full pointer-events-auto outline-0 border border-secondary-600 px-4 py-5 lg:p-0">
                            <button
                                type="button"
                                className="text-light w-[50px] h-[50px] lg:w-[30px] lg:h-[30px] leading-[30px] rounded-full absolute opacity-100 z-[2] left-auto right-0 top-0 lg:-right-[35px] outline-none lg:bg-light/30 flex items-center justify-center cursor-pointer float-right text-[1.5rem] font-bold [text-shadow:0_1px_0_#fff]"
                                onClick={handleCloseModal}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-[20px]">
                                    <g
                                        strokeLinecap="square"
                                        strokeLinejoin="miter"
                                        strokeWidth="2"
                                        className="nc-icon-wrapper stroke-light/[.50] fill-light/[.50]"
                                    >
                                        <g className="nc-interact_menu-close-2-o-32">
                                            <path
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeMiterlimit="10"
                                                d="M2 6h28"
                                                transform="translate(0 10.00) rotate(45.00 16 6)"
                                            ></path>
                                            <path
                                                data-color="color-2"
                                                fill="none"
                                                strokeMiterlimit="10"
                                                d="M2 16h28"
                                                opacity="0"
                                            ></path>
                                            <path
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeMiterlimit="10"
                                                d="M2 26h28"
                                                transform="translate(0 -10) rotate(-45 16 26)"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <div className="border-none text-center flex items-start justify-between p-4 rounded-t-[3.8px]">
                                <h4 className="w-full leading-[1.5] text-[1.5rem] ">{t("change_password")}</h4>
                            </div>
                            <div className="modal-body pt-0 pl-0 pr-0 lg:pb-6">
                                <FormikProvider value={formik}>
                                    <Form autoComplete="off">
                                        <div className="grid grid-cols-12 px-6">
                                            <div className="col-span-12 relative">
                                                <InputFieldInChangePassword
                                                    type="password"
                                                    id="current_password"
                                                    name="current_password"
                                                    label={t("current_password")}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-span-12 relative">
                                                <InputFieldInChangePassword
                                                    type="password"
                                                    id="new_password"
                                                    name="new_password"
                                                    label={t("new_password")}
                                                    autoComplete="off"
                                                    maxLength={20}
                                                    max={20}
                                                />
                                            </div>
                                            <div className="col-span-12 relative">
                                                <InputFieldInChangePassword
                                                    type="password"
                                                    id="confirm_new_password"
                                                    name="confirm_new_password"
                                                    label={t("confirm_new_password")}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-span-12 relative mb-4">
                                                <InputFieldInChangePassword
                                                    type="number"
                                                    id="twofa_code"
                                                    name="twofa_code"
                                                    label={t("google_authenticator")}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="col-span-12 relative">
                                                <div className="mt-4">
                                                    <button
                                                        className="text-light bg-gradient-primary border-none text-base h-[47px] px-[15px] py-[17px] leading-[19px] w-full outline-0 cursor-pointer relative transition-all duration-300 rounded-[5px] inline-flex items-center justify-center"
                                                        type="submit"
                                                    >
                                                        {t("change_password")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </FormikProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default ChangePasswordModal;
