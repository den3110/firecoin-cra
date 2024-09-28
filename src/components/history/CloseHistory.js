import { useCallback, useContext, useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import HistoryItem from "@/components/history/HistoryItem";
import BalanceContext from "@/contexts/BalanceContext";
import { useRouter } from "@/navigation";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import Loading from "@/components/Loading";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";
import { useDispatch } from "react-redux";
import { setOrderModalOpen } from "@/store/generalReducer";
import clsx from "clsx";

const CloseHistory = () => {
    const {t } = useTranslation();
    const [data, setData] = useState();
    const [selectedAccount] = useContext(BalanceContext);

    const dispatch = useDispatch();

    const { socketInitialized } = useContext(SocketContext);

    const router = useRouter();

    const loadData = useCallback(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/transaction/close", {
                params: {
                    page: 1,
                    size: 10,
                    betAccountType: selectedAccount?.toUpperCase() || "LIVE",
                },
            })
            .then((res) => res.data)
            .then((_data) => {
                setData(_data.d);
            });
    }, [selectedAccount]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (!socketInitialized) {
            return;
        }

        SocketClient.getInstance().socket().on("BO_RESULT", loadData);

        return () => {
            SocketClient.getInstance().socket().off("BO_RESULT", loadData);
        };
    }, [loadData, socketInitialized]);

    const days = [];

    const handleSeeMore = () => {
        router.push("/user/trade-history");
        dispatch(setOrderModalOpen(false));
    };

    return (
        <div className={clsx("overflow-auto", data?.c?.length > 0 ? "min-h-[min-content]" : "h-full")}>
            <Loading loading={!data} className="h-full overflow-y-hidden">
                {(!data?.c || data.c.length <= 0) && (
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
                        <p className="text-center my-4 text-sm sm:text-[8px] lg:text-sm">
                            {t("you_have_not_made_any_closed_order")}
                        </p>
                    </div>
                )}
                <div className="flex flex-col gap-y-2 pt-2">
                    {data?.c.map((transaction) => {
                        const day = dayjs(transaction.createdDatetime).format("MM/DD/YYYY");
                        if (!days.includes(day)) {
                            days.push(day);
                            return (
                                <>
                                    <p className="text-light text-base mt-4 lg:mt-1 font-bold lg:font-normal" key={day}>
                                        {day}
                                    </p>
                                    <HistoryItem key={transaction.transactionId} {...transaction} />
                                </>
                            );
                        }

                        return <HistoryItem key={transaction.transactionId} {...transaction} />;
                    })}
                    {data?.t > data?.s && (
                        <div>
                            <a
                                href="#"
                                className="block text-light font-bold w-full border border-light/20 mt-4 mb-2 leading-[1.5] text-base px-[0.375rem] py-1.5 rounded text-center hover:text-light"
                                onClick={handleSeeMore}
                            >
                                {t("see_more")}
                            </a>
                        </div>
                    )}
                </div>
            </Loading>
        </div>
    );
};

export default CloseHistory;
