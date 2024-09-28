import { Fragment, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import NotificationItem from "@/components/NotificationItem";
import useCountUnreadNotificationQuery from "@/hooks/queries/useCountUnreadNotificationQuery";
import HttpClient from "@/services/HttpClient";
import { usePathname } from "@/navigation";
import useLocale from "@/hooks/useLocales";
import useAuth from "@/hooks/useAuth";
import SocketContext from "@/contexts/SocketContext";
import SocketClient from "@/services/SocketClient";
import { useTranslation } from "react-i18next";

const MobileNotificationButton = () => {
    const {t }= useTranslation();

    const [open, setOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const { data: unread, refetch } = useCountUnreadNotificationQuery();
    const { socketInitialized } = useContext(SocketContext);

    const { locale } = useLocale();
    const pathname = usePathname();
    const [auth, _] = useAuth();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                handleClose();
            });
    };

    useEffect(() => {
        handleClose();
    }, [pathname]);

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
        <div
            className={clsx("notification-dropdown mobile", {
                "notification-dropdown--active": open,
            })}
        >
            <div className={clsx("notification-dropdown-button mobile")}>
                <span className="notification-dropdown-button-icon bg-custom-chart-title" onClick={handleOpen}>
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
                <span className="notification-dropdown-button-text bg-text">{t("notification")}</span>
                {unread > 0 && <span className="notification-dropdown-button-number">{unread}</span>}
            </div>
            <Transition show={open}>
                {/*translate x 280px, opacity, duration 0.1s */}
                <Transition.Child
                    as={Fragment}
                    enter="transition ease duration-300"
                    enterFrom="transform opacity-0 translate-x-[280px]"
                    enterTo="transform opacity-100 translate-x-0"
                    leave="transition ease duration-300"
                    leaveFrom="transform opacity-100 translate-x-0"
                    leaveTo="transform opacity-0 translate-x-[280px]"
                >
                    <div className="notification-dropdown-body">
                        <div className="notification-dropdown-header">
                            <h3 className="notification-dropdown-title">
                                {t("notifications")}
                                <span className="notification-dropdown-readall ml-2" onClick={handleReadAll}>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="38"
                                            height="21"
                                            viewBox="0 0 38 21"
                                            className="isReaded"
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
                            </h3>
                            <span className="notification-dropdown-view-all" onClick={handleReadAll}>
                                {t("view_all")}
                            </span>
                            <button type="button" className="close" onClick={handleClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22">
                                    <g
                                        strokeLinecap="square"
                                        strokeLinejoin="miter"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        stroke="#ffffff"
                                        className="nc-icon-wrapper"
                                    >
                                        <g className="nc-interact_menu-close-2-o-32">
                                            <path
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeMiterlimit="10"
                                                d="M2 6h28"
                                                transform="translate(0 10.00) rotate(45.00 16 6)"
                                            ></path>
                                            <path
                                                data-color="color-2"
                                                fill="none"
                                                strokeMiterlimit="10"
                                                d="M2 16h28"
                                                opacity="0"
                                            ></path>
                                            <path
                                                fill="none"
                                                stroke="#ffffff"
                                                strokeMiterlimit="10"
                                                d="M2 26h28"
                                                transform="translate(0 -10) rotate(-45 16 26)"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className="notification-dropdown-list">
                            <div className="notification">
                                <section className="ps-container scroll-area notification-wrap-list ps">
                                    {notifications.length > 0 ? (
                                        <ul className="notification-list list-unstyled">
                                            {!auth?.user?.enable_hiding_info &&
                                                notifications.map((notification) => (
                                                    <NotificationItem
                                                        closeMenu={handleClose}
                                                        key={notification.id}
                                                        notification={notification}
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
                </Transition.Child>
                <Transition.Child as="div" className="notification-dropdown-mask"></Transition.Child>
            </Transition>
        </div>
    );
};

export default MobileNotificationButton;
