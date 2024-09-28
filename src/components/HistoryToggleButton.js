import { useCallback, useContext } from "react";
import UIContext from "@/contexts/UIContext";

const HistoryToggleButton = () => {
    const { historyOpened, setHistoryOpened, totalOpenHistory, setTotalOpenHistory } = useContext(UIContext);

    const handleToggle = useCallback(() => {
        if (historyOpened) {
            setTotalOpenHistory(0);
        }

        setHistoryOpened(!historyOpened);
    }, [historyOpened, setHistoryOpened, setTotalOpenHistory]);

    return (
        <button
            className="bg-custom-toggle-button rounded-[6px] w-[39px] h-[39px] flex justify-center items-center"
            onClick={handleToggle}
        >
            {historyOpened ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.949"
                    height="14.434"
                    viewBox="0 0 18.949 14.434"
                    className="iconOpen"
                >
                    <g id="menu" transform="translate(0 -61)">
                        <g id="Group_13130" data-name="Group 13130" transform="translate(4.441 61)">
                            <g id="Group_13129" data-name="Group 13129">
                                <path
                                    id="Path_29628"
                                    data-name="Path 29628"
                                    d="M132.842,61H121.665a1.665,1.665,0,0,0,0,3.331h11.177a1.665,1.665,0,0,0,0-3.331Z"
                                    transform="translate(-120 -61)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13132" data-name="Group 13132" transform="translate(4.441 66.551)">
                            <g id="Group_13131" data-name="Group 13131">
                                <path
                                    id="Path_29629"
                                    data-name="Path 29629"
                                    d="M132.842,211H121.665a1.665,1.665,0,0,0,0,3.331h11.177a1.665,1.665,0,0,0,0-3.331Z"
                                    transform="translate(-120 -211)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13134" data-name="Group 13134" transform="translate(4.441 72.103)">
                            <g id="Group_13133" data-name="Group 13133">
                                <path
                                    id="Path_29630"
                                    data-name="Path 29630"
                                    d="M132.842,361H121.665a1.665,1.665,0,0,0,0,3.331h11.177a1.665,1.665,0,1,0,0-3.331Z"
                                    transform="translate(-120 -361)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13136" data-name="Group 13136" transform="translate(0 61)">
                            <g id="Group_13135" data-name="Group 13135">
                                <path
                                    id="Path_29631"
                                    data-name="Path 29631"
                                    d="M1.665,61a1.665,1.665,0,1,0,1.665,1.665A1.667,1.667,0,0,0,1.665,61Z"
                                    transform="translate(0 -61)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13138" data-name="Group 13138" transform="translate(0 66.551)">
                            <g id="Group_13137" data-name="Group 13137">
                                <path
                                    id="Path_29632"
                                    data-name="Path 29632"
                                    d="M1.665,211a1.665,1.665,0,1,0,1.665,1.665A1.667,1.667,0,0,0,1.665,211Z"
                                    transform="translate(0 -211)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13140" data-name="Group 13140" transform="translate(0 72.103)">
                            <g id="Group_13139" data-name="Group 13139">
                                <path
                                    id="Path_29633"
                                    data-name="Path 29633"
                                    d="M1.665,361a1.665,1.665,0,1,0,1.665,1.665A1.667,1.667,0,0,0,1.665,361Z"
                                    transform="translate(0 -361)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                    </g>
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="3.331"
                    height="14.434"
                    viewBox="0 0 3.331 14.434"
                    className="iconClose"
                >
                    <g id="menu" transform="translate(0 -61)">
                        <g id="Group_13136" data-name="Group 13136" transform="translate(0 61)">
                            <g id="Group_13135" data-name="Group 13135">
                                <path
                                    id="Path_29631"
                                    data-name="Path 29631"
                                    d="M1.665,61a1.665,1.665,0,1,0,1.665,1.665A1.667,1.667,0,0,0,1.665,61Z"
                                    transform="translate(0 -61)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13138" data-name="Group 13138" transform="translate(0 66.551)">
                            <g id="Group_13137" data-name="Group 13137">
                                <path
                                    id="Path_29632"
                                    data-name="Path 29632"
                                    d="M1.665,211a1.665,1.665,0,1,0,1.665,1.665A1.667,1.667,0,0,0,1.665,211Z"
                                    transform="translate(0 -211)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                        <g id="Group_13140" data-name="Group 13140" transform="translate(0 72.103)">
                            <g id="Group_13139" data-name="Group 13139">
                                <path
                                    id="Path_29633"
                                    data-name="Path 29633"
                                    d="M1.665,361a1.665,1.665,0,1,0,1.665,1.665A1.667,1.667,0,0,0,1.665,361Z"
                                    transform="translate(0 -361)"
                                    fill="#fff"
                                ></path>
                            </g>
                        </g>
                    </g>
                </svg>
            )}
            {totalOpenHistory > 0 && <span className="total-count">{totalOpenHistory}</span>}
        </button>
    );
};

export default HistoryToggleButton;
