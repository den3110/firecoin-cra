"use client";

import "@/components/NotificationDropdown.scss";
import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import HttpClient from "@/services/HttpClient";
import NotificationItem from "@/components/NotificationItem";
import { Link, usePathname } from "@/navigation";
import { Menu } from "@headlessui/react";
import useCountUnreadNotificationQuery from "@/hooks/queries/useCountUnreadNotificationQuery";
import useLocale from "@/hooks/useLocales";
import useAuth from "@/hooks/useAuth";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";
import { useTranslation } from "react-i18next";

const NotificationDropdown = () => {
    const {t }= useTranslation();
    const { socketInitialized } = useContext(SocketContext);
    const [notifications, setNotifications] = useState([]);

    const pathname = usePathname();
    const { locale } = useLocale();
    const [auth, _] = useAuth();

    const { data: unread, refetch } = useCountUnreadNotificationQuery();

    const menuButtonRef = useRef();

    const closeMenu = () => {
        menuButtonRef.current?.click();
    };

    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/binaryoption/events/notifications", {
                params: {
                    page: 1,
                    size: 10,
                    lang: locale,
                },
            })
            .then((res) => res.data)
            .then((data) => {
                setNotifications(data.d.c);
            });
    }, [locale]);

    const handleReadAll = () => {
        HttpClient.instanceClient()
            .put("/api/wallet/binaryoption/events/notifications/readall")
            .then((res) => res.data)
            .then((_) => {
                setNotifications((prevState) => prevState.map((notification) => ({ ...notification, read: true })));
                refetch().then();
            });
    };

    const handleRead = (id) => () => {
        const notification = notifications.find((notification) => notification.id === id);
        notification.read = true;

        setNotifications([...notifications]); // force update

        refetch().then();
    };

    // Handle sockets
    useEffect(() => {
        if (!socketInitialized || !SocketClient.getInstance().socket()) {
            console.log("Socket not connected");
            return;
        }

        SocketClient.getInstance()
            .socket()
            .on("SYSTEM_MESSAGE", () => {
                HttpClient.instanceClient()
                    .get("/api/wallet/binaryoption/events/notifications", {
                        params: {
                            page: 1,
                            size: 10,
                            lang: locale,
                        },
                    })
                    .then((res) => res.data)
                    .then((data) => {
                        setNotifications(data.d.c);
                    });
            });
    }, [socketInitialized, locale]);
    return (
        <Menu>
            {({ open }) => (
                <div
                    className={clsx("notification-dropdown", {
                        " notification-dropdown--active": open,
                    })}
                >
                    <Menu.Button as="div" ref={menuButtonRef} className="notification-dropdown-button">
                        <span
                            className={clsx(
                                "notification-dropdown-button-icon relative",
                                pathname.startsWith("/notification") ? "text-primary" : "text-light",
                            )}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16.545"
                                height="18"
                                viewBox="0 0 16.545 18"
                                className="icon2"
                            >
                                <g id="bell" transform="translate(0.5 0.5)">
                                    <path
                                        id="Path_35098"
                                        data-name="Path 35098"
                                        d="M18.393,11.572A3.536,3.536,0,0,1,17.24,8.963V6.712A5.884,5.884,0,0,0,11.472,1,5.913,5.913,0,0,0,5.7,6.767v2.2a3.536,3.536,0,0,1-1.153,2.609A2.488,2.488,0,0,0,3.7,13.247c0,1.51,3.131,2.526,7.772,2.526s7.772-1.016,7.772-2.526A2.547,2.547,0,0,0,18.393,11.572Z"
                                        transform="translate(-3.7 -1)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="1"
                                    ></path>
                                    <path
                                        id="Path_35099"
                                        data-name="Path 35099"
                                        d="M25.619,56.51A22.364,22.364,0,0,1,23.2,56.4a2.491,2.491,0,0,0,2.419,1.787A2.524,2.524,0,0,0,28.038,56.4,22.364,22.364,0,0,1,25.619,56.51Z"
                                        transform="translate(-17.847 -41.187)"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="1"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span
                            className={clsx(
                                "notification-dropdown-button-text",
                                pathname.startsWith("/notification") ? "text-primary" : "text-text",
                            )}
                        >
                            {t("notification")}
                        </span>
                        {unread > 0 && (
                            <span className="border border-secondary flex items-center justify-center absolute -top-[7px] left-[calc(50%+2px)] overflow-hidden bg-danger text-light min-w-[18px] h-[18px] leading-[14px] rounded-full text-bold text-[9px] px-0.5">
                                {unread}
                            </span>
                        )}
                    </Menu.Button>
                    <Menu.Items>
                        <div className="notification-dropdown-body">
                            <div className="notification-dropdown-header">
                                <h3 className="notification-dropdown-title">
                                    {t("notifications")}
                                    {notifications?.length > 0 && (
                                        <span className="notification-dropdown-readall ml-2" onClick={handleReadAll}>
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="38"
                                                    height="21"
                                                    viewBox="0 0 38 21"
                                                    className="isReaded"
                                                >
                                                    <g
                                                        id="Group_21335"
                                                        data-name="Group 21335"
                                                        transform="translate(-917 -81)"
                                                    >
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
                                    )}
                                </h3>
                                <Link
                                    href="/notification"
                                    onClick={closeMenu}
                                    className="notification-dropdown-view-all"
                                >
                                    {t("view_all")}
                                </Link>
                            </div>
                            <div className="notification-dropdown-list">
                                <div className="notification">
                                    <section className="ps-container scroll-area notification-wrap-list ps ps--active-y">
                                        {notifications.length > 0 ? (
                                            <ul className="notification-list list-unstyled">
                                                {!auth?.user?.enable_hiding_info &&
                                                    notifications.map((notification) => (
                                                        <NotificationItem
                                                            closeMenu={closeMenu}
                                                            key={notification.id}
                                                            notification={notification}
                                                            onRead={handleRead(notification.id)}
                                                        />
                                                    ))}
                                            </ul>
                                        ) : (
                                            <div className="notification-nodata">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="21.899"
                                                    height="23.949"
                                                    viewBox="0 0 21.899 23.949"
                                                    className="inline-block"
                                                >
                                                    <g id="bell" transform="translate(-3.7 -1)">
                                                        <path
                                                            id="Path_35098"
                                                            data-name="Path 35098"
                                                            d="M24.4,15.9a4.983,4.983,0,0,1-1.625-3.676V9.048A8.289,8.289,0,0,0,14.649,1,8.331,8.331,0,0,0,6.524,9.125v3.1A4.983,4.983,0,0,1,4.9,15.9a3.505,3.505,0,0,0-1.2,2.36c0,2.128,4.411,3.559,10.949,3.559S25.6,20.384,25.6,18.256A3.589,3.589,0,0,0,24.4,15.9Z"
                                                            transform="translate(0 0)"
                                                            fill="#878098"
                                                        ></path>
                                                        <path
                                                            id="Path_35099"
                                                            data-name="Path 35099"
                                                            d="M26.6,56.555a31.474,31.474,0,0,1-3.4-.155,3.506,3.506,0,0,0,3.4,2.515,3.552,3.552,0,0,0,3.4-2.515A31.474,31.474,0,0,1,26.6,56.555Z"
                                                            transform="translate(-11.955 -33.966)"
                                                            fill="#878098"
                                                        ></path>
                                                    </g>
                                                </svg>
                                                <p className="notification-nodata-note mb-0 mt-2">
                                                    {t("no_new_notifications")}
                                                </p>
                                            </div>
                                        )}
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="notification-dropdown-mask"></div>
                    </Menu.Items>
                </div>
            )}
        </Menu>
    );
};

export default NotificationDropdown;
