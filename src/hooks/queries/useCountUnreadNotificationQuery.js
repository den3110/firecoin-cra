import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useCountUnreadNotificationQuery = () => {
    return useQuery({
        queryKey: ["countUnreadNotification"],
        queryFn: () => {
            return HttpClient.instanceClient()
                .get("/api/wallet/binaryoption/events/notifications/count", {
                    params: {
                        unread: true,
                    },
                })
                .then((res) => res.data)
                .then((data) => data.d || 0);
        },
    });
};

export default useCountUnreadNotificationQuery;
