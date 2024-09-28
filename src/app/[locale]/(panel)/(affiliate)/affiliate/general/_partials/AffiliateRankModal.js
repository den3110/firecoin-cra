
import affiliateRankImg from "@/assets/images/aff_rank.png";
import { Transition } from "@headlessui/react";

const AffiliateRankModal = ({ open, onClose }) => {
    return (
        <Transition
            show={open}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="block fixed top-0 left-0 z-[1050] w-full h-full overflow-hidden outline-0">
                <div className="mask absolute top-0 left-0 w-full h-full block overflow-hidden bg-[#011022]/[.7]"></div>
                <div className="modal-dialog min-w-[unset] max-w-[800px] w-[80%] text-light my-auto absolute top-[100px] left-1/2 -translate-x-1/2 pointer-events-auto">
                    <div className="modal-content border-none bg-secondarySidebar relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-[.3rem] outline-0">
                        <div className="modal-header border-none flex items-start justify-between p-4 rounded-t-[calc(.3rem-1px)]">
                            <button
                                type="button"
                                className="text-light w-[30px] h-[30px] rounded-full absolute -top-[5px] right-[10px] bg-light/30 flex items-center justify-center -m-4 ml-auto opacity-50"
                                onClick={onClose}
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
                        <div className="modal-body relarive flex-1">
                            <p className="mb-4">
                                <img src={affiliateRankImg} alt="affiliate rank image" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default AffiliateRankModal;
