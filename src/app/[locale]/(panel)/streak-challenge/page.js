"use client";

import "./StreakChallengePage.scss";
import { useTranslation } from "react-i18next";
import useJackpotCommunityFundQuery from "@/hooks/queries/useJackpotCommunityFundQuery";
import Formatter from "@/utils/Formatter";
import LatestWinner from "@/app/[locale]/(panel)/streak-challenge/_partials/LatestWinner";
import InfoGuide from "@/app/[locale]/(panel)/streak-challenge/_partials/InfoGuide";
import { Link } from "@/navigation";
import ClaimPopupModal from "@/app/[locale]/(panel)/streak-challenge/_partials/ClaimPopupModal";
import smoothScrollTo from "@/utils/smoothScrollTo";

const StreakChallengePage = () => {
    const {t } = useTranslation();

    const { data: communityFund } = useJackpotCommunityFundQuery();

    const handleMoreInfo = () => {
        smoothScrollTo("info-guide");

    };

    return (
        <>
            <div className="community-jackpot">
                <h1 className="community-jackpot-title">Streak Challenge</h1>
                <div className="prize-pool">
                    <h3 className="prize-pool-label">
                        <span className="whitespace-nowrap">Prize Pool</span>
                    </h3>
                    <p className="prize-pool-value mb-0">{Formatter.formatCurrency(communityFund?.fund || 0)}</p>
                    <span className="prize-pool-mega-fund">
                        {Formatter.formatCurrency(communityFund?.mega_fund || 0)}
                    </span>
                </div>
                <Link href="/index" className="nav-link go-trade">
                    {t("trade_win_challenge")}
                </Link>
                <p className="link-to-info mb-0" onClick={handleMoreInfo}>
                    {t("more_information")}
                </p>
                <div className="bg">
                    <LatestWinner />
                    <InfoGuide />
                </div>
            </div>
            <ClaimPopupModal />
        </>
    );
};

export default StreakChallengePage;
