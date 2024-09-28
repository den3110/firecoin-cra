import { useTranslations } from "next-intl";
import BetHistory from "@/components/history/BetHistory";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { setOrderModalOpen } from "@/store/generalReducer";

const TradeHistoryMobileModal = () => {
    const t = useTranslations();

    const dispatch = useDispatch();

    const open = useSelector((state) => state.general.orderModalOpen);

    const handleClose = () => {
        dispatch(setOrderModalOpen(false));
    };

    return (
        <Transition show={open}>
            <div className="h-full block fixed top-0 left-0 w-full bg-secondary text-[.875rem] text-light z-[1050] overflow-x-hidden overflow-y-auto outline-0">
                <div className="absolute top-0 left-0 min-w-0 w-full h-dvh">
                    <div className="modal-header bg-secondary px-2.5 py-3.5 overflow-hidden flex items-center justify-between text-light h-[52px]">
                        <span
                            className="basis-[30px] inline-block overflow-hidden cursor-pointer text-light"
                            onClick={handleClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16.003"
                                height="12.059"
                                viewBox="0 0 16.003 12.059"
                            >
                                <g id="rounded-head-arrow" transform="translate(16.003 12.059) rotate(180)">
                                    <path
                                        id="Path_29622"
                                        data-name="Path 29622"
                                        d="M15.5,4.945l-5-4.5a1.5,1.5,0,1,0-2,2.229l2.09,1.885H1.5a1.5,1.5,0,1,0,0,3h9.092L8.5,9.444a1.5,1.5,0,1,0,2.006,2.23l5-4.5a1.5,1.5,0,0,0,0-2.23Z"
                                        fill="#fff"
                                        className="fill-color"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span className="flex-1 text-base font-bold">{t("transaction_history")}</span>
                    </div>
                    <div className="modal-content p-5 border-0 bg-secondarySidebar h-[calc(100%-52px)] overflow-hidden">
                        <BetHistory />
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default TradeHistoryMobileModal;
