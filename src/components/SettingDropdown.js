import { Menu, Transition } from "@headlessui/react";
import LocaleSelect from "@/components/LocaleSelect";
import ToggleButton from "@/components/inputs/ToggleButton";
import { useContext } from "react";
import UIContext from "@/contexts/UIContext";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import { useTranslation } from "react-i18next";

const SettingDropdown = () => {
    const {t }= useTranslation();

    const { hideBalances, setHideBalances } = useContext(UIContext);

    const [enableSound, setEnableSound] = useLocalStorageState("SoundEnabled", true);

    const handleChangeBalanceHide = () => {
        setHideBalances(!hideBalances);
    };

    const handleChangeSound = () => {
        setEnableSound(!enableSound);
    };

    return (
        <Menu>
            <Menu.Button className="flex flex-col items-center text-center font-normal">
                <span className="text-center text-light">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17.281"
                        height="17.283"
                        viewBox="0 0 17.281 17.283"
                        className="stroke-light"
                    >
                        <g id="gear" transform="translate(-2.004 -1.995)">
                            <path
                                id="Path_30727"
                                data-name="Path 30727"
                                d="M18.111,9.362,16.772,9.25a6.245,6.245,0,0,0-.814-1.96l.871-1.03a1.28,1.28,0,0,0-1.8-1.8L14,5.326a6.234,6.234,0,0,0-1.963-.816L11.92,3.17a1.28,1.28,0,0,0-2.552,0L9.256,4.51a6.245,6.245,0,0,0-1.96.814l-1.03-.868a1.28,1.28,0,0,0-1.8,1.8l.871,1.029a6.239,6.239,0,0,0-.816,1.961l-1.341.112a1.281,1.281,0,0,0,0,2.552l1.341.112a6.238,6.238,0,0,0,.814,1.96l-.871,1.03a1.28,1.28,0,0,0,1.8,1.8L7.3,15.95a6.239,6.239,0,0,0,1.961.816l.112,1.341a1.281,1.281,0,0,0,2.552,0l.112-1.341a6.238,6.238,0,0,0,1.96-.814l1.03.871a1.28,1.28,0,0,0,1.8-1.8l-.871-1.029a6.233,6.233,0,0,0,.816-1.961l1.341-.112a1.281,1.281,0,0,0,0-2.552Zm-7.467,4.445a3.168,3.168,0,1,1,3.168-3.168A3.168,3.168,0,0,1,10.644,13.806Z"
                                fill="currentColor"
                            ></path>
                        </g>
                    </svg>{" "}
                </span>
                <span>{t("settings")}</span>
            </Menu.Button>
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute top-0 right-0 z-[100]">
                    <div className="absolute right-2 top-full translate-y-2 z-[1000] float-left min-w-[10rem] text-base mt-[0.125rem] min-[1025px]:px-[15px] border border-light/10 rounded-[10px] bg-secondary-600 flex flex-col w-[390px] h-[235px]">
                        <div>
                            <div className="border-b border-light/10 p-[15px] flex items-center mb-4">
                                <div className="text-[15px] flex-1 flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        className="mr-[5px]"
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
                                            ></circle>
                                        </g>
                                    </svg>
                                    <span className="align-middle text-light">{t("language")}</span>
                                </div>
                                <div className="flex-[.05] basis-[135px] justify-end">
                                    <LocaleSelect inSetting />
                                </div>
                            </div>
                            <div className="p-[15px] flex items-center text-base mb-4">
                                <div className="text-[15px] flex-1 flex items-center">
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
                                            <g id="Path_30736" fill="#ACADAF">
                                                <path
                                                    d="M13.7,19.3c-0.2,0-0.4-0.1-0.6-0.2l-6.9-4.6H0.5c-0.6,0-1-0.4-1-1V6.3c0-0.6,0.4-1,1-1h5.7l6.9-4.6
                                        c0.3-0.2,0.7-0.2,1,0c0.3,0.2,0.5,0.5,0.5,0.9v16.8c0,0.4-0.2,0.7-0.5,0.9C14,19.3,13.9,19.3,13.7,19.3z M1.5,12.5h5
                                        c0.2,0,0.4,0.1,0.6,0.2l5.6,3.8V3.4L7.1,7.1C6.9,7.2,6.7,7.3,6.5,7.3h-5V12.5z"
                                                    className="st0"
                                                ></path>
                                            </g>
                                            <g id="Path_30737" fill="#ACADAF">
                                                <path
                                                    d="M16.8,15.1c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4c0,0,0,0,0,0c1.9-2,1.9-5.1-0.1-7
                                        c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0c2.8,2.7,2.8,7.1,0.1,9.9c0,0-0.1,0.1-0.1,0.1C17.2,15,17,15.1,16.8,15.1z"
                                                    className="st0"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="align-middle text-light">{t("sound")}</span>
                                </div>
                                <div className="flex-[.05] basis-[135px] flex items-center justify-end">
                                    <ToggleButton checked={enableSound} onChange={handleChangeSound} />
                                </div>
                            </div>
                            <div className="p-[15px] flex items-center text-base">
                                <div className="text-[15px] flex-1 flex items-center">
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
                                    <span className="align-middle text-light">{t("show_balance")}</span>
                                </div>
                                <div className="flex-[.05] basis-[135px] flex items-center justify-end">
                                    <ToggleButton checked={!hideBalances} onChange={handleChangeBalanceHide} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default SettingDropdown;
