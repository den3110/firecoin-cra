"use client";

import { useEffect } from "react";
import { useRouter } from "@/navigation";

const NotFound = () => {
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem("USER_TOKEN");

        if (isAuth) {
            router.push("/not-found");
            return;
        }

        router.push("/not-found-guest");
    }, [router]);

    return null;
};

export default NotFound;
