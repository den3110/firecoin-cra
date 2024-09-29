"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import HttpClient from "@/services/HttpClient";
import Sticky from "react-sticky-el";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/components/Loading";
import NotificationItem from "@/components/NotificationItem";
import useCountUnreadNotificationQuery from "@/hooks/queries/useCountUnreadNotificationQuery";
import clsx from "clsx";
import useLocale from "@/hooks/useLocales";
import useAuth from "@/hooks/useAuth";

const NotificationPage = () => {
    const {t } = useTranslation();

    const { data: unread, refetch } = useCountUnreadNotificationQuery();

    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const { locale } = useLocale();
    const [auth, _] = useAuth();

    const loadMore = useCallback(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/events/notifications", {
                params: {
                    page: page + 1,
                    size: 10,
                    lang: locale,
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setNotifications((prevState) => [...prevState, ...data.d.c]);
                setPage(data.d.p);
                setTotal(data.d.t);
            });
    }, [page, locale]);

    const hasMore = useMemo(() => {
        return total === null || (total > 0 && page < Math.ceil(total / 10));
    }, [page, total]);

    useEffect(() => {
        if (total !== null) {
            return;
        }

        loadMore();
    }, [loadMore, total]);

    useEffect(() => {
        setPage(1);
        setTotal(null);
        setNotifications([]);
    }, [locale]);

    const handleReadAll = () => {
        HttpClient.instanceClient()
            .put("/api/wallet/binaryoption/events/notifications/readall")
            .then((res) => res.data)
            .then(() => {
                setNotifications(
                    notifications.map((notification) => {
                        notification.read = true;
                        return notification;
                    }),
                );

                refetch().then();
            });
    };

    const handleRead = (id) => () => {
        const notification = notifications.find((notification) => notification.id === id);
        notification.read = true;

        setNotifications([...notifications]); // force update

        refetch().then();
    };

    return (
        <div className="max-w-[1205px] w-full mx-auto px-2.5 py-5">
            <Sticky
                stickyClassName="top-[56px] lg:top-[65px] z-[1] bg-secondary pt-5 pb-[18px]"
                className="pt-5 text-[38px] font-bold leading-none text-light pb-[18px] border-b-secondary-600 bg-secondary"
            >
                {t("notifications")}
                <span className="cursor-pointer ml-2.5 inline-box" onClick={handleReadAll}>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="38"
                            height="21"
                            viewBox="0 0 38 21"
                            className="icon-svg-notification inline"
                        >
                            <g id="Group_21335" data-name="Group 21335" transform="translate(-917 -81)">
                                <rect
                                    id="Rectangle_4940"
                                    data-name="Rectangle 4940"
                                    width="38"
                                    height="21"
                                    rx="3"
                                    transform="translate(917 81)"
                                    className={clsx(unread > 0 ? "fill-primary" : "fill-text")}
                                ></rect>
                                <g id="check-all" transform="translate(924.785 83.931)">
                                    <path
                                        id="Path_35112"
                                        data-name="Path 35112"
                                        d="M4.773,18.9,0,14.123l1.3-1.3,3.91,2.607L14.336,5l1.3.652L6.757,18.727a1.3,1.3,0,0,1-1.985.168Z"
                                        transform="translate(0 -5)"
                                        fill="#fefefe"
                                    ></path>
                                    <path
                                        id="Path_35113"
                                        data-name="Path 35113"
                                        d="M28.91,10.3H25.652a.652.652,0,1,1,0-1.3H28.91a.652.652,0,1,1,0,1.3Z"
                                        transform="translate(-8.709 -6.393)"
                                        fill="#fefefe"
                                    ></path>
                                    <path
                                        id="Path_35114"
                                        data-name="Path 35114"
                                        d="M27.516,17.3H21.652a.652.652,0,0,1,0-1.3h5.865a.652.652,0,1,1,0,1.3Z"
                                        transform="translate(-7.316 -8.832)"
                                        fill="#fefefe"
                                    ></path>
                                    <path
                                        id="Path_35115"
                                        data-name="Path 35115"
                                        d="M25.774,24.3H16.652a.652.652,0,0,1,0-1.3h9.123a.652.652,0,0,1,0,1.3Z"
                                        transform="translate(-5.574 -11.271)"
                                        fill="#fefefe"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </span>
                </span>
            </Sticky>
            <div className="notification-page-body">
                <div className="notification">
                    <InfiniteScroll
                        next={loadMore}
                        hasMore={!!hasMore}
                        loader={<Loading loading={true} className="h-[100px]"></Loading>}
                        dataLength={notifications.length}
                    >
                        <ul className="bg-secondary ">
                            {!auth?.user?.enable_hiding_info && notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRead={handleRead(notification.id)}
                                />
                            ))}
                        </ul>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;
