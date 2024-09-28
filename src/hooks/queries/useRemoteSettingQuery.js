import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useRemoteSettingQuery = () => {
    return useQuery({
        queryKey: ["remoteSetting"],
        queryFn: () => {
            return HttpClient.instanceClient()
                .get("/api/auth/auth/settings")
                .then((res) => res?.data?.d);
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
};

export default useRemoteSettingQuery;
