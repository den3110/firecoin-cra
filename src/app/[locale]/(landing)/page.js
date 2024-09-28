"use client";

import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";

// import clientStylesConfig from "@/clientStylesConfig";

// Provider cho Context

const HomePage = () => {
    return <LandingTwo />;
    // if (currentHostname.landingStyle === 2) return <LandingTwo />;
    // const hostname = window.location.hostname;
    // const currentHostname = clientStylesConfig.find((a) => a.clientId == hostname?.toLowerCase());
    // if (currentHostname) {
    //     if (currentHostname.landingStyle === 1) return <LandingOne />;
    //     if (currentHostname.landingStyle === 2) return <LandingTwo />;
    // }
    // return <LandingTwo />;
};

export default HomePage;
