import { useMutation } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useRegisterMutation = () => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: (values) =>
            HttpClient.instanceClient()
                .put("/api/auth/account/register", values)
                .then((res) => res.data),
    });
};

export default useRegisterMutation;