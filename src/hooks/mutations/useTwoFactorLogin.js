import { useMutation } from "@tanstack/react-query";
import HttpClient from "@/services/HttpClient";

const useTwoFactorLogin = () => {
    return useMutation({
        mutationKey: ["twoFactorLogin"],
        mutationFn: async (values) =>
            HttpClient.instanceClient()
                .post("/api/auth/auth/token-2fa", values)
                .then((res) => res.data),
    });
};

export default useTwoFactorLogin;
