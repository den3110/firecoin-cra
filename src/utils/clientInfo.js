"use client";

import clientStylesConfig from "@/clientStylesConfig";

// console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL)
export const getCurrentHost = () =>
    window?.location?.hostname == "localhost" || window?.location?.hostname.indexOf("192.168") > -1
        ? process.env.REACT_APP_API_URL
        : `${window?.location?.protocol || "http"}//${window.location.hostname}`;

export const getCurrentWebsocket = () =>
    window?.location?.hostname == "localhost" || window?.location?.hostname.indexOf("192.168") > -1
        ? process.env.REACT_APP_SOCKET_URL
        : `${window?.location?.protocol || "http"}//ws.${window.location.hostname}`;

export const getCurrentSiteName = () => {
    try {
        const hostname = window.location.hostname;

        const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

        if (currentHostname) {
            return currentHostname.name;
        }
    } catch (error) {}
    return "UNKNOWN";
};

export const getCurrentLogoSvg = () => {
    const hostname = window.location.hostname;

    const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

    if (currentHostname) {
        return currentHostname.logoSvg;
    }
    return "/assets/images/logo.svg";
};

export const getCurrentLogoSmSvg = () => {
    const hostname = window.location.hostname;

    const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

    if (currentHostname) {
        return currentHostname.logoSmSvg;
    }
    return "/assets/images/logo-sm.svg";
};
export const getCurrentIconWin = () => {
    const hostname = window.location.hostname;

    const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

    if (currentHostname) {
        return currentHostname.iconWin;
    }
    return "/assets/images/icon-win.svg";
};

export const getCurrentBgChart = () => {
    const hostname = window.location.hostname;

    const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());

    if (currentHostname) {
        return currentHostname.chartBackground;
    }
    return "/assets/images/pocinex_bg_chart.png";
};
