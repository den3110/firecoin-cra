"use client";

import { Link } from "@/navigation";
import { useTranslation } from "react-i18next";
import useJackpotCommunityFundQuery from "@/hooks/queries/useJackpotCommunityFundQuery";
import Formatter from "@/utils/Formatter";

const NavStreak = () => {
    const {t } = useTranslation();

    const { data: communityFund } = useJackpotCommunityFundQuery();

    return (
        <li className="nav-streak px-2.5">
            <Link href="/streak-challenge" className="nav-link block p-0">
                <div className="nav-streak-rewards ">
                    <span className="nav-streak-rewards-label block">Prize Pool</span>
                    <span className="nav-streak-rewards-value block">
                        {Formatter.formatCurrency(communityFund?.fund || 0, "USD", true)}
                    </span>
                </div>
            </Link>
        </li>
    );
};

export default NavStreak;
