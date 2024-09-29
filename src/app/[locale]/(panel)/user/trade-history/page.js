"use client";

import { useTranslation } from "react-i18next";
import imgEyes from "@/assets/images/eyes.svg";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import HttpClient from "@/services/HttpClient";
import ProfitStats from "@/components/stats/ProfitStats";
import TradeHistory from "@/components/TradeHistory";
import UIContext from "@/contexts/UIContext";
import useAuth from "@/hooks/useAuth";

const TradeStats = lazy(() => import("@/components/stats/TradeStats"));

const TradeHistoryPage = () => {
  const { t } = useTranslation();
  const { hideBalances, setHideBalances } = useContext(UIContext);

  const [data, setData] = useState(null);

  useEffect(() => {
    HttpClient.instanceClient()
      .get("/api/wallet/binaryoption/user/bo-statistics")
      .then((res) => res.data)
      .then((data) => {
        setData(data.d);
      });
  }, []);

  const handleToggleBalanceHide = () => {
    setHideBalances(!hideBalances);
  };

  const [auth, _] = useAuth();

  return (
    <div className="px-1 py-4 lg:p-4 text-light">
      <div className="w-full px-[15px]">
        <div className="mb-2">
          <div className="mb-2 flex justify-start items-center gap-x-2">
            <div className="text-[1.875rem] font-bold capitalize leading-[1.2]">
              {t("bo_stat")}
            </div>
            <div className="cursor-pointer" onClick={handleToggleBalanceHide}>
              <img
                src={imgEyes}
                alt="img eyes"
                className={hideBalances ? "invisible" : "visible"}
              />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 mb-6">
          <Suspense fallback={<div><div></div></div>}>
            <TradeStats data={!auth?.user?.enable_hiding_info ? data : null} />
          </Suspense>
          <ProfitStats data={!auth?.user?.enable_hiding_info ? data : null} />
        </div>
        {!auth?.user?.enable_hiding_info && <TradeHistory />}
      </div>
    </div>
  );
};

export default TradeHistoryPage;
