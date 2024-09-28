import { useCallback } from "react";
import HttpClient from "@/services/HttpClient";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authReducer";
import { useRouter } from "@/navigation";

const useUpdateUserInfo = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    return useCallback(() => {
        return new Promise((resolve, reject) => {
            HttpClient.instanceClient()
                .get("/api/auth/me/profile")
                .then((res) => {
                    dispatch(setUser(res.data.d));

                    resolve(res.data.d);
                })
                .catch((err) => {
                    localStorage.removeItem("USER_TOKEN");

                    router.push("/");

                    reject(err);
                });
        });
    }, [dispatch, router]);
};

export default useUpdateUserInfo;
