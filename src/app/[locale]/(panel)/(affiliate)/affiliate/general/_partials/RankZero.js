import Subbanner from "@/app/[locale]/(panel)/(affiliate)/affiliate/general/_partials/Subbanner";
import BuyNowModal from "@/components/modals/affiliate/BuyNowModal";
import { useTranslation } from "react-i18next";
import { setBuyNowModalOpen } from "@/store/generalReducer";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import copy from "copy-to-clipboard";
import { getCurrentHost } from "@/utils/clientInfo";

const RankZero = () => {
    const {t } = useTranslation();

    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();

    const [auth, _] = useAuth();

    const handleCopy = (text) => {
        return () => {
            if(copy(text))
                enqueueSnackbar(t("copied_to_clipboard"), { variant: "success" });
        };
    };

    const handleOpenBuyModal = () => {
        dispatch(setBuyNowModalOpen(true));
    };

    return (
        <div>
            <div className="banner bg-[url('~/public/assets/images/affiliate_bg.png')] relative w-full min-h-[calc(100vh-185px)] max-[450px]:min-h-[550px] bg-cover bg-no-repeat bg-top">
                <div className="content absolute top-0 left-0 w-full h-full max-[450px]:pt-12">
                    <div className="h-full custom-container">
                        <div className="grid h-full items-center grid-cols-1 lg:grid-cols-2 gap-[30px]">
                            <div>
                                <p className="leading-[normal] text-light font-bold text-lg lg:text-[1.875rem] mb-6 mt-0">
                                    {t(
                                        "you_need_to_buy_agency_license_to_receive_agency_commissions_and_trading_commissions",
                                    )}
                                </p>
                                <button
                                    type="button"
                                    className="whitespace-nowrap px-10 py-[11px] text-light bg-gradient-primary border-none cursor-pointer relative font-bold flex items-center justify-center text-center align-middle text-base leading-[1.5] rounded"
                                    onClick={handleOpenBuyModal}
                                >
                                    {t("buy_now")} $100
                                </button>
                            </div>
                            <div>
                                <div className="bg-secondary px-2 py-4 lg:p-5 rounded-[18px] h-full border border-primary">
                                    <div className="link-group">
                                        <div className="grid grid-cols-2 lg:gap-x-[30px]">
                                            <div className="col-span-2">
                                                <p className="text-text text-sm mb-2 mt-0">{t("registration_link")}</p>
                                                <div className="input-group relative mb-4">
                                                    <input
                                                        className="h-[45px] leading-[45px] bg-[#fafafa] text-[#333] rounded border-none border-b border-b-[#868f93] w-full block text-[.75rem] lg:text-base"
                                                        readOnly
                                                        type="text"
                                                        value={`${getCurrentHost()}/register?r=${auth?.user?.rc}`}
                                                    />
                                                    <div className="input-append flex items-center h-full absolute top-0 right-[10px] rounded-r-[4px]">
                                                        <button
                                                            className="rounded max-[1024px]:max-w-[60px] w-[95px] h-[31px] leading-[normal] whitespace-nowrap text-light bg-gradient-primary border-none cursor-pointer relative font-bold inline-flex items-center justify-center text-center align-middle px-3 py-[0.375rem] text-[.75rem] lg:text-base"
                                                            onClick={handleCopy(
                                                                `${getCurrentHost()}/register?r=${auth?.user?.rc}`,
                                                            )}
                                                        >
                                                            {t("copy")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <p className="text-text text-sm mb-2 mt-0">{t("invitation_code")}</p>
                                                <div className="input-group relative mb-4">
                                                    <input
                                                        className="h-[45px] leading-[45px] bg-[#fafafa] text-[#333] rounded border-none border-b border-b-[#868f93] w-full block text-[.75rem] lg:text-base"
                                                        readOnly
                                                        type="text"
                                                        value={auth?.user?.rc}
                                                    />
                                                    <div className="input-append flex items-center h-full absolute top-0 right-[10px] rounded-r-[4px]">
                                                        <button
                                                            className="rounded max-[1024px]:max-w-[60px] w-[95px] h-[31px] leading-[normal] whitespace-nowrap text-light bg-gradient-primary border-none cursor-pointer relative font-bold inline-flex items-center justify-center text-center align-middle px-3 py-[0.375rem] text-[.75rem] lg:text-base"
                                                            onClick={handleCopy(auth?.user?.rc)}
                                                        >
                                                            {t("copy")}
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
            </div>
            <Subbanner />
            <BuyNowModal />
        </div>
    );
};

export default RankZero;
