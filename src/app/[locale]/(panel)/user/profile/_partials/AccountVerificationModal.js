import { Transition } from "@headlessui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "./AccountVerificationModal.scss";

import countryData from "countries-list/minimal/countries.en.min.json";
import Select from "react-select";
import clsx from "clsx";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import Loading from "@/components/Loading";

const AccountVerificationModal = ({ open, onClose }) => {
    const {t } = useTranslation();

    const { enqueueSnackbar } = useSnackbar();

    const modalRef = useRef(null);
    const frontFileRef = useRef(null);
    const backFileRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [step, setStep] = useState(1);

    // form values
    // step 1
    const [country, setCountry] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalId, setNationalId] = useState("");

    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);



    useEffect(()=>{
        console.log('set country to ', country)
    },[country])

    const reset = () => {
        setStep(1);

        setCountry(null);
        setFirstName("");
        setLastName("");
        setNationalId("");

        setFrontFile(null);
        setBackFile(null);
    };

    const handleCloseModal = () => {
        onClose?.();
        reset();
    };

    const handleCloseModalBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    const countries = useMemo(() => {
        return Object.entries(countryData).map(([value, label]) => ({ label, value }));
    }, []);

    const canAdvance = useMemo(() => {
        if (step === 1) {
            return !!country && !!firstName && !!lastName && !!nationalId;
        }

        if (step === 2) {
            return !!frontFile && !!backFile;
        }

        if (step === 3) {
            return true;
        }

        return false;
    }, [backFile, country, firstName, frontFile, lastName, nationalId, step]);

    const handleNextStep = () => {
        if (!canAdvance) {
            return;
        }

        if (step === 1) {
            setStep(2);
            return;
        }

        if (step === 2) {
            setLoading(true);

            const payload = new FormData();
            payload.append("CountryCode", country.value);
            payload.append("FirstName", firstName);
            payload.append("LastName", lastName);
            payload.append("IdNumber", nationalId);
            payload.append("IdCardFrontPhoto", frontFileRef.current.files[0]);
            payload.append("IdCardBackPhoto", backFileRef.current.files[0]);

            HttpClient.instanceClient()
                .post("/api/auth/me/kyc", payload,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }})
                .then((res) => res.data)
                .then((data) => {
                    if (!data.ok) {
                        enqueueSnackbar(t(data.err_code), { variant: "error" });
                        return;
                    }

                    setStep(3);
                })
                .finally(() => {
                    setLoading(false);
                });
            return;
        }

        reset();
        handleCloseModal();
    };

    const handlePrevious = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    const handleUploadFront = () => {
        if (frontFileRef.current) {
            frontFileRef.current.click();
        }
    };

    const handleUploadBack = () => {
        if (backFileRef.current) {
            backFileRef.current.click();
        }
    };

    const handleFrontSelected = (event) => {
        const { files } = event.target;

        if (files && files[0]) {
            const blob = URL.createObjectURL(files[0]);

            setFrontFile(blob);
        }
    };

    const handleBackSelected = (event) => {
        const { files } = event.target;

        if (files && files[0]) {
            const blob = URL.createObjectURL(files[0]);

            setBackFile(blob);
        }
    };

    useEffect(() => {
        // add .no-scroll-kyc class to body
        if (open) {
            document.body.classList.add("no-scroll-kyc");

            return () => {
                document.body.classList.remove("no-scroll-kyc");
            };
        }
    }, [open]);

    return (
        <Transition show={open}>
            <Transition.Child
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    className="pr-[15px] block fixed top-0 left-0 z-[9999] w-full h-full overflow-hidden outline-0 bg-secondary/60"
                    onClick={handleCloseModalBackdrop}
                >
                    <div className="m-0 lg:mt-7 lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 text-light w-full lg:min-w-[500px] min-[576px]:max-w-[500px] absolute pointer-events-auto">
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
                        <div
                            ref={modalRef}
                            className="modal customKYC min-[600px]:pb-4 lg:rounded-[10px] lg:border-black/20 bg-secondarySidebar relative flex flex-col h-dvh lg:h-auto w-full pointer-events-auto outline-0 border border-secondary-600 px-4 py-5 lg:p-0 overflow-y-auto"
                        >
                            <div className="border-none text-center flex items-start justify-between p-4 rounded-t-[3.8px]">
                                <h4 className="w-full leading-[1.5] text-[1.25rem] text-text">
                                    {t("account_verification")}
                                </h4>
                            </div>
                            <div className="modal-body relative flex-1 lg:p-4 flex flex-col h-full lg:h-auto lg:block">
                                <div className="steps text-center mb-3">
                                    <div className="line"></div>
                                    <div className="step step1">
                                        <span
                                            className={clsx("idx pointer", {
                                                active: step >= 1,
                                            })}
                                        >
                                            1
                                        </span>
                                        <span className="text-text">{t("personal_information")}</span>
                                    </div>
                                    <div className="step step2">
                                        <span
                                            className={clsx("idx pointer", {
                                                active: step >= 2,
                                            })}
                                        >
                                            2
                                        </span>
                                        <span className="text-text">{t("proof_of_identity")}</span>
                                    </div>
                                    <div className="step step3">
                                        <span
                                            className={clsx("idx pointer", {
                                                active: step >= 3,
                                            })}
                                        >
                                            3
                                        </span>
                                        <span className="text-text">{t("review")}</span>
                                    </div>
                                </div>
                                <Loading loading={loading} className="form-data px-6 lg:max-h-[400px] lg:overflow-y-scroll flex-1 lg:flex-0">
                                    {step === 1 && (
                                        <>
                                            <div className="m-0 mb-4">
                                                <div className="w-full p-0">
                                                    <label className="w-full text-text">{t("country")}</label>
                                                    <Select
                                                        menuPortalTarget={document.body}
                                                        menuPosition="fixed"
                                                        options={countries}
                                                        classNames={{
                                                            control: (state) => "text-black text-base",
                                                            menu: (state) => "z-[9999] text-black text-base",
                                                            menuPortal: (state) => "z-[9999] text-black text-base",
                                                            option: (state) => "hover:text-light hover:bg-primary",
                                                        }}
                                                        value={country}
                                                        onChange={(value) => setCountry(value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-[15px] lg:mb-4">
                                                <div className="col-span-2 lg:col-span-1">
                                                    <div className="form-group">
                                                        <label>{t("first_name")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={t("enter_first_name")}
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-2 lg:col-span-1">
                                                    <div className="form-group">
                                                        <label>{t("last_name")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={t("enter_last_name")}
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-[15px] mb-4">
                                                <div className="col-span-2">
                                                    <div className="form-group">
                                                        <label>{t("national_id")}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={nationalId}
                                                            onChange={(e) => setNationalId(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <div className="mb-4">
                                                <div
                                                    className="text-text acc-verify-desc"
                                                    dangerouslySetInnerHTML={{ __html: t("acc_verify_desc") }}
                                                ></div>
                                            </div>
                                            <div className="mb-4 grid grid-cols-2 gap-2">
                                                <div className="col-span-2">
                                                    <label className="text-text">{t("id_front_side")}</label>
                                                </div>
                                                <div className="col-span-2 lg:col-span-1">
                                                    <div
                                                        className="border border-secondary-400 overflow-hidden rounded-[5px] block w-[90%] h-[150px] mx-auto relative bg-[length:90%] bg-light bg-no-repeat bg-[50%_center]"
                                                        style={{
                                                            backgroundImage: `url('${frontFile}')`,
                                                        }}
                                                        onClick={handleUploadFront}
                                                    >
                                                        <span className="bg-[url('http://localhost:3001/assets2/images/icon-upload.svg')] bg-no-repeat bg-[50%] absolute top-0 left-0 w-full h-full z-[10]"></span>
                                                        <input
                                                            ref={frontFileRef}
                                                            type="file"
                                                            name="front"
                                                            className="hidden"
                                                            onChange={handleFrontSelected}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-2 lg:col-span-1">
                                                    <div className="bg-[url('http://localhost:3001/assets2/images/front-sample.svg')] border border-secondary-400 overflow-hidden rounded-[5px] block w-[90%] h-[150px] mx-auto relative bg-[length:90%] bg-light bg-no-repeat bg-[50%_center]"></div>
                                                </div>
                                            </div>
                                            <div className="mb-4 grid grid-cols-2 gap-2">
                                                <div className="col-span-2">
                                                    <label className="text-text">{t("id_back_side")}</label>
                                                </div>
                                                <div className="col-span-2 lg:col-span-1">
                                                    <div
                                                        className="border border-secondary-400 overflow-hidden rounded-[5px] block w-[90%] h-[150px] mx-auto relative bg-[length:90%] bg-light bg-no-repeat bg-[50%_center]"
                                                        style={{
                                                            backgroundImage: `url('${backFile}')`,
                                                        }}
                                                        onClick={handleUploadBack}
                                                    >
                                                        <span className="bg-[url('http://localhost:3001/assets2/images/icon-upload.svg')] bg-no-repeat bg-[50%] absolute top-0 left-0 w-full h-full z-[10]"></span>
                                                        <input
                                                            ref={backFileRef}
                                                            type="file"
                                                            name="back"
                                                            className="hidden"
                                                            onChange={handleBackSelected}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-2 lg:col-span-1">
                                                    <div className="bg-[url('http://localhost:3001/assets2/images/back-sample.svg')] border border-secondary-400 overflow-hidden rounded-[5px] block w-[90%] h-[150px] mx-auto relative bg-[length:90%] bg-light bg-no-repeat bg-[50%_center]"></div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <div className="mb-8 mt-4">
                                                <h5 className="text-success-50 text-center w-full text-[1.25rem] font-medium mb-2">
                                                    {t("successfully_submitted")}
                                                </h5>
                                                <p className="text-center">{t("account_verification_success")}</p>
                                            </div>
                                        </>
                                    )}
                                </Loading>
                                <div className="modal-footer px-6 lg:mt-0 justify-end">
                                    <button
                                        disabled={!canAdvance}
                                        className="w-full text-light bg-gradient-primary border-none relative transition-all duration-300 inline-flex items-center justify-center text-center align-middle px-3 py-[.375rem] leading-[1.5] text-base rounded disabled:opacity-[.65] disabled:cursor-no-drop"
                                        onClick={handleNextStep}
                                    >
                                        {step === 1 && t("next_step")}
                                        {step === 2 && t("submit")}
                                        {step === 3 && t("done")}
                                    </button>
                                    {step === 2 && (
                                        <span
                                            className="w-full cursor-pointer text-center block text-text mt-2"
                                            onClick={handlePrevious}
                                        >
                                            {t("back_previous")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default AccountVerificationModal;
