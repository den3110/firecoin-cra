import { useCallback, useContext, useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import HistoryItem from "@/components/history/HistoryItem";
import BalanceContext from "@/contexts/BalanceContext";
import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";
import OpenHistoryContext from "@/contexts/OpenHistoryContext";
import UIContext from "@/contexts/UIContext";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";

const OpenHistory = () => {
    const {t } = useTranslation();
    const { openHistory, setOpenHistory } = useContext(OpenHistoryContext);
    const [selectedAccount] = useContext(BalanceContext);
    const [loading, setLoading] = useState(false);
    const { setTotalOpenHistory } = useContext(UIContext);
    const { socketInitialized } = useContext(SocketContext);

    const loadData = useCallback(() => {
        setLoading(true);
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/transaction/open", {
                params: {
                    page: 1,
                    size: 10,
                    betAccountType: selectedAccount?.toUpperCase() || "LIVE",
                },
            })
            .then((res) => res.data)
            .then((_data) => {
                setOpenHistory([..._data.d.c]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedAccount, setOpenHistory]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        setTotalOpenHistory(openHistory.length);
    }, [openHistory, setTotalOpenHistory]);

    useEffect(() => {
        if (!socketInitialized) {
            return;
        }

        SocketClient.getInstance().socket().on("BO_RESULT", loadData);

        return () => {
            SocketClient.getInstance().socket().off("BO_RESULT", loadData);
        };
    }, [loadData, socketInitialized]);

    return (
        <div className="h-full overflow-auto">
            <Loading loading={loading} className="h-full">
                {openHistory.length <= 0 ? (
                    <div className="flex flex-col h-full justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="82.083"
                            height="82.104"
                            viewBox="0 0 82.083 82.104"
                        >
                            <g id="conversion" transform="translate(82.091 41.045) rotate(135)" opacity="0.2">
                                <path
                                    id="Path_26243"
                                    data-name="Path 26243"
                                    d="M54.414,25.393H3.628A3.427,3.427,0,0,1,0,21.766a3.427,3.427,0,0,1,3.628-3.628h42.08L33.737,6.167a3.507,3.507,0,0,1,0-5.079,3.507,3.507,0,0,1,5.079,0L56.953,19.226a3.311,3.311,0,0,1,.726,3.99A3.486,3.486,0,0,1,54.414,25.393Z"
                                    transform="translate(0.011 0)"
                                    fill="#fff"
                                ></path>
                                <path
                                    id="Path_26244"
                                    data-name="Path 26244"
                                    d="M21.776,34.393A3.293,3.293,0,0,1,19.237,33.3L1.1,15.167a3.311,3.311,0,0,1-.726-3.99A3.486,3.486,0,0,1,3.638,9H54.425a3.427,3.427,0,0,1,3.628,3.628,3.427,3.427,0,0,1-3.628,3.628H12.345L24.316,28.226a3.507,3.507,0,0,1,0,5.079A3.293,3.293,0,0,1,21.776,34.393Z"
                                    transform="translate(0 23.649)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </svg>
                        <p className="text-center my-4 text-sm sm:text-[8px] lg:text-sm">{t("you_have_not_made_any_open_order")}</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-2 pt-2">
                        {openHistory.map((transaction) => {
                            return (
                                <HistoryItem
                                    key={transaction.transactionId || "datetime-" + transaction.createdDatetime}
                                    isOpen
                                    {...transaction}
                                />
                            );
                        })}
                    </div>
                )}
            </Loading>
        </div>
    );
};

export default OpenHistory;
