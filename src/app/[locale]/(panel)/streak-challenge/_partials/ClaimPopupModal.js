
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import HttpClient from "@/services/HttpClient";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { setClaimPopupModalOpen } from "@/store/generalReducer";

const ClaimPopupModal = () => {
    const {t } = useTranslation();

    const [requestCode, setRequestCode] = useState();
    const [code, setCode] = useState();

    const [counter, setCounter] = useState(0);

    const open = useSelector((state) => state.general.claimPopupModalOpen);

    const dispatch = useDispatch();

    const handleSendCode = () => {
        HttpClient.instanceClient()
            .post("/api/auth/2fa/g-authenticator/jackpot-claim", {
                captcha: "string",
                captcha_geetest: {
                    captcha_output: "",
                    gen_time: "",
                    lot_number: "",
                    pass_token: "",
                },
            })
            .then((res) => {
                setRequestCode(res.data.d);

                setCounter(60);
            });
    };

    const handlePaste = () => {
        if (navigator.clipboard) {
            navigator.clipboard.readText()
              .then(text => {
                setCode(text);
              })
              .catch(err => {
                // Xử lý lỗi (có thể không được cấp quyền)
              });
          }
     
    };

    const handleSubmit = () => {
        HttpClient.instanceClient()
            .post("/api/auth/2fa/community-jackpot/claim", {
                code: "",
                otpCode: code,
                requestCode,
            })
            .then(({ data }) => {
                if (!data.ok) {
                    onClose?.();
                    return;
                }

                onClose?.();
            });
    };

    const handleClose = () => {
        dispatch(setClaimPopupModalOpen(false));

        setCode("");
        setRequestCode("");
    };

    const handleCloseBackdrop = (e) => {
        if (e.target.currentTarget === e.target) {
            handleClose();
        }
    };

    useEffect(() => {
        if (counter <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    const canSubmit = code && requestCode;
    
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
                as="div"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-50"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-50"
                leaveTo="opacity-0"
                className="fixed top-0 left-0 w-screen h-dvh bg-black z-[1040]"
                onClick={handleCloseBackdrop}
            ></Transition.Child>
            <Transition.Child
                as="div"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute z-[1051]"
            >
                <div className="overflow-x-hidden overflow-y-auto text-light fixed top-0 left-0 z-[1050] w-full h-full">
                    <div className="modal-dialog text-light mx-auto lg:my-7 w-full min-[576px]:max-w-[500px] lg:min-w-[500px] absolute top-0 lg:top-[100px] left-1/2 -translate-x-1/2 h-full lg:h-auto">
                        <div className="bg-secondarySidebar p-0 relative flex flex-col w-full border border-black/20 rounded-[.3rem] outline-0 h-full lg:h-auto">
                            <header className="border-none relative w-full flex items-start justify-between p-4 rounded-t-[calc(.3rem-1px)]">
                                <span
                                    className="bg-[url('http://localhost:3001/assets2/images/icon-close.png')] block w-[29px] h-[29px] m-2 lg:m-0 absolute right-0 lg:-right-[50px] top-0 cursor-pointer"
                                    onClick={handleClose}
                                ></span>
                                <h3 className="modal-title text-[24px] leading-[1.5] font-medium">
                                    {t("security_verifications")}
                                </h3>
                            </header>
                            <div className="modal-body p-5 relative lg:flex-1">
                                <div className="box-content">
                                    <div className="grid h-full">
                                        <div className="flex flex-col">
                                            <div className="form-group">
                                                <label className="text-light/50">{t("email_verification_code")}</label>
                                                <div className="input-group flex flex-wrap items-stretch w-full">
                                                    <div className="relative flex-1 w-[1%]">
                                                        <input
                                                            type="text"
                                                            placeholder={t("verification_code")}
                                                            className="pr-[55px] rounded h-10 leading-[40px] border border-light/[.15] bg-transparent text-light w-full block text-base font-normal focus:ring-0"
                                                            value={code}
                                                            onChange={(e) => setCode(e.target.value)}
                                                        />
                                                        <span
                                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-text-paste cursor-pointer"
                                                            onClick={handlePaste}
                                                        >
                                                            {t("paste")}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className={clsx(
                                                            "ml-[15px] text-light inline-block font-normal text-center align-middle select-none px-3 py-[.375rem] text-base leading-[1.5] rounded",
                                                            "disabled:px-10 disabled:ml-[15px] disabled:text-light disabled:opacity-[.65] disabled:cursor-no-drop",
                                                            counter > 0
                                                                ? "disabled:bg-[#69698d] disabled:border-[#69698d]"
                                                                : "bg-gradient-primary border-none",
                                                        )}
                                                        disabled={counter > 0}
                                                        onClick={handleSendCode}
                                                    >
                                                        {counter > 0 ? counter : t("send_code")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="border-none justify-center flex flex-wrap items-center p-3 rounded-b-[calc(.3rem-1px)]">
                                <button
                                    className="w-full text-light bg-gradient-primary border-none m-1 px-4 py-2 text-[1.25rem] leading-[1.5] rounded-[.3rem] font-normal text-center align-middle select-none disabled:opacity-[.65] disabled:cursor-no-drop "
                                    disabled={!canSubmit}
                                    onClick={handleSubmit}
                                >
                                    {t("confirm")}
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default ClaimPopupModal;
