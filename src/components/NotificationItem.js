import clsx from "clsx";
import dayjs from "dayjs";
import { useRef } from "react";
import { useRouter } from "@/navigation";
import HttpClient from "@/services/HttpClient";

const NotificationItem = ({ notification, onRead, closeMenu }) => {
    const itemRef = useRef(null);

    const router = useRouter();

    const handleClick = () => {
        if (!notification.read) {
            HttpClient.instanceClient()
                .put(`/api/wallet/binaryoption/events/notifications/${notification.id}/read`)
                .then((res) => {
                    onRead?.();
                });
        }

        const input = itemRef.current.querySelector("input[name='url']");

        const value = input?.value;

        if (value) {
            router.push(value);
        }
        closeMenu();
    };

    return (
        <li
            ref={itemRef}
            className={clsx("notification-item", {
                "notification-item--readed": notification.read,
            })}
            onClick={handleClick}
        >
            <div dangerouslySetInnerHTML={{ __html: notification.data }}></div>
            <span className="notification-item-time">
                {dayjs(notification.created_time).format("MM/DD/YYYY HH:mm:ss")}
            </span>
        </li>
    );
};

export default NotificationItem;
