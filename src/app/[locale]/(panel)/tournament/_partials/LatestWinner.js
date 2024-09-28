import { useTranslations } from "next-intl";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import dayjs from "dayjs";
import Formatter from "@/utils/Formatter";
import LatestWinnerTable from "@/app/[locale]/(panel)/tournament/_partials/LatestWinnerTable";

const LatestWinner = () => {
    const t = useTranslations();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setLoading(true);
    //     HttpClient.instanceClient()
    //         .get("/api/wallet/binaryoption/events/community-jackpot/last-mega-jackpot")
    //         .then((res) => res.data)
    //         .then((data) => {
    //             setData(data.d);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <div className="latest-winner">
            <div className="bs-container">
                {/* <h3 className="latest-winner-subtitle">{t("meet_the_latest_winner")}</h3>
                <h2 className="latest-winner-title">Latest Winners</h2>
                <Loading loading={loading} className="latest-winner-mega">
                    <h4 className="latest-winner-mega-title">mega jackpot winner</h4>
                    <div className="latest-winner-mega-body">
                        <p className="latest-winner-mega-name">{data?.nickname}</p>
                        <p className="latest-winner-mega-text">
                            Won Mega Prizes {dayjs(data?.time).format("MM/DD/YYYY")}
                        </p>
                    </div>
                    <span className="latest-winner-mega-prize">{Formatter.formatCurrency(data?.prize || 0)}</span>
                </Loading> */}
                <LatestWinnerTable />
            </div>
        </div>
    );
};

export default LatestWinner;
