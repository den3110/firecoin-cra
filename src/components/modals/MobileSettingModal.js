import { useTranslation } from "react-i18next";
import ToggleButton from "@/components/inputs/ToggleButton";
import { useContext, useMemo } from "react";
import UIContext from "@/contexts/UIContext";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { useDispatch, useSelector } from "react-redux";
import { setLanguageModalOpen, setSettingModalOpen } from "@/store/generalReducer";
import { Transition } from "@headlessui/react";
import { localeList } from "@/components/LocaleSelect";
import { usePathname, useRouter } from "@/navigation";
import clsx from "clsx";
import useAuth from "@/hooks/useAuth";
import useLocale from "@/hooks/useLocales";

const MobileSettingModal = () => {
    const {t } = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const [auth, setAuth] = useAuth();

    const { hideBalances, setHideBalances } = useContext(UIContext);

    const [enableSound, setEnableSound] = useLocalStorageState("SoundEnabled", true);

    const open = useSelector((state) => state.general.settingModalOpen);
    const showLanguageModal = useSelector((state) => state.general.languageModalOpen);

    const dispatch = useDispatch();

    const handleChangeBalanceHide = () => {
        setHideBalances(!hideBalances);
    };

    const handleChangeSound = () => {
        setEnableSound(!enableSound);
    };

    const handleClose = () => {
        dispatch(setSettingModalOpen(false));
        dispatch(setLanguageModalOpen(false));
    };

    const handleOpenSelectLanguage = () => {
        dispatch(setLanguageModalOpen(true));
    };

    const handleCloseSelectLanguage = () => {
        dispatch(setLanguageModalOpen(false));
    };

    const handleSignOut = (e) => {
        e?.preventDefault();
        router.push("/");
        setAuth({
            initialized: true,
            user : null
        });
        localStorage.removeItem("USER_TOKEN");  
        handleClose();
    };

    const { locale, changeLanguage } = useLocale();

    const selectedLanguage = useMemo(() => {
        return localeList.find((item) => item.locale === locale);
    }, [locale]);

    const handleChangeLocale = (newLocale) => {
        return (e) => {
            e.preventDefault();
            changeLanguage(newLocale);
            //router.replace(pathname, { locale: newLocale });
        };
    };

    return (
        <>
            <Transition show={open}>
                <div className="fixed top-0 left-0 w-full h-full p-5 border border-light/10 overflow-y-auto z-[1000] bg-secondarySidebar text-base flex flex-col text-light">
                    <div className="header relative pr-2.5 pb-5">
                        <h4 className="text-[1.5rem] text-light mb-2 font-bold">{t("settings")}</h4>
                        <button
                            className="absolute top-0 right-0 rounded-full block overflow-hidden w-[30px] h-[30px] text-light"
                            onClick={handleClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
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
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-4 my-auto -mx-5 lg:m-0 px-5 py-[17px] bg-custom-chart-title">
                                <div className="flex items-center text-base flex-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        className="inline-block mr-[5px]"
                                    >
                                        <g id="globe" transform="translate(-0.324 -0.324)" opacity="0.5">
                                            <line
                                                id="Line_1450"
                                                data-name="Line 1450"
                                                y2="18"
                                                transform="translate(9.824 0.824)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></line>
                                            <line
                                                id="Line_1451"
                                                data-name="Line 1451"
                                                x2="18"
                                                transform="translate(0.824 9.824)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></line>
                                            <ellipse
                                                id="Ellipse_1795"
                                                data-name="Ellipse 1795"
                                                cx="5.042"
                                                cy="8.824"
                                                rx="5.042"
                                                ry="8.824"
                                                transform="translate(4.782 1)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinecap="square"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></ellipse>
                                            <line
                                                id="Line_1452"
                                                data-name="Line 1452"
                                                x2="14.931"
                                                transform="translate(2.359 5.118)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></line>
                                            <line
                                                id="Line_1453"
                                                data-name="Line 1453"
                                                x2="14.931"
                                                transform="translate(2.359 14.53)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></line>
                                            <circle
                                                id="Ellipse_1796"
                                                data-name="Ellipse 1796"
                                                cx="9"
                                                cy="9"
                                                r="9"
                                                transform="translate(0.824 0.824)"
                                                fill="none"
                                                stroke="#fff"
                                                strokeLinecap="square"
                                                strokeMiterlimit="10"
                                                strokeWidth="1"
                                                className="stroke-color"
                                            ></circle>
                                        </g>
                                    </svg>
                                    <span className="colorSecondary">{t("language")}</span>
                                </div>
                                <div className="flex gap-2 items-center" onClick={handleOpenSelectLanguage}>
                                    <img src={selectedLanguage.icon} alt="selected-language" width={24} height={18} />
                                    <span>{selectedLanguage.name}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        xmlnsSvgjs="http://svgjs.com/svgjs"
                                        version="1.1"
                                        width="12"
                                        height="12"
                                        x="0"
                                        y="0"
                                        viewBox="0 0 123.97 123.97"
                                        xmlSpace="preserve"
                                    >
                                        <g>
                                            <g xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M27.961,99.367c-5.8,5.8-5.7,15.3,0.5,20.899c5.8,5.301,14.8,4.801,20.3-0.8l47.3-47.3c2.8-2.8,4.2-6.5,4.2-10.2   s-1.4-7.399-4.2-10.2l-47.2-47.3c-5.5-5.5-14.6-6.1-20.3-0.8c-6.1,5.6-6.3,15.1-0.5,20.9l30.2,30.399c3.9,3.9,3.9,10.2,0,14.101   L27.961,99.367z"
                                                    fill="#ffffff"
                                                    data-original="#000000"
                                                    className="fill-color"
                                                ></path>
                                            </g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                            <g xmlns="http://www.w3.org/2000/svg"></g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center mb-2 my-auto -mx-5 lg:m-0 px-5 py-[17px] bg-custom-chart-title">
                                <div className="flex items-center text-base flex-1">
                                    <svg
                                        version="1.1"
                                        width="19"
                                        height="19"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 19 19"
                                        xmlSpace="preserve"
                                        className="mr-[5px]"
                                    >
                                        <g id="sound" transform="translate(0.5 -0.5)" opacity="0.5">
                                            <g id="Path_30736" fill="#ACADAF" className="fill-color">
                                                <path
                                                    d="M13.7,19.3c-0.2,0-0.4-0.1-0.6-0.2l-6.9-4.6H0.5c-0.6,0-1-0.4-1-1V6.3c0-0.6,0.4-1,1-1h5.7l6.9-4.6
                                      c0.3-0.2,0.7-0.2,1,0c0.3,0.2,0.5,0.5,0.5,0.9v16.8c0,0.4-0.2,0.7-0.5,0.9C14,19.3,13.9,19.3,13.7,19.3z M1.5,12.5h5
                                      c0.2,0,0.4,0.1,0.6,0.2l5.6,3.8V3.4L7.1,7.1C6.9,7.2,6.7,7.3,6.5,7.3h-5V12.5z"
                                                    className="st0"
                                                ></path>
                                            </g>
                                            <g id="Path_30737" fill="#ACADAF" className="fill-color">
                                                <path
                                                    d="M16.8,15.1c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4c0,0,0,0,0,0c1.9-2,1.9-5.1-0.1-7
                                      c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0c2.8,2.7,2.8,7.1,0.1,9.9c0,0-0.1,0.1-0.1,0.1C17.2,15,17,15.1,16.8,15.1z"
                                                    className="st0"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="colorSecondary">{t("sound")}</span>
                                </div>
                                <div>
                                    <ToggleButton checked={enableSound} onChange={handleChangeSound} />
                                </div>
                            </div>
                            <div className="flex items-center mb-4 my-auto -mx-5 lg:m-0 px-5 py-[17px] bg-custom-chart-title">
                                <div className="flex items-center text-base flex-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="13.543"
                                        viewBox="0 0 18 13.543"
                                        className="mr-[5px]"
                                    >
                                        <g id="preview" transform="translate(-734.025 -2)" opacity="0.5">
                                            <path
                                                id="Path_30402"
                                                data-name="Path 30402"
                                                d="M9.025,15.543c4.063,0,7.223-3.5,8.577-5.53a2.2,2.2,0,0,0,0-2.6C16.248,5.5,13.088,2,9.025,2S1.8,5.5.448,7.53a2.031,2.031,0,0,0,0,2.483C1.8,12.044,4.962,15.543,9.025,15.543Zm0-10.157a3.325,3.325,0,0,1,3.386,3.386,3.325,3.325,0,0,1-3.386,3.386A3.325,3.325,0,0,1,5.64,8.771,3.325,3.325,0,0,1,9.025,5.386Z"
                                                transform="translate(734)"
                                                fill="#fff"
                                            ></path>
                                        </g>
                                    </svg>
                                    <span className="colorSecondary">{t("show_balance")}</span>
                                </div>
                                <div>
                                    <ToggleButton checked={!hideBalances} onChange={handleChangeBalanceHide} />
                                </div>
                            </div>
                        </div>
                        <button
                            className="p-3 rounded bg-custom-chart-title inline-flex items-center text-light pointer font-bold"
                            onClick={handleSignOut}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="16"
                                viewBox="0 0 17 16"
                                className="mr-2"
                            >
                                <g id="log-out" transform="translate(0.5 -0.5)" className="ccc">
                                    <path
                                        id="Path_29008"
                                        data-name="Path 29008"
                                        d="M6.5,5.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v12a1,1,0,0,1-1,1h-7a1,1,0,0,1-1-1v-3"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="2"
                                        className="stroke-color"
                                        style={{ fill: "transparent !important;" }}
                                    ></path>
                                    <line
                                        id="Line_1254"
                                        data-name="Line 1254"
                                        x1="11"
                                        transform="translate(0.5 8.5)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="2"
                                        className="stroke-color"
                                    ></line>
                                    <path
                                        id="Path_29009"
                                        data-name="Path 29009"
                                        d="M3.5,5.5l-3,3,3,3"
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="2"
                                        className="stroke-color"
                                    ></path>
                                </g>
                            </svg>
                            <span>{t("sign_out")}</span>
                        </button>
                    </div>
                </div>
            </Transition>
            <Transition show={showLanguageModal}>
                <div className="fixed top-0 left-0 w-full h-full p-5 border border-light/10 overflow-y-auto z-[1000] bg-secondarySidebar text-base flex flex-col text-light">
                    <div className="header relative pr-2.5 pb-5 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16.003"
                            height="12.059"
                            viewBox="0 0 16.003 12.059"
                            className="inline-block mr-4"
                            onClick={handleCloseSelectLanguage}
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
                        <h4 className="text-[1.5rem] text-light mb-2 font-bold">{t("language")}</h4>
                    </div>
                    <div className="flex-1 flex flex-col">
                        {localeList.map((_locale) => (
                            <div
                                key={_locale.locale}
                                className="py-5 text-light flex gap-2 items-center border-b border-text text-base"
                                onClick={handleChangeLocale(_locale.locale)}
                            >
                                <div
                                    className={clsx(
                                        "border border-text w-[23px] h-[23px] text-light min-w-5 relative rounded-full mr-4",
                                        {
                                            "after:bg-light after:absolute after:top-[3px] after:right-[3px] after:bottom-[3px] after:left-[3px] after:rounded-full after:content-['']":
                                                _locale.locale === locale,
                                        },
                                    )}
                                ></div>
                                <img src={_locale.icon} alt={_locale.name} width={24} height={18} className="" />
                                <span className="flex-1 text-left">{_locale.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default MobileSettingModal;
