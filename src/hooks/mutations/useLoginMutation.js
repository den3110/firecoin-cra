import { useMutation } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useLoginMutation = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (values) =>
            HttpClient.instanceClient()
                .post("/api/auth/auth/token", values)
                .then((res) => res.data),
    });
};

export default useLoginMutation;
