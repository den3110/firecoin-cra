import { useTranslations } from "next-intl";
import iconUsdt from "@/assets/images/icon-usdt.svg";
import iconDeposit from "@/assets/images/icon-deposit.svg";
import iconWithdraw from "@/assets/images/icon-withdraw.svg";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import Formatter from "@/utils/Formatter";
import HideBalance from "@/components/HideBalance";
import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import BalanceHistory from "@/components/BalanceHistory";
import { useDispatch } from "react-redux";
import { showBalanceModal } from "@/store/balanceReducer";
import CommissionHistory from "@/components/CommissionHistory";
import { useDesktop } from "@/hooks/responsives";
import { Menu } from "@headlessui/react";
import BalanceHistoryDrawer from "@/components/BalanceHistoryDrawer";
import HideInfo from "@/components/HideInfo";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";

const BalancePage = () => {
    const t = useTranslations();
    const isDesktop = useDesktop();

    const { data, refetch } = useSpotBalancesQuery();

    const [selectedTab, setSelectedTab] = useState("USDT");

    const dispatch = useDispatch();

    const handleOpenBalanceModal = (type) => {
        return (e) => {
            e.preventDefault();

            dispatch(showBalanceModal(type));
        };
    };

    const handleSelectTab = (tab, close = null) => {
        return (e) => {
            e.preventDefault();

            setSelectedTab(tab);

            close?.();
        };
    };

    const { socketInitialized } = useContext(SocketContext);

    // Handle sockets
    useEffect(() => {
        if (!socketInitialized || !SocketClient.getInstance().socket()) {
            console.log("Socket not connected");
            return;
        }

        SocketClient.getInstance()
            .socket()
            .on("SYSTEM_MESSAGE", () => {
                refetch().then();
            });
    }, [socketInitialized]);

    return (
        <>
            <div className="custom-container mb-[48px]">
                <div className="flex flex-wrap">
                    <div className="flex justify-between items-center">
                        <h4 className="invisible text-[1.5rem] mb-2 font-bold leading-[1.2]">
                            <b>{t("main_balance")}</b>
                        </h4>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[30px]">
                        <div className="mb-4 rounded-[20px] border border-custom-border bg-secondarySidebar">
                            <div className="border-b border-custom-border p-4 flex content-center">
                                <div className="flex items-center basis-[160px]">
                                    <div className="flex items-center">
                                        <span className="mr-2">
                                            <img src={iconUsdt} alt="icon usdt" width={44} height="auto" />
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="uppercase font-bold">USDT</span>
                                        <span className="text-[#778e9f] capitalize">Tether</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col items-end">
                                        <span className="font-bold">
                                            <HideBalance>
                                                {Formatter.formatNumber(data?.d.usdtAvailableBalance || 0)}
                                            </HideBalance>
                                        </span>
                                        <span className="text-[#778e9f]">
                                            <HideBalance>
                                                ~{Formatter.formatCurrency(data?.d.usdtAvailableBalance || 0)}
                                            </HideBalance>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 flex">
                                <div className="flex-1">
                                    <img
                                        src={iconDeposit}
                                        alt="icon-deposit"
                                        className="inline w-[18px] h-auto align-middle mr-1"
                                    />
                                    <a
                                        href="#"
                                        className="text-xs align-middle"
                                        onClick={handleOpenBalanceModal("deposit")}
                                    >
                                        {t("Deposit")}
                                    </a>
                                </div>
                                <div className="flex-1">
                                    <img
                                        src={iconWithdraw}
                                        alt="icon withdraw"
                                        className="inline w-[18px] h-auto align-middle mr-1"
                                    />
                                    <a
                                        href="#"
                                        className="text-xs align-middle"
                                        onClick={handleOpenBalanceModal("withdraw")}
                                    >
                                        {t("withdraw")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HideInfo placehodler="">
                <div className="custom-container">
                    <h4 className="text-[24px] mb-4 leading-[1.2]">
                        <b>{t("transaction_history")}</b>
                    </h4>
                    {isDesktop ? (
                        <div>
                            <ul className="nav nav-pills nav-wallet bg-secondarySidebar">
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className={clsx("nav-link", { active: selectedTab === "USDT" })}
                                        onClick={handleSelectTab("USDT")}
                                    >
                                        USDT
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className={clsx("nav-link", { active: selectedTab === "commisison" })}
                                        onClick={handleSelectTab("commisison")}
                                    >
                                        {t("commission")}
                                    </a>
                                </li>
                            </ul>
                            {selectedTab === "USDT" ? <BalanceHistory /> : <CommissionHistory />}
                        </div>
                    ) : (
                        <>
                            <div className="border-custom-border rounded-t-[20px] p-0 border-none mb-2.5">
                                <Menu>
                                    {({ close }) => (
                                        <div className="flex flex-wrap pl-0 mb-0 list-none relative">
                                            <Menu.Button
                                                as="button"
                                                className={clsx(
                                                    "bg-custom-border border-custom-border cursor-pointer border text-light items-center whitespace-nowrap text-center align-middle select-none px-3 py-[.375rem] text-base leading-[1.5] rounded flex items-center",
                                                    "after:inline-block after:ml-[0.255rem] after:align-[.255em] after:content-[''] after:border-t-[.3em] after:border-r-[.3em] after:border-b-0 after:border-l-[.3em] after:border-x-transparent",
                                                )}
                                            >
                                                <span
                                                    className={clsx(
                                                        "inline-block bg-no-repeat bg-[length:100%] bg-[50%_center] mr-2 w-[16px] h-[16px]",
                                                        {
                                                            "icon-usdt-rounded-mobile": selectedTab === "USDT",
                                                            "icon-win-coms-mobile": selectedTab === "commisison",
                                                        },
                                                    )}
                                                ></span>
                                                <span className="inline-block mr-1 font-normal">
                                                    {selectedTab === "USDT" ? "USDT" : t("commission")}
                                                </span>
                                            </Menu.Button>
                                            <Menu.Items
                                                as="div"
                                                className="absolute top-0 left-0 will-change-transform border border-custom-border -translate-y-[93px] bg-secondarySidebar z-[1000] float-left min-w-[10rem] py-2 my-0.5 text-base text-[#212529] text-left rounded"
                                            >
                                                <Menu.Item
                                                    as="span"
                                                    className="flex items-center py-2.5 leading-[30px] text-light w-full px-6 clear-both bg-transparent border-0"
                                                    onClick={handleSelectTab("USDT", close)}
                                                >
                                                    <span className="inline-block icon-usdt-rounded-mobile bg-no-repeat bg-[length:100%] bg-[50%_center] mr-2 w-[16px] h-[16px]"></span>
                                                    <span className="inline-block w-[16px] h-[16px] leading-[16px]">
                                                        USDT
                                                    </span>
                                                </Menu.Item>
                                                <Menu.Item
                                                    as="span"
                                                    className="flex items-center py-2.5 leading-[30px] text-light w-full px-6 clear-both bg-transparent border-0"
                                                    onClick={handleSelectTab("commisison", close)}
                                                >
                                                    <span className="inline-block icon-win-coms-mobile bg-no-repeat bg-[length:100%] bg-[50%_center] mr-2 w-[16px] h-[16px]"></span>
                                                    <span className="inline-block w-[16px] h-[16px] leading-[16px] whitespace-nowrap">
                                                        {t("commission")}
                                                    </span>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </div>
                                    )}
                                </Menu>
                            </div>
                            {selectedTab === "USDT" ? <BalanceHistory /> : <CommissionHistory />}

                            <BalanceHistoryDrawer />
                        </>
                    )}
                </div>
            </HideInfo>
        </>
    );
};

export default BalancePage;
