import BalanceDropdown from "@/components/BalanceDropdown";
import { Link, usePathname } from "@/navigation";
import HistoryToggleButton from "@/components/HistoryToggleButton";
import SettingDropdown from "@/components/SettingDropdown";
import clsx from "clsx";
import NotificationDropdown from "@/components/NotificationDropdown";
import NavStreak from "@/app/[locale]/(panel)/_partials/NavStreak";
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuOpen } from "@/store/generalReducer";
import QuickDeposit from "@/components/QuickDeposit";
import QuickDepositModal from "@/components/modals/QuickDepositModal";
import { useDesktop, useIsNotSmallMobile } from "@/hooks/responsives";
import MobileNotificationButton from "@/components/MobileNotificationButton";
import { getCurrentLogoSvg } from "@/utils/clientInfo";
import { useTranslation } from "react-i18next";

const PanelHeader = () => {
    const {t }= useTranslation();
    const pathname = usePathname();
    const isDesktop = useDesktop();
    const isNotSmallMobile = useIsNotSmallMobile();

    const dispatch = useDispatch();
    const mobileMenuOpen = useSelector((state) => state.general.mobileMenuOpen);

    const handleToggleMobileSidebar = () => {
        dispatch(setMobileMenuOpen(!mobileMenuOpen));
    };

    return (
        <div className="header-master">
            <div className="box-header z-[100]">
                <div className="header-wrapper w-full px-[15px] lg:px-[30px]">
                    <div className="flex justify-between items-center">
                        <div className="hidden left-nav h-full lg:flex items-center">
                            <Link href="/index" className="ml-1 h-[50px] items-stretch">
                                <img src={getCurrentLogoSvg()} alt="logo" width={162} height={50} className="!h-[50px]" />
                            </Link>
                        </div>
                        <div className="block lg:hidden" onClick={handleToggleMobileSidebar}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23.944"
                                height="19.953"
                                viewBox="0 0 23.944 19.953"
                            >
                                <g id="menu-4" transform="translate(0 -1)">
                                    <path
                                        id="Path_29261"
                                        data-name="Path 29261"
                                        d="M21.949,5H2A2,2,0,0,0,2,8.991H21.949a2,2,0,1,0,0-3.991Z"
                                        transform="translate(0 3.981)"
                                        fill="#fff"
                                    ></path>
                                    <path
                                        id="Path_29262"
                                        data-name="Path 29262"
                                        d="M21.949,1H2A2,2,0,0,0,2,4.991H21.949a2,2,0,1,0,0-3.991Z"
                                        fill="#fff"
                                    ></path>
                                    <path
                                        id="Path_29263"
                                        data-name="Path 29263"
                                        d="M9.977,9H2a2,2,0,0,0,0,3.991H9.977A2,2,0,1,0,9.977,9Z"
                                        transform="translate(0 7.963)"
                                        fill="#fff"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        <div className="right-nav content-end flex">
                            <div className="pr-0 flex items-center lg:pr-2">
                                <ul className="flex items-center list-none">
                                    <NavStreak />
                                    <li className="header-balance lg:mr-6">
                                        <BalanceDropdown />
                                    </li>
                                    {!isDesktop && (
                                        <li className="pl-2 md:px-2 px-0">
                                            <MobileNotificationButton />
                                        </li>
                                    )}
                                    <li className="hidden md:block btn-deposit px-[10px] lg:mr-2">
                                        <QuickDeposit />
                                    </li>
                                    <li className="hidden md:block btn-settings cursor-pointer px-[.625rem] relative">
                                        <SettingDropdown />
                                    </li>
                                    <li className="hidden md:block btn-settings relative cursor-pointer px-2">
                                        <Link
                                            href="/user/profile"
                                            className={clsx("flex flex-col items-center text-center profile-link", {
                                                active: pathname.startsWith("/user/profile"),
                                            })}
                                        >
                                            <span className="text-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="17.281"
                                                    height="17.283"
                                                    viewBox="0 0 24 24"
                                                    className="link-icon"
                                                >
                                                    <g id="circle-10" transform="translate(-1.164 -1.164)">
                                                        <path
                                                            id="Path_29003"
                                                            data-name="Path 29003"
                                                            d="M33.642,36.066V35.3a3.093,3.093,0,0,0-1.558-2.685l-3.078-1.765"
                                                            transform="translate(-13.086 -13.978)"
                                                            fill="none"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="2"
                                                        ></path>
                                                        <path
                                                            id="Path_29004"
                                                            data-name="Path 29004"
                                                            d="M14.636,30.847l-3.078,1.765A3.093,3.093,0,0,0,10,35.3v.768"
                                                            transform="translate(-3.876 -13.978)"
                                                            fill="none"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="2"
                                                        ></path>
                                                        <path
                                                            id="Path_29005"
                                                            data-name="Path 29005"
                                                            d="M20.124,22.824h0c-2.277,0-4.124-2.362-4.124-4.639V16.124A4.124,4.124,0,0,1,20.124,12h0a4.124,4.124,0,0,1,4.124,4.124v2.062C24.247,20.463,22.4,22.824,20.124,22.824Z"
                                                            transform="translate(-6.784 -4.846)"
                                                            fill="none"
                                                            strokeLinecap="square"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="2"
                                                        ></path>
                                                        <circle
                                                            id="Ellipse_1365"
                                                            data-name="Ellipse 1365"
                                                            cx="11"
                                                            cy="11"
                                                            r="11"
                                                            transform="translate(2.164 2.164)"
                                                            fill="none"
                                                            strokeLinecap="square"
                                                            strokeMiterlimit="10"
                                                            strokeWidth="2"
                                                        ></circle>
                                                    </g>
                                                </svg>{" "}
                                            </span>
                                            <span className="link-text">{t("profile")}</span>
                                        </Link>
                                    </li>
                                    <li className="hidden md:block btn-settings relative cursor-pointer px-2">
                                        <NotificationDropdown />
                                    </li>
                                    {pathname.startsWith("/index") && isNotSmallMobile && (
                                        <>
                                            <li className="px-2">
                                                <span className="block mb-[5px] w-[1px] h-[30px] bg-light/20"></span>
                                            </li>
                                            <li className="px-2 relative">
                                                <HistoryToggleButton />
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <QuickDepositModal />
        </div>
    );
};

export default PanelHeader;
