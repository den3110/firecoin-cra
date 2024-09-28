import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useSpotBalancesQuery = () => {
    return useQuery({
        queryKey: ["user", "spotBalances"],
        queryFn: () =>
            HttpClient.instanceClient()
                .get("/api/wallet/binaryoption/spot-balance")
                .then((res) => res.data),
    });
};

export default useSpotBalancesQuery;
