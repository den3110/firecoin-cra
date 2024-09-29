import { useMemo, useState } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { Link } from "@/navigation";
import HttpClient from "@/services/HttpClient";
import useAffiliateOverviewQuery from "@/hooks/queries/useAffiliateOverviewQuery";
import { useDispatch, useSelector } from "react-redux";
import { setBuyNowModalOpen } from "@/store/generalReducer";
import { useSnackbar } from "notistack";
import useLocale from "@/hooks/useLocales";

const BuyNowModal = () => {
    const {t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const open = useSelector((state) => state.general.buyNowModalOpen);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [firstCheckbox, setFirstCheckbox] = useState(false);
    const [secondCheckbox, setSecondCheckbox] = useState(false);

    const {locale} = useLocale()

    const { refetch } = useAffiliateOverviewQuery();

    const setOpen = (value) => {
        dispatch(setBuyNowModalOpen(value));
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    const handleCloseBtn = () => {
        setOpen(false);
    };

    const canSubmit = useMemo(() => {
        return firstCheckbox && secondCheckbox;
    }, [firstCheckbox, secondCheckbox]);

    const handleSubmit = () => {
        setLoading(true);

        HttpClient.instanceClient()
            .post("/api/wallet/binaryoption/agency-license")
            .then((res) => res.data)
            .then((data) => {
                if (!data.ok) {
                    enqueueSnackbar(t(data.d.err_code), { variant: "error" });
                    return;
                }

                setOpen(false);
                refetch().then();
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Transition as="div" show={open}>
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
                enter="transition transform lg:transform-none"
                enterFrom="-translate-x-full lg:opacity-0"
                enterTo="translate-x-0 lg:opacity-100"
                leave="transition transform lg:transform-none"
                leaveFrom="translate-x-0 lg:opacity-100"
                leaveTo="-translate-x-full lg:opacity-0"
                className="z-[9999] fixed top-0 left-0 w-full h-full bg-secondary lg:bg-transparent"
                onClick={handleClose}
            >
                <div className="modal-dialog text-light mx-auto lg:my-7 w-full lg:w-auto h-full lg:h-auto lg:min-w-[500px] min-w-[576px]:max-w-[500px] absolute lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 pointer-events-auto">
                    <div className="modal-content-info h-full">
                        <button
                            className={clsx(
                                "text-light w-[30px] h-[30px] rounded-full absolute top-[7px] right-[5px] lg:-top-[5px] lg:-right-[35px] lg:bg-light/30 flex items-center justify-center",
                                "z-[10000] float-right text-[1.5rem] font-bold leading-none [text-shadow:0_1px_0_#fff] opacity-50",
                            )}
                            onClick={handleCloseBtn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 overflow-hidden">
                                <g
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                    strokeWidth="2"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    className="nc-icon-wrapper"
                                >
                                    <g className="nc-interact_menu-close-2-o-32">
                                        <path
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 6h28"
                                            transform="translate(0 10.00) rotate(45.00 16 6)"
                                        ></path>
                                        <path
                                            data-color="color-2"
                                            fill="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 16h28"
                                            opacity="0"
                                        ></path>
                                        <path
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeMiterlimit="10"
                                            d="M2 26h28"
                                            transform="translate(0 -10) rotate(-45 16 26)"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <Loading
                            loading={loading}
                            className="bg-secondary relative flex flex-col w-full border border-black/20 rounded-[.3rem] outline-0"
                        >
                            <div className="content-wrapper rounded-[9px] text-light">
                                <div className="header border-custom-border p-4 text-center border-b ">
                                    <span className="font-bold text-xl capitalize leading-[1.5] mb-0 ">
                                        {t("confirm_your_participation")}
                                    </span>
                                </div>
                                <div className="body px-12 py-8">
                                    <div className="mb-4 w-[211px] h-[205px] mx-auto my-0 bg-cover bg-no-repeat bg-[url('~/public/assets/images/shake.svg')]"></div>
                                    <div className="text-[.875rem] text-light text-center mb-4">
                                        {t("need_to_pay_amount", {
                                            amount: 100,
                                        })}
                                    </div>
                                    <div className="mb-4 text-secondary flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 focus:outline-none focus:ring-transparent rounded-sm mr-2.5"
                                            value="1"
                                            checked={firstCheckbox}
                                            onChange={(e) => setFirstCheckbox(e.target.checked)}
                                        />
                                        <span className="text-text">
                                            {t("i_confirm_that_and_accept.text_before")}{" "}
                                            <Link href="/faqs/general-provitions" className="text-primary">
                                                {t("term_of_service")}
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="mb-4 text-secondary flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-blue-600 focus:outline-none focus:ring-transparent rounded-sm mr-2.5"
                                            value="1"
                                            checked={secondCheckbox}
                                            onChange={(e) => setSecondCheckbox(e.target.checked)}
                                        />
                                        <span className="text-text">
                                            {t("i_have_read_and_accept.text_before")}{" "}
                                            <a target="_blank" href={`/public/Agency_Obligations/wl_Agency%20Obligations_${locale}.pdf`} className="text-primary">
                                                {t("agency_obligations")}
                                            </a>
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full px-3 py-1.5 text-base bg-gradient-primary border-none text-light rounded-[6px] transition-all duration-300 font-bold inline-flex items-center justify-center disabled:opacity-[.65] disabled:cursor-not-allowed"
                                        disabled={!canSubmit}
                                        onClick={handleSubmit}
                                    >
                                        {t("confirm")}
                                    </button>
                                </div>
                            </div>
                        </Loading>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default BuyNowModal;
