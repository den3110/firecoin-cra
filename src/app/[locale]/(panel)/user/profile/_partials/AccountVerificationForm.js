import { useTranslation } from "react-i18next";
import { useState } from "react";
import AccountVerificationModal from "@/app/[locale]/(panel)/user/profile/_partials/AccountVerificationModal";
import useAuth from "@/hooks/useAuth";

const AccountVerificationForm = () => {
    const {t } = useTranslation();

    const [modalOpened, setModalOpened] = useState(false);

    const [auth, _] = useAuth();

    return (
        <div className="mb-2 w-full">
            <div className="grid grid-cols-12 mb-8 lg:gap-x-[30px]">
                <div className="col-span-8 md:col-span-3">
                    <div className="flex items-center text-light text-sm h-full">{t("id_verification")}:</div>
                </div>
                <div className="col-span-12 md:col-span-9">
                    <div className="flex flex-col lg:flex-row lg:items-center h-full">
                        <p className="flex-1 text-text text-sm mb-0 flex-col flex">
                            <span dangerouslySetInnerHTML={{ __html: t("id_verification_desc") }}></span>
                        </p>
                        <div className="mt-4 lg:mt-0">
                            {auth?.user?.kyc !== "OPEN" && auth?.user?.kyc !== "APPROVED" && (
                                <button
                                    className="px-3 py-1.5 bg-gradient-primary text-light inline-block font-normal align-middle text-center select-none text-base leading-[1.5] rounded transition-[color] duration-150 disabled:opacity-[.65]"
                                    onClick={() => setModalOpened(true)}
                                >
                                    {t("verify_now")}
                                </button>
                            )}
                            {auth?.user?.kyc === "OPEN" && (
                                <span className="text-lg align-middle text-[#ffcf5c]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="17.034"
                                        height="18.2"
                                        viewBox="0 0 17.034 18.2"
                                        className="inline mr-2"
                                    >
                                        <g id="timer" transform="translate(0 0.011)">
                                            <path
                                                id="Path_28970"
                                                data-name="Path 28970"
                                                d="M10.171,1.318a1.71,1.71,0,1,0-.14,1.15,7.364,7.364,0,1,1-8.9,7.186,7.248,7.248,0,0,1,.885-3.51.568.568,0,1,0-1-.543A8.369,8.369,0,0,0,0,9.654,8.517,8.517,0,1,0,10.171,1.318Z"
                                                transform="translate(0 0)"
                                                fill="#f49b42"
                                            ></path>
                                            <path
                                                id="Path_28971"
                                                data-name="Path 28971"
                                                d="M7.035,10.445a1.7,1.7,0,1,0,2.41-2.41c-.813-.813-5.915-4.465-6.5-4.883a.568.568,0,0,0-.795.795C2.577,4.535,6.272,9.682,7.035,10.445Z"
                                                transform="translate(0.277 0.413)"
                                                fill="#f49b42"
                                            ></path>
                                        </g>
                                    </svg>
                                    {t("reviewing")}
                                </span>
                            )}
                            {auth?.user?.kyc === "APPROVED" && (
                                <span className="text-light text-base">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12.993"
                                        height="15.88"
                                        viewBox="0 0 12.993 15.88"
                                        className="inline-block"
                                    >
                                        <path
                                            id="Path_28973"
                                            data-name="Path 28973"
                                            d="M12.5,2,6,4.887V9.218a8.979,8.979,0,0,0,6.5,8.662,8.979,8.979,0,0,0,6.5-8.662V4.887ZM11.053,13.549,8.165,10.662,9.187,9.641l1.866,1.866,4.753-4.753,1.021,1.021Z"
                                            transform="translate(-6 -2)"
                                            fill="#46ad90"
                                        ></path>
                                    </svg>
                                    <span className="text-light ml-2">{t("verified")}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AccountVerificationModal open={modalOpened} onClose={() => setModalOpened(false)} />
        </div>
    );
};

export default AccountVerificationForm;
