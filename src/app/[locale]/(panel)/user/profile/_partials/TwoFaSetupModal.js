import { useEffect, useMemo, useState } from "react";
import HttpClient from "@/services/HttpClient";
import { Transition } from "@headlessui/react";
import { useTranslations } from "next-intl";
import QRCode from "react-qr-code";
import { enqueueSnackbar } from "notistack";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import { getCurrentSiteName } from "@/utils/clientInfo";

const TwoFaSetupModal = ({ open = true, isEnable, onClose }) => {
    const requireEmailVerification = process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFY_FOR_2FA;

    const t = useTranslations();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [twoFaCode, setTwoFaCode] = useState("");
    const [requestData, setRequestData] = useState("");

    const [counter, setCounter] = useState(0);

    const reset = () => {
        setPassword("");
        setVerificationCode("");
        setTwoFaCode("");
        setRequestData("");
        setCounter(0);
    };

    useEffect(() => {
        if (!open) {
            return;
        }

        setLoading(true);
        HttpClient.instanceClient()
            .get("/api/auth/2fa/g-authenticator")
            .then((res) => res.data)
            .then((data) => {
                if (!data.ok) {
                    return;
                }

                setData(data.d);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [open]);

    const handleCloseModal = () => {
        onClose?.();
        reset();
    };

    const handleCloseModalBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const handleCopy = () => {
        if(copy(data?.key))
            enqueueSnackbar(t("copied_to_clipboard"), { variant: "success" });
    };

    // const canSubmit = useMemo(() => {
    //     return !!password && (!requireEmailVerification || !!verificationCode) && !!twoFaCode;
    // }, [password, requireEmailVerification, twoFaCode, verificationCode]);
    

    const handleEnable = () => {
        let promise;

        if (isEnable) {
            promise = HttpClient.instanceClient().post("/api/auth/2fa/g-authenticator", {
                OtpCode: verificationCode,
                RequestCode: requestData,
                code: twoFaCode,
                password: password,
            });
        } else {
            promise = HttpClient.instanceClient().delete("/api/auth/2fa/g-authenticator", {
                data: {
                    OtpCode: verificationCode,
                    RequestCode: requestData,
                    code: twoFaCode,
                    password: password,
                },
            });
        }

        promise
            .then((res) => res.data)
            .then((data) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    // reset();
                    // onClose?.();
                    return;
                }

                if (!isEnable) {
                    enqueueSnackbar(t("disable_google_twoFA_success"), { variant: "success" });
                } else {
                    enqueueSnackbar(t("enable_google_twoFA_success"), { variant: "success" });
                }
                onClose?.();
                reset();
            });
    };

    const handlePasteVerificationCode = () => {
        if (navigator.clipboard) {
            navigator.clipboard.readText()
              .then(text => {
                setVerificationCode(text);
              })
              .catch(err => {
                // Xử lý lỗi (có thể không được cấp quyền)
              });
          }
      
    };

    const handleSendEmailCode = () => {
        HttpClient.instanceClient()
            .post("/api/auth/2fa/g-authenticator/" + (isEnable ? "activate" : "deactivate"), {
                captcha: "string",
                captcha_geetest: {
                    captcha_output: "",
                    gen_time: "",
                    lot_number: "",
                    pass_token: "",
                },
                client_id: getCurrentSiteName(),
            })
            .then((res) => res.data)
            .then((data) => {
                if (!data.ok) {
                    return;
                }

                setRequestData(data.d.data);
                setCounter(60);
            });
    };

    useEffect(() => {
        if (counter === 0) {
            return;
        }

        const timer = setTimeout(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [counter]);

    // useEffect(() => {
    //     if (open) {
    //         document.body.classList.add("no-scroll");

    //         return () => {
    //             document.body.classList.remove("no-scroll");
    //         };
    //     }
    // }, [open]);

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
                 <div className="m-0 lg:mt-7 lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 text-light w-full min-[576px]:max-w-[600px] fixed inset-0 z-[9999] pointer-events-auto">
                 <div className="lg:rounded-[10px] bg-secondarySidebar relative flex flex-col h-[100vh] lg:h-auto w-full pointer-events-auto outline-0 border border-secondary-600 p-9 lg:p-0 max-h-[100vh] overflow-y-auto">
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
                            <div className="mb-2 min-[576px]:px-[50px] min-[576px]:py-10 relative flex-1 overflow-y-auto">
                                <div className="mb-2">
                                    <h3 className="whitespace-nowrap text-light font-bold text-center mb-0 leading-[1.5] text-[1.75rem]">
                                        {t("google_authenticator")}
                                    </h3>
                                </div>
                                <div className="mb-6">
                                    <div className="text-center">
                                        <p className="my-0">
                                            <small className="text-[80%] font-normal">
                                                <span
                                                    className={clsx(
                                                        "text-sm leading-[18px]",
                                                        isEnable ? "text-danger" : "text-light/50",
                                                    )}
                                                >
                                                    {isEnable
                                                        ? t("type_the_provided_key_into_the_app")
                                                        : t("google_authenticator_is_enabled")}
                                                </span>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                                <div className="box-content lg:-mx-[15px]">
                                    <div className="grid grid-cols-12 h-full">
                                        <div className="col-span-12 flex flex-col px-0">
                                            {isEnable && (
                                                <>
                                                    <div className="text-center mb-5">
                                                        {data?.uri && (
                                                            <QRCode
                                                                value={data?.uri}
                                                                size={150}
                                                                className="inline-block bg-light px-1.5 w-[150px] h-[150px]"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-12 leading-[34px] gap-x-[15px]">
                                                        <div className="col-span-12 md:col-span-3 font-bold text-text">
                                                            {t("backup_key")}:
                                                        </div>
                                                        <div className="col-span-12 md:col-span-9 lg:pr-4">
                                                            <div className="group-label">
                                                                <div className="input-group relative flex flex-wrap items-stretch w-full">
                                                                    <input
                                                                        type="text"
                                                                        readOnly
                                                                        className="pr-[38px] text-text border-none bg-text/[.23] rounded w-full px-2.5 h-10 leading-[40px] relative flex-1 min-w-0 mb-0 block text-base font-base focus:ring-0"
                                                                        value={data?.key}
                                                                    />
                                                                    <div className="absolute right-[15px] top-5 z-[99] -ml-[1px] flex">
                                                                        <a
                                                                            href="#"
                                                                            className="relative -mt-[10px] block right-0 w-[15px] h-5 no-underline bg-transparent"
                                                                            onClick={handleCopy}
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 14 16"
                                                                                className="w-4 align-middle"
                                                                            >
                                                                                <g
                                                                                    id="single-copy-04"
                                                                                    transform="translate(-2)"
                                                                                >
                                                                                    <g
                                                                                        id="Group_190"
                                                                                        data-name="Group 190"
                                                                                    >
                                                                                        <rect
                                                                                            id="Rectangle_502"
                                                                                            data-name="Rectangle 502"
                                                                                            width="10"
                                                                                            height="12"
                                                                                            transform="translate(2.5 3.5)"
                                                                                            className="icon-copy"
                                                                                        ></rect>
                                                                                        <path
                                                                                            id="Path_90"
                                                                                            data-name="Path 90"
                                                                                            d="M4.5.5h11v13"
                                                                                            className="icon-copy"
                                                                                        ></path>
                                                                                        <line
                                                                                            id="Line_187"
                                                                                            data-name="Line 187"
                                                                                            x2="4"
                                                                                            transform="translate(5.5 6.5)"
                                                                                            className="icon-copy"
                                                                                        ></line>
                                                                                        <line
                                                                                            id="Line_188"
                                                                                            data-name="Line 188"
                                                                                            x2="4"
                                                                                            transform="translate(5.5 9.5)"
                                                                                            className="icon-copy"
                                                                                        ></line>
                                                                                        <line
                                                                                            id="Line_189"
                                                                                            data-name="Line 189"
                                                                                            x2="4"
                                                                                            transform="translate(5.5 12.5)"
                                                                                            className="icon-copy"
                                                                                        ></line>
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            <div className="form-group">
                                                <label className="text-light/50">{t("password")}</label>
                                                <input
                                                    type="password"
                                                    id="current-password"
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            {/* {requireEmailVerification && (
                                                <div className="form-group verification-code">
                                                    <label className="text-light/50">
                                                        {t("email_verification_code")}
                                                    </label>
                                                    <div className="input-group relative flex flex-wrap items-stretch w-full">
                                                        <div className="relative flex-1">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={verificationCode}
                                                                onChange={(e) => setVerificationCode(e.target.value)}
                                                            />
                                                            <span
                                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-[#2177ff] cursor-pointer"
                                                                onClick={handlePasteVerificationCode}
                                                            >
                                                                {t("paste")}
                                                            </span>
                                                        </div>
                                                        <button
                                                            className={clsx(
                                                                "ml-[15px] border-none text-light inline-block font-normal text-center align-middle px-3 py-[.375rem] text-base leading-[1.5] rounded",
                                                                "disabled:bg-[#69698d] disabled:border-[#69698d] disabled:px-10 disabled:cursor-no-drop disabled:opacity-[.65]",
                                                                counter <= 0 && "bg-gradient-primary",
                                                            )}
                                                            onClick={handleSendEmailCode}
                                                            disabled={counter > 0}
                                                        >
                                                            {counter > 0 ? counter + "s" : t("send_code")}
                                                        </button>
                                                    </div>
                                                </div>
                                            )} */}
                                            <div className="form-group">
                                                <label className="text-light/50">{t("twoFA_code")}</label>
                                                <input
                                                    type="number"
                                                    id="twofa-code"
                                                    className="form-control"
                                                    value={twoFaCode}
                                                    onChange={(e) => setTwoFaCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="mt-auto">
                                                <div className="grid grid-cols-12">
                                                    <div className="col-span-12 md:col-span-6 md:col-start-4">
                                                        <button
                                                            className={clsx(
                                                                "text-light border-none text-base h-[47px] px-[15px] py-[11px] leading-[19px] disabled:cursor-no-drop relative transition-all duration-300 font-bold inline-flex items-center justify-center w-full hover:-translate-y-[3px] rounded-[5px]",
                                                                isEnable
                                                                    ? "bg-gradient-primary"
                                                                    : "bg-primary disabled:bg-text",
                                                            )}
                                                            // disabled={!canSubmit}
                                                            onClick={handleEnable}
                                                        >
                                                            {isEnable ? t("enable") : t("deactive")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default TwoFaSetupModal;
