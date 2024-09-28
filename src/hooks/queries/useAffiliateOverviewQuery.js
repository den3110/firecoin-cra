import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useAffiliateOverviewQuery = () => {
    return useQuery({
        queryKey: ["affiliate-overview"],
        queryFn: () => {
            return HttpClient.instanceClient()
                .get("/api/wallet/binaryoption/user/overview")
                .then((res) => res.data.d);
        },
    });
};

export default useAffiliateOverviewQuery;
