import PanelHeader from "@/app/[locale]/(panel)/_partials/PanelHeader";
import BalanceProvider from "@/providers/BalanceProvider";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/navigation";
import useAuth from "@/hooks/useAuth";
import Sidebar from "@/app/[locale]/(panel)/_partials/Sidebar";
import { useDesktop } from "@/hooks/responsives";
import HttpClient from "@/services/HttpClient";
import SocketClient from "@/services/SocketClient";
import SocketContext from "@/contexts/SocketContext";
import UIContext from "@/contexts/UIContext";
import clsx from "clsx";
import useLocalStorageState from "@/hooks/useLocalStorageState";
import ExchangeModal from "@/components/modals/balance/ExchangeModal";
import LeftSidebar from "@/app/[locale]/(panel)/_partials/LeftSidebar";
import QuickDepositMobileModal from "@/components/modals/QuickDepositMobileModal";
import JackpotModal from "@/components/modals/JackpotModal";

const PanelLayout = ({ children }) => {
    const router = useRouter();
    const [auth, setAuth] = useAuth();
    const pathname = usePathname();

    const isDesktop = useDesktop();

    const [socketInitialized, setSocketInitialized] = useState(false);
    const [historyOpened, setHistoryOpened] = useState(false);
    const [totalOpenHistory, setTotalOpenHistory] = useState(0);

    const [hideBalances, setHideBalances] = useLocalStorageState("HIDE_BALANCE", false);

    useEffect(() => {
        const token = localStorage.getItem("USER_TOKEN");

        if (!token) {
            router.push("/");
            return;
        }

        HttpClient.instanceClient()
            .get("/api/auth/me/profile")
            .then((res) => {
                SocketClient.getInstance()
                    .connect({
                        uid: res.data.d.uid,
                        ssid: JSON.parse(token).access_token,
                    })
                    .then(() => {
                        setSocketInitialized(true);
                        setAuth({
                            initialized: true,
                            userToken: JSON.parse(token),
                            user: res.data.d,
                        });
                    });
            })
            .catch((err) => {
                localStorage.removeItem("USER_TOKEN");

                router.push("/");
            });
    }, [setAuth]);

    if (!auth.initialized) {
        return null;
    }

    return (
        <UIContext.Provider
            value={{
                historyOpened,
                setHistoryOpened,
                totalOpenHistory,
                setTotalOpenHistory,
                hideBalances,
                setHideBalances,
            }}
        >
            <SocketContext.Provider value={{ socketInitialized }}>
                <BalanceProvider>
                    <div className="wrapper relative">
                        <div className="top-space h-[65px]"></div>
                        <PanelHeader />
                        <main
                            className={clsx("lg:border-t-2 lg:border-t-black flex", {
                                "page-index-height": pathname === "/index",
                                "min-h-[calc(100vh-65px)]": pathname !== "/index",
                            })}
                        >
                            {isDesktop && <Sidebar />}
                            <LeftSidebar />
                            <div className="flex-1">{children}</div>
                            <ExchangeModal />
                        </main>
                    </div>
                    <QuickDepositMobileModal />
                    <JackpotModal />
                </BalanceProvider>
            </SocketContext.Provider>
        </UIContext.Provider>
    );
};

export default PanelLayout;
