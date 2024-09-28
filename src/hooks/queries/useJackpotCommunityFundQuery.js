import { useQuery } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useJackpotCommunityFundQuery = () => {
    return useQuery({
        queryKey: ["jackpotCommunityFund"],
        queryFn: () => {
            return HttpClient.instanceClient()
                .get("/api/wallet/binaryoption/events/community-jackpot/community-fund")
                .then((res) => res.data)
                .then((data) => data.d);
        },
    });
};

export default useJackpotCommunityFundQuery;
