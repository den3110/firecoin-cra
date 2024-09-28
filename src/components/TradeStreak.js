import "./TradeStreak.scss";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import HttpClient from "@/services/HttpClient";
import clsx from "clsx";
import { useRouter } from "@/navigation";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";
import useJackpotCommunityFundQuery from "@/hooks/queries/useJackpotCommunityFundQuery";
import { useDispatch } from "react-redux";
import { setJackpot } from "@/store/jackpotReducer";

const TradeStreak = () => {
    const router = useRouter();

    const { socketInitialized } = useContext(SocketContext);

    const [maxStreak, setMaxStreak] = useState(9);
    const [streak, setStreak] = useState(0);

    const dispatch = useDispatch();

    const dashOffset = useMemo(() => {
        return 95.50441666912971 * (1 - streak / maxStreak);
    }, [maxStreak, streak]);

    const { refetch } = useJackpotCommunityFundQuery();

    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/events/community-jackpot/jackpot-scores")
            .then((res) => res.data)
            .then((data) => {
                setStreak(data.d.score);
                setMaxStreak(data.d.streak);
            });
    }, []);

    const handleJackpotResult = useCallback(
        (data) => {
            // {"UserId":"1699786154803","Session":"1494123","cjScore":1,"isJackpot":0,"prize":0,"type":"WIN"}
            refetch().then();

            setStreak(data.cjScore);

            if (data.cjScore >= 9 && data.isJackpot == 1) {
                dispatch(setJackpot({ ...data }));

                setTimeout(() => {
                    dispatch(setJackpot(null));
                }, 5000);
            }
        },
        [dispatch, refetch],
    );

    useEffect(() => {
        if (!socketInitialized || !SocketClient.getInstance().socket()) {
            console.log("Socket not connected");
            return;
        }

        SocketClient.getInstance().socket().emit("JACKPOT_RESULT_SUBSCRIBE");
        SocketClient.getInstance().socket().on("JACKPOT_RESULT", handleJackpotResult);

        return () => {
            SocketClient.getInstance().socket().emit("JACKPOT_RESULT_UNSUBSCRIBE");
            SocketClient.getInstance().socket().off(handleJackpotResult);
        };
    }, [handleJackpotResult, socketInitialized]);

    const handleClick = () => {
        router.push("/streak-challenge");
    };

    return (
        <div
            className={clsx({
                hidden: streak <= 0,
            })}
        >
            <div className="streak cursor-pointer" onClick={handleClick}>
                <span className="streak-title text-light">streak</span>
                <div className="ep-container w-[32px] h-[32px]">
                    <div className="ep-content">
                        <div className="ep-svg-container">
                            <svg
                                width="32"
                                height="32"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                className="-rotate-90"
                            >
                                <circle
                                    r="15.2"
                                    cx="16"
                                    cy="16"
                                    fill="#06354C"
                                    stroke="#617F8D"
                                    strokeWidth="1.6"
                                    strokeDashoffset="0"
                                ></circle>
                                <circle
                                    r="15.2"
                                    cx="16"
                                    cy="16"
                                    stroke="#2AE6D8"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeDashoffset={dashOffset}
                                    fill="transparent"
                                    strokeDasharray="95.50441666912971px"
                                    className="transition-[stroke-dashoffset] duration-1000 ease-in-out"
                                ></circle>
                            </svg>
                        </div>
                        <div className="ep-legend--container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="ep-legend--value">
                                <span className="streak-value">
                                    x<span>{streak}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeStreak;
