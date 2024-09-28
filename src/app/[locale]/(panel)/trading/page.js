"use client";

import dynamic from "next/dynamic";

const TvChart = dynamic(() => import("./_partials/TvChart"), { ssr: false });

const TradingPage = () => {
    return <TvChart />;
};

export default TradingPage;
