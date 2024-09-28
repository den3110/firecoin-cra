"use client";

import { Menu, Transition } from "@headlessui/react";
import Formatter from "@/utils/Formatter";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExchangeButton from "@/components/inputs/ExchangeButton";
import BalanceContext from "@/contexts/BalanceContext";
import { useContext, useEffect, useRef } from "react";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import BaseRadioInput from "@/components/inputs/BaseRadioInput";
import useRefillDemoBalanceMutation from "@/hooks/mutations/useRefillDemoBalanceMutation";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const BalanceDropdown = () => {
    const {t }= useTranslation();
    const [balance, setBalance] = useContext(BalanceContext);
    const { data, isLoading } = useSpotBalancesQuery();
    const { enqueueSnackbar } = useSnackbar();


    const handleResetDemoSuccess = (data) => {
       if(!data.ok){
        enqueueSnackbar(t(data.d?.err_code) , {variant : 'error'})
       }
    };

    const handleResetDemoError = (error) => {
    };

    const { mutate: refill } = useRefillDemoBalanceMutation(handleResetDemoSuccess,handleResetDemoError);

    const menuButtonRef = useRef();

    const closeMenu = () => {
        menuButtonRef.current?.click();
    };
    const handleBalanceChange = (value) => {
        localStorage.setItem('BO_BALANCE_TYPE', value)
        setBalance(value);
        closeMenu();
    };

  

    const resetDemo = () => {            
        refill();
        closeMenu();
    };

    useEffect(() => {
        // console.log(data);
    }, [data]);

    return (
        <div className="relative">
            <Menu>
                <Menu.Button
                    ref={menuButtonRef}
                    className="text-left text-light bg-custom-balance rounded-[3px] lg:rounded-[10px] px-[15px] lg:pl-[20px] lg:pr-[10px]"
                >
                    <div className="pl-1 py-1 lg:pl-0 lg:py-[3px] flex items-center gap-x-4">
                        <div>
                            <div className="text-[.5rem] leading-normal font-normal mb-1">
                                {balance === "LIVE" ? t("live_account") : t("demo_account")}
                            </div>
                            <div className="font-bold text-base leading-[1.25rem] lg:leading-normal">
                                {Formatter.formatCurrency(
                                    (balance === "LIVE" ? data?.d.availableBalance : data?.d.demoBalance) || 0,
                                    "USD",
                                    true,
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="bg-text rounded-full w-[18px] h-[18px] lg:w-[25px] lg:h-[25px] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 32 32">
                                    <g
                                        strokeLinecap="square"
                                        strokeLinejoin="miter"
                                        strokeWidth="2"
                                        fill="#111111"
                                        stroke="#111111"
                                        className="nc-icon-wrapper"
                                    >
                                        <g className="nc-interact_sorting-o-32">
                                            <path
                                                data-cap="none"
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 10l12 12"
                                                strokeDasharray="16.97 16.97"
                                                strokeDashoffset="0"
                                            ></path>
                                            <path
                                                data-cap="none"
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M28 10L16 22"
                                                strokeDasharray="16.97 16.97"
                                                strokeDashoffset="0"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Menu.Button>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-2 dropdown-items mt-0.5">
                        <div className="flex w-full items-center border-b border-b-light/10">
                            <div
                                className="flex p-3 gap-2 cursor-pointer flex-1"
                                onClick={() => handleBalanceChange("LIVE")}
                            >
                                <div>
                                    <BaseRadioInput
                                        checked={balance === "LIVE"}
                                        onChange={() => handleBalanceChange("LIVE")}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs">{t("live_account")}</div>
                                    <div className="font-bold text-lg text-light">
                                        {data ? Formatter.formatCurrency(data?.d.availableBalance) || 0 : "-"}
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <ExchangeButton closeMenu={closeMenu} />
                            </div>
                        </div>
                        <div className="flex w-full items-center">
                            <div
                                className="flex p-3 gap-2 cursor-pointer flex-1"
                                onClick={() => handleBalanceChange("DEMO")}
                            >
                                <div>
                                    <BaseRadioInput
                                        checked={balance === "DEMO"}
                                        onChange={() => handleBalanceChange("DEMO")}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs">{t("demo_account")}</div>
                                    <div className="font-bold text-lg text-light">
                                        {Formatter.formatCurrency(data?.d.demoBalance || 0)}
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <button className="text-light" onClick={resetDemo}>
                                    <FontAwesomeIcon icon={faRotateRight} className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default BalanceDropdown;
