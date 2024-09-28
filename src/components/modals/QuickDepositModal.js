import { Fragment, useEffect } from "react";
import Formatter from "@/utils/Formatter";
import { Transition } from "@headlessui/react";
import { setQuickDepositModal } from "@/store/generalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "@/navigation";
import { useTranslation } from "react-i18next";

const QuickDepositModal = () => {
    const {t }= useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const { open, amount } = useSelector((state) => state.general.quickDepositModal);

    const handleClose = () => {
        dispatch(setQuickDepositModal({ open: false }));
        router.push('/index')
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
        <Transition
            show={open}
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="modal block z-[10000] fixed top-0 left-0 w-full h-full overflow-hidden outline-0">
                <div
                    className="absolute top-0 left-0 w-full h-full block overflow-hidden bg-black/70"
                    onClick={handleClose}
                ></div>
                <div className="modal-dialog text-light mx-auto lg:my-7 min-w-full lg:min-w-[500px] absolute top-0 lg:top-[100px] left-1/2 pointer-events-auto -translate-x-1/2 h-full lg:h-auto">
                    <div className="modal-content bg-secondarySidebar relative flex flex-col w-full pointer-events-auto bg-clip-padding border border-black/20 rounded-[.3rem] outline-0 h-full lg:h-auto">
                        <div className="modal-header border-none flex items-start justify-between p-4 rounded-t-[calc(.3rem-1px)]">
                            <button
                                className="top-[30px] lg:top-0 right-[30px] lg:-right-[15px] p-0 text-light w-[30px] h-[30px] rounded-full absolute lg:bg-light/30 flex items-center justify-center lg:-m-4 ml-auto z-[10001]"
                                onClick={handleClose}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5">
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
                        </div>
                        <div className="modal-body relative flex-1 p-4">
                            <p className="text-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="62.042"
                                    height="62.01"
                                    viewBox="0 0 62.042 62.01"
                                    className="w-[100px] h-[100px] inline-block"
                                >
                                    <g id="clapping-hands" transform="translate(1.036 1.01)">
                                        <path
                                            id="Path_29635"
                                            data-name="Path 29635"
                                            d="M35.106,22.323l7.637-7.629a2.733,2.733,0,0,1,3.919.055h0a2.733,2.733,0,0,1-.054,3.81l-8.363,8.363"
                                            transform="translate(-20.516 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29636"
                                            data-name="Path 29636"
                                            d="M28.134,19.714,32.4,15.481a2.733,2.733,0,0,1,3.92.056h0a2.733,2.733,0,0,1-.055,3.809"
                                            transform="translate(-3.196 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29637"
                                            data-name="Path 29637"
                                            d="M51.507,42.32a15.2,15.2,0,0,1-.43-10.762c1.6-4.787,3.877-10.187,4.968-15.091a3.008,3.008,0,1,1,5.893,1.208,60.037,60.037,0,0,0-.644,9.043"
                                            transform="translate(-50.294 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29638"
                                            data-name="Path 29638"
                                            d="M51.739,37.366a2.992,2.992,0,0,1,4.156-.031h0a2.966,2.966,0,0,1,.06,4.255L39.19,58.348a12.474,12.474,0,0,1-17.639,0h0A16.565,16.565,0,0,1,17.527,41.39c1.738-5.2,4.209-11.058,5.394-16.382a3.267,3.267,0,1,1,6.4,1.312c-.03.243-.693,5.189-1.409,8.884a.3.3,0,0,0,.51.269L40.8,23.084a2.967,2.967,0,0,1,4.255.06h0A2.968,2.968,0,0,1,45,27.28L34.526,37.756"
                                            transform="translate(-11.505 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29639"
                                            data-name="Path 29639"
                                            d="M25.5,28.977a2.967,2.967,0,0,1,4.135-.058h0a2.967,2.967,0,0,1,.061,4.255L16.7,46.168"
                                            transform="translate(14.728 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29640"
                                            data-name="Path 29640"
                                            d="M26.082,27.527l3.62-3.589A2.967,2.967,0,0,1,33.957,24h0a2.967,2.967,0,0,1-.059,4.135L20.065,41.968"
                                            transform="translate(7.167 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29641"
                                            data-name="Path 29641"
                                            d="M15.471,9.394l1.656,1.879a1.251,1.251,0,0,1-.256,1.875L9.471,18a1.252,1.252,0,0,1-1.639-1.86l5.747-6.73a1.252,1.252,0,0,1,1.892-.016Z"
                                            transform="translate(37.028 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29642"
                                            data-name="Path 29642"
                                            d="M10.991,20.321a1.254,1.254,0,0,1,1.684.861l.6,2.432a1.251,1.251,0,0,1-1.09,1.546l-8.809.882a1.252,1.252,0,0,1-.593-2.407Z"
                                            transform="translate(46.688 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                        <path
                                            id="Path_29643"
                                            data-name="Path 29643"
                                            d="M20.52,2.147a1.248,1.248,0,0,1,1.038-.063l2.337.9a1.252,1.252,0,0,1,.643,1.778L20.22,12.491a1.252,1.252,0,0,1-2.313-.891l1.981-8.629a1.248,1.248,0,0,1,.632-.824Z"
                                            transform="translate(19.427 -2)"
                                            fill="none"
                                            stroke="#1ebf75"
                                            strokeLinecap="square"
                                            strokeMiterlimit="10"
                                            strokeWidth="2"
                                        ></path>
                                    </g>
                                </svg>
                            </p>
                            <h5 className="text-xl text-light text-center mb-4 font-medium leading-[1.2]">
                                <b>{t("quick_deposit_successfully")}</b>
                            </h5>
                            <p className="text-light text-center mb-4">{t("you_have_made_successful_quick_deposit")}</p>
                            <p className="text-[34px] text-success-50 text-center mb-4">
                                <b>+{Formatter.formatCurrency(amount || 0)}</b>
                            </p>
                        </div>
                        <div className="border-none flex flex-wrap items-center justify-end p-3 rounded-b-[.3rem-1px]">
                            <button
                                className="cursor-pointer border border-success-50 bg-success-50 text-light w-full m-1 inline-block font-normal text-center align-middle px-3 py-[.375rem] text-base rounded leading-[1.5]"
                                onClick={handleClose}
                            >
                                {t("play_now")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default QuickDepositModal;
