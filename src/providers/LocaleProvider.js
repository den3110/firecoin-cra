"use client";

import LocaleContext from "@/contexts/LocaleContext";
// import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState, useContext } from "react";
import clientStylesConfig from "@/clientStylesConfig";

// Provider cho Context

const loadConfigStyle = () => {
    const hostname = window.location.hostname;

    const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

    if (currentHostname) {
        document.documentElement.style.setProperty("--primary-start", currentHostname.primaryStart);
        document.documentElement.style.setProperty("--primary-end", currentHostname.primaryEnd);
        document.documentElement.style.setProperty("--primary", currentHostname.primary);
        document.documentElement.style.setProperty("--secondary", currentHostname.secondary);
        document.documentElement.style.setProperty("--secondary-landing", currentHostname.secondaryLanding);
        document.documentElement.style.setProperty("--secondary-sidebar", currentHostname.secondarySidebar);
    }
};

const LocaleProvider = ({ children }) => {
    const [locale, setLocale] = useState("en");
    const [messages, setMessages] = useState({});
    const [siteInfo, setSiteInfo] = useState({});

    const changeLanguage = (language) => {
        setLocale(language);
        localStorage?.setItem("LANG", language);
    };

    useEffect(() => {
        loadConfigStyle();

        const hostname = window.location.hostname;

        const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

        if(currentHostname)
            setSiteInfo(currentHostname);
    }, []);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const loadLocaleData = async () => {
                let LANG = localStorage?.getItem("LANG");
                if (!LANG) {
                    localStorage?.setItem("LANG", "en");
                    LANG = "en";
                }
                if(!["en", "vi", "th", "la", "kr", "jp", "id", "cn","cm"].includes(LANG)){
                    LANG = "en";
                    localStorage?.setItem("LANG", "en");
                }                
                const messages = (await import(`@/locales/${LANG}.js`)).default;
                setLocale(LANG);
                setMessages(messages);
            };
            loadLocaleData();
        }
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, changeLanguage, messages }}>
            {/* {Object.keys(siteInfo).length > 0 && (
                <>
                    <title>{siteInfo.name}</title>
                    <link href={`/${siteInfo.clientId}.ico`} rel="shortcut icon" />
                </>
            )} */}
            {children}
        </LocaleContext.Provider>
    );
};
export default LocaleProvider;
