import useAuth from "@/hooks/useAuth";
import { getCurrentHost } from "@/utils/clientInfo";
import { useMemo } from "react";

const useUserAvatarUrl = () => {
    const [auth, _] = useAuth();

    return useMemo(() => {
        if (!auth?.user?.photo) {
            return "/assets/images/avatar-default.svg";
        }

        return `${getCurrentHost()}${auth?.user?.photo}`;
    }, [auth?.user?.photo]);
};

export default useUserAvatarUrl;