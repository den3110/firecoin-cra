"use client";

import "./TournamentPage.scss";
import { useTranslations } from "next-intl";
import useJackpotCommunityFundQuery from "@/hooks/queries/useJackpotCommunityFundQuery";
import Formatter from "@/utils/Formatter";
import LatestWinner from "@/app/[locale]/(panel)/tournament/_partials/LatestWinner";
import InfoGuide from "@/app/[locale]/(panel)/tournament/_partials/InfoGuide";
import { Link } from "@/navigation";
import { useCallback, useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import smoothScrollTo from "@/utils/smoothScrollTo";

const TournamentPage = () => {
    const t = useTranslations();
    const { enqueueSnackbar } = useSnackbar();

    const { data: communityFund } = useJackpotCommunityFundQuery();
    const { refetch } = useSpotBalancesQuery();

    const handleMoreInfo = () => {
        smoothScrollTo("info-guide");
    };

    const [data, setData] = useState({});
    const [endTime, setEndTime] = useState(0);
    const [startTime, setStartTime] = useState(0);


    const joinHandler = ()=>{
        HttpClient.instanceClient().put("api/wallet/binaryoption/events/tournament/join").then((res)=> res.data).then((data)=>{

            if(!data.ok){
                enqueueSnackbar(t(data.d.err_code), {variant : "error"})
                return;
            }
            enqueueSnackbar(t('registration_successful'), {variant : "success"})
            fetchData();
            refetch();
        })

    }



    const fetchData = useCallback(() => {
        // setLoading(true);
        HttpClient.instanceClient()
            .get("api/wallet/binaryoption/events/tournament/info")
            .then((res) => res.data)
            .then((data) => {
                setData(data.d);
                setEndTime(data.endTime)
                setStartTime(data.startTime)

            })
            .finally(() => {
                // setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className="community-jackpot">
                <h1 className="community-jackpot-title">Demo Trading Tournament</h1>
                {/* <div className="prize-pool">
                    <h3 className="prize-pool-label">
                        <span className="whitespace-nowrap">Prize Pool</span>
                    </h3>
                    <p className="prize-pool-value mb-0">{Formatter.formatCurrency(communityFund?.fund || 0)}</p>
                    <span className="prize-pool-mega-fund">
                        {Formatter.formatCurrency(communityFund?.mega_fund || 0)}
                    </span>
                </div> */}


                { !data?.IsJoin ?   <button onClick={joinHandler} className="nav-link go-trade">
                    {t("join_now_text")}
                </button> : <>

                
                <p className="text-center text-white mb-3 font-20">{t('profit')} : {Formatter.formatCurrency(data?.Profit)}</p>
                <p className="text-center text-white mb-3 font-20">{t('trade_volume')} : {Formatter.formatCurrency(data?.Volume)}</p>                

                </>}

                {endTime > Date.now() ? <>
                    <p className="text-center text-success mb-3 font-20">{t('start_time')} : {Formatter.formatLocalTime(startTime)}</p>
                    <p className="text-center text-danger mb-3 font-20">{t('end_time')} : {Formatter.formatLocalTime(endTime)}</p>
                </> :<p className="text-center text-danger mb-3 font-20">{t('this_challenge_was_ended')}</p>        }     
             
                <p className="link-to-info mb-0" onClick={handleMoreInfo}>
                    {t("more_information")}
                </p>
                <div className="bg">
                    <LatestWinner />
                    <InfoGuide />
                </div>
            </div>
        </>
    );
};

export default TournamentPage;
