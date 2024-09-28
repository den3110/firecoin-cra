import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";
import dayjs from "dayjs";
import Formatter from "@/utils/Formatter";
import Pagination from "@/components/Pagination";
import { useDesktop } from "@/hooks/responsives";
import { setClaimPopupModalOpen } from "@/store/generalReducer";
import { useDispatch } from "react-redux";

const LatestWinnerTable = () => {
    const {t } = useTranslation();

    const [selectedTab, setSelectedTab] = useState("winning");

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    const { data, isLoading } = useQuery({
        queryKey: ["latest-winner-table", selectedTab, page],
        queryFn: () => {
            return HttpClient.instanceClient()
                .get(
                    "/api/wallet/binaryoption/events/community-jackpot/" +
                        (selectedTab === "winning" ? "winning-history" : "user-winning-history"),
                    {
                        params: {
                            page,
                            size: 5,
                        },
                    },
                )
                .then((res) => res.data)
                .then((_data) => _data.d);
        },
        keepPreviousData: true,
    });

    const isDesktop = useDesktop();

    useEffect(() => {
        setPage(1);
    }, [selectedTab]);

    const handleClaim = () => {
        dispatch(setClaimPopupModalOpen(true));
    };

    return (
        <>
            <div className="latest-winner-table">
                <ul className="bs-nav bs-nav-tabs">
                    <li className="item">
                        <a
                            className={clsx("bs-nav-link", {
                                active: selectedTab === "winning",
                            })}
                            onClick={() => setSelectedTab("winning")}
                        >
                            {t("winning_history")}
                        </a>
                    </li>
                    <li className="item">
                        <a
                            className={clsx("bs-nav-link", {
                                active: selectedTab === "your",
                            })}
                            onClick={() => setSelectedTab("your")}
                        >
                            {t("your_history")}
                        </a>
                    </li>
                </ul>
                <Loading loading={isLoading} className="latest-winner-list">
                    {selectedTab === "winning" ? (
                        <div className="latest-winner-item latest-winner-item--header">
                            <div className="latest-winner-item-col">{t("time")}</div>
                            <div className="latest-winner-item-col">{t("nickname")}</div>
                            <div className="latest-winner-item-col">Streak</div>
                            <div className="latest-winner-item-col">{t("prize")}</div>
                        </div>
                    ) : (
                        <div className="latest-winner-item latest-winner-item--header">
                            <div className="latest-winner-item-col">{t("time")}</div>
                            <div className="latest-winner-item-col">{t("nickname")}</div>
                            <div className="latest-winner-item-col">{t("prize")}</div>
                            <div className="latest-winner-item-col">{t("status")}</div>
                        </div>
                    )}
                    {data?.c?.map((item, index) => {
                        if (selectedTab === "winning") {
                            if (isDesktop) {
                                return (
                                    <div
                                        key={index}
                                        className={clsx("latest-winner-item", {
                                            mega: item.type === "MEGA",
                                        })}
                                    >
                                        <div className="latest-winner-item-col">
                                            {dayjs(item.time).format("MM/DD/YYYY")}
                                        </div>
                                        <div className="latest-winner-item-col">{item.nickname}</div>
                                        <div
                                            className={clsx("latest-winner-item-col", {
                                                mega: item.type === "MEGA",
                                                win: item.type === "WIN",
                                                lose: item.type === "LOSE",
                                            })}
                                        >
                                            {item.streakname}
                                        </div>
                                        <div className="latest-winner-item-col">
                                            {Formatter.formatCurrency(item.prize)}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={index}
                                    className={clsx("latest-winner-item", {
                                        mega: item.type === "MEGA",
                                        win: item.type === "WIN",
                                        lose: item.type === "LOSE",
                                    })}
                                >
                                    <p
                                        className={clsx("latest-winner-item-streakname", {
                                            mega: item.type === "MEGA",
                                            win: item.type === "WIN",
                                            lose: item.type === "LOSE",
                                        })}
                                    >
                                        {item.streakname}
                                    </p>
                                    <div className="latest-winner-item-inner">
                                        <div className="latest-winner-item-time">
                                            <span className="latest-winner-item-label">{t("time")}</span>
                                            <span className="latest-winner-item-value">
                                                {dayjs(item.time).format("MM/DD/YYYY")}
                                            </span>
                                        </div>
                                        <div className="latest-winner-item-nickname">
                                            <span className="latest-winner-item-label">{t("nickname")}</span>
                                            <span className="latest-winner-item-value">{item.nickname}</span>
                                        </div>
                                        <div className="latest-winner-item-prize">
                                            <span className="latest-winner-item-label">{t("prize")}</span>
                                            <span className="latest-winner-item-value">
                                                {Formatter.formatCurrency(item.prize)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        if (isDesktop) {
                            return (
                                <div
                                    key={index}
                                    className={clsx("latest-winner-item", {
                                        mega: item.type === "MEGA",
                                        win: item.type === "WIN",
                                        lose: item.type === "LOSE",
                                    })}
                                >
                                    <div className="latest-winner-item-col">
                                        {dayjs(item.time).format("MM/DD/YYYY")}
                                    </div>
                                    <div className="latest-winner-item-col">
                                        <span
                                            className={clsx({
                                                mega: item.type === "MEGA",
                                                win: item.type === "WIN",
                                                lose: item.type === "LOSE",
                                            })}
                                        >
                                            {item.streakname}
                                        </span>
                                    </div>
                                    <div className="latest-winner-item-col">{Formatter.formatCurrency(item.prize)}</div>
                                    <div className="latest-winner-item-col">
                                        {item.status === "WAITING" ? (
                                            <button
                                                className="bg-gradient-primary border-none text-light inline-block font-normal text-center align-middle px-3 py-[.375rem] leading-[1.5] rounded"
                                                onClick={handleClaim}
                                            >
                                                {t("claim_prizes")}
                                            </button>
                                        ) : (
                                            <span
                                                className={clsx("status", {
                                                    "status--reject": item.status === "REJECTED",
                                                    "status--pending": item.status === "PENDING",
                                                    "status--accept": item.status === "APPROVED",
                                                })}
                                            >
                                                {item.status === "REJECTED"
                                                    ? t("rejected")
                                                    : item.status === "APPROVED"
                                                      ? t("accept")
                                                      : t("pending")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className={clsx("latest-winner-item", {
                                    mega: item.type === "MEGA",
                                    win: item.type === "WIN",
                                    lose: item.type === "LOSE",
                                })}
                            >
                                <p
                                    className={clsx("latest-winner-item-streakname", {
                                        mega: item.type === "MEGA",
                                        win: item.type === "WIN",
                                        lose: item.type === "LOSE",
                                    })}
                                >
                                    {item.streakname}
                                </p>
                                <div className="latest-winner-item-inner">
                                    <div className="latest-winner-item-time">
                                        <span className="latest-winner-item-label">{t("time")}</span>
                                        <span className="latest-winner-item-value">
                                            {dayjs(item.time).format("MM/DD/YYYY")}
                                        </span>
                                    </div>
                                    <div className="latest-winner-item-nickname">
                                        <span className="latest-winner-item-label">{t("prize")}</span>
                                        <span className="latest-winner-item-value">
                                            {Formatter.formatCurrency(item.prize)}
                                        </span>
                                    </div>
                                    <div className="latest-winner-item-prize">
                                        <span className="latest-winner-item-label">{t("status")}</span>
                                        {item.status === "WAITING" ? (
                                            <button
                                                className="bg-gradient-primary border-none text-light inline-block font-normal text-center align-middle px-3 py-[.375rem] leading-[1.5] rounded"
                                                onClick={handleClaim}
                                            >
                                                {t("claim_prizes")}
                                            </button>
                                        ) : (
                                            <span
                                                className={clsx("status", {
                                                    "status--reject": item.status === "REJECTED",
                                                    "status--pending": item.status === "PENDING",
                                                    "status--accept": item.status === "APPROVED",
                                                })}
                                            >
                                                {item.status === "REJECTED"
                                                    ? t("rejected")
                                                    : item.status === "APPROVED"
                                                      ? t("accept")
                                                      : t("pending")}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Loading>
            </div>
            {<Pagination size={5} page={page} total={data?.t || 0} onChange={(_p) => setPage(_p)} />}
        </>
    );
};

export default LatestWinnerTable;
