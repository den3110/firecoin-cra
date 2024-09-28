import { useMutation } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";

const useRefillDemoBalanceMutation = (onSuccessCallback, onErrorCallback) => {
    const { refetch } = useSpotBalancesQuery();

    return useMutation({
        mutationKey: ["refillDemoBalance"],
        mutationFn: () => {
            return HttpClient.instanceClient().put("/api/wallet/binaryoption/demo");
        },
        onSuccess: (data) => {
            refetch();
            if (onSuccessCallback) {
                onSuccessCallback(data.data);
            }
        },
        onError: (error) => {
            if (onErrorCallback) {
                onErrorCallback(error);
            }
        },
    });
};

export default useRefillDemoBalanceMutation;
