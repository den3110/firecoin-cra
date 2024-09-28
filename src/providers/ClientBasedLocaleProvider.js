"use client";

import { useEffect } from "react";
import HttpClient from "@/services/HttpClient";
import { usePathname, useRouter } from "@/navigation";
import { localeList } from "@/components/LocaleSelect";
import useLocale from "@/hooks/useLocales";

const ClientBasedLocaleProvider = ({ children }) => {
    // const router = useRouter();
    // const pathname = usePathname();

    const { changeLanguage } = useLocale();

    useEffect(() => {
        const localeInitialized = localStorage.getItem("LANG");

        if (localeInitialized) {
            return;
        }

        HttpClient.instanceClient()
            .get("https://api.ipstack.com/check?access_key=ab95bab02cfaca13104686fa838dee10")
            .then(({ data }) => {
                const languageCode = data.location?.languages[0]?.code || "en";

                if(["en", "vi", "th", "la", "kr", "jp", "id", "cn","cm"].includes(languageCode)){
                    localStorage.setItem("LANG", languageCode);
                }else{
                    localStorage.setItem("LANG", "en");
                }
                               

                if (!localeList.find((locale) => locale.locale === languageCode)) {
                    return;
                }

                changeLanguage(languageCode);
                // router.replace(pathname, { locale: languageCode });
            });
    }, []);

    return children;
};

export default ClientBasedLocaleProvider;
