import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PriceDataContext from "@/contexts/PriceDataContext";
import { useSmallMobile } from "@/hooks/responsives";
import clsx from "clsx";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";
import "./LastResult.scss";

const LastResult = () => {
    const priceData = useContext(PriceDataContext);
    const { socketInitialized } = useContext(SocketContext);

    const [listData, setListData] = useState([]);

    const isSmallMobile = useSmallMobile();

    const [transformedPriceData, setTransformedPriceData] = useState([]);

    const handleSocketData = useCallback((data) => {
        // add to transformedPriceData
        setTransformedPriceData((prev) => {
            const newArr = [
                ...prev,
                {
                    side: data[0].finalSide,
                    ssid: data[0].session,
                    open: 0,
                    close: 0,
                },
            ];

            newArr.shift();

            return newArr;
        });
    }, []);

    useEffect(() => {
        if (!socketInitialized) {
            return;
        }

        SocketClient.getInstance().socket().emit("SOCKET_BO_LAST_RESULT_SUBSCRIBE");
        SocketClient.getInstance().socket().on("SOCKET_BO_LAST_RESULT", handleSocketData);

        return () => {
            SocketClient.getInstance().socket().emit("SOCKET_BO_LAST_RESULT_UNSUBSCRIBE");
            SocketClient.getInstance().socket().off("SOCKET_BO_LAST_RESULT", handleSocketData);
        };
    }, [handleSocketData, socketInitialized]);

    useEffect(() => {
        setTransformedPriceData(
            priceData.map((item) => {
                return {
                    ssid: item[9],
                    open: item[1],
                    close: item[4],
                    side: item[1] === item[4] ? "NEUTRAL" : item[1] > item[4] ? "DOWN" : "UP",
                };
            }),
        );
    }, [priceData]);

    useEffect(() => {
        let t = null;
        for (let a = 0; a < transformedPriceData.length; a++) {
            if (transformedPriceData[a].ssid % 20 !== 0 || t) {
                continue;
            }

            t = a;
        }

        const n = transformedPriceData.slice(t);
        const i = [];
        let o = [];

        for (let r = 0; r < n.length; r++) {
            if (o.length >= 20) {
                i.push(o);
                o = [];
            }

            o.push(n[r]);

            if (r === n.length - 1) {
                i.push(o);
            }
        }

        if (isSmallMobile && i.length === 2) {
            const s = [];

            for (let _ = 0; _ < 20; _++) {
                s.push({
                    ssid: null,
                    open: null,
                    close: null,
                    side: null,
                });
            }

            i.push(s);
        } else if (!isSmallMobile && i.length === 4) {
            const c = [];

            for (let l = 0; l < 20; l++) {
                c.push({
                    ssid: null,
                    open: null,
                    close: null,
                    side: null,
                });
            }

            i.push(c);
        }

        if (i.length < 5) {
            for (let a = 0; a < 5 - i.length; a++) {
                const s = [];

                for (let _ = 0; _ < 20; _++) {
                    s.push({
                        ssid: null,
                        open: null,
                        close: null,
                        side: null,
                    });
                }

                i.push(s);
            }
        }

        setListData(i);
    }, [isSmallMobile, priceData, transformedPriceData]);

    const listDataToDraw = useMemo(() => {
        // fill empty data for row that has less than 20 items
        return listData.map((item) => {
            if (item.length < 20) {
                const emptyData = [];

                for (let i = 0; i < 20 - item.length; i++) {
                    emptyData.push({
                        ssid: null,
                        open: null,
                        close: null,
                        side: null,
                    });
                }

                return [...item, ...emptyData];
            }

            return item;
        });
    }, [listData]);

    const count = useMemo(() => {
        if (!listData.length) {
            return {
                up: 0,
                down: 0,
            };
        }

        let up = 0;
        let down = 0;

        for (let i = 0; i < listData.length; i++) {
            if (isSmallMobile && i < 2) {
                continue;
            }

            for (let j = 0; j < listData[i].length; j++) {
                if (listData[i][j].side === "UP") {
                    up++;
                } else if (listData[i][j].side === "DOWN") {
                    down++;
                }
            }
        }

        return {
            up,
            down,
        };
    }, [isSmallMobile, listData]);

    return (
        <div>
            <div className="absolute flex text-light top-1 lg:top-0 right-0 px-0 lg:px-8">
                <div className="bg-light/20 flex items-center font-bold text-xs lg:text-base px-2 py-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25.413" height="12.844" viewBox="0 0 25.413 12.844">
                        <g id="trend-up" transform="translate(4.658 -8)">
                            <path
                                id="Path_26233"
                                data-name="Path 26233"
                                d="M25.755,8H16.122l4.249,4.249-6.623,6.623L7.893,12.283a.8.8,0,0,0-1.129-.071L.342,17.831,1.4,19.04l5.822-5.095,5.893,6.629a.806.806,0,0,0,.576.27h.023a.8.8,0,0,0,.568-.235l7.225-7.225,4.249,4.249Z"
                                transform="translate(-5)"
                                className="fill-up"
                            ></path>
                        </g>
                    </svg>
                    <span className="ml-1 lg:ml-4">{count.up || 0}</span>
                </div>
                <div className="bg-light/20 flex items-center font-bold text-xs lg:text-base px-2 py-1 rounded ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23.587" height="11.921" viewBox="0 0 23.587 11.921">
                        <g id="trend-down" transform="translate(-0.342 -8)">
                            <path
                                id="Path_26234"
                                data-name="Path 26234"
                                d="M23.929,19.921H14.988l3.944-3.944L12.785,9.831,7.35,15.945a.744.744,0,0,1-1.048.066L.342,10.8l.981-1.122,5.4,4.729L12.2,8.25A.747.747,0,0,1,12.731,8h.022a.743.743,0,0,1,.527.218l6.705,6.705,3.944-3.944Z"
                                fill="#FA4B62"
                                className="fill-down"
                            ></path>
                        </g>
                    </svg>
                    <span className="ml-1 lg:ml-4">{count.down || 0}</span>
                </div>
            </div>
            <div className="flex justify-around mt-1 sm:mt-7">
                {listDataToDraw.map((item, index) => {
                    if (isSmallMobile && index < 2) {
                        return null;
                    }

                    return (
                        <div className="grid grid-rows-4 grid-flow-col gap-0.5 sm:gap-[3px]" key={index}>
                            {item.map((item2, index2) => {
                                return (
                                    <div
                                        key={index2}
                                        className={clsx("w-4 h-4 sm:w-6 sm:h-6 rounded-full", {
                                            "bg-up": item2.side === "UP",
                                            "bg-down": item2.side === "DOWN",
                                            "bg-light": item2.side === "NEUTRAL",
                                            "bg-secondary-400": item2.side === null,
                                        })}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LastResult;
