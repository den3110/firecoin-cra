import clsx from "clsx";
import QRCode from "react-qr-code";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import HttpClient from "@/services/HttpClient";
import Formatter from "@/utils/Formatter";
import copy from "copy-to-clipboard";

const BalanceDeposit = ({ config }) => {
    const {t } = useTranslation();

    const [selectedNetwork, setSelectedNetwork] = useState("BEP20");

    const { enqueueSnackbar } = useSnackbar();

    const [addressData, setAddressData] = useState();

    const handleCopyAddress = useCallback(() => {
        if (!addressData?.a) {
            HttpClient.instanceClient()
                .post("/api/wallet/USDT/address")
                .then((res) => res.data)
                .then(({ d: data }) => {
                    setAddressData(data);
                });
            return;
        }

        if(addressData.a && copy(addressData?.a))
            enqueueSnackbar(t("copied_to_clipboard"), { variant: "success" });
    }, [addressData?.a, enqueueSnackbar, t]);

    useEffect(() => {
        HttpClient.instanceClient()
            .get("/api/wallet/USDT/address")
            .then((res) => res.data)
            .then(({ d: data }) => {
                setAddressData(data);
            });
    }, []);

    return (
        <div className="box-address overflow-hidden">
            <div className="transfer-network">
                <h4 className="text-xs leading-none mb-[15px] mt-0 font-medium">{t("transfer_network")}</h4>
                <ul className="flex justify-start -mx-1 mb-[15px] pl-0 ">
                    <li
                        className={clsx(
                            "rounded-[6px] mx-1 py-[9px] flex flex-col text-center basis-1/2 cursor-pointer text-xs leading-[13px]",
                            {
                                "text-[#7c7c7c]": selectedNetwork !== "BEP20",
                                "relative bg-gradient-primary border-0 text-light font-bold check-bg before:content-[''] before:block before:w-[17px] before:h-[17px] before:absolute before:-top-[5px] before:-right-[5px]":
                                    selectedNetwork === "BEP20",
                            },
                        )}
                    >
                        <span className="mb-0.5">BEP20 (BSC)</span>
                    </li>
                </ul>
                <p className="transfer-network-warn rounded-[5px] bg-warning/[.26] border border-warning text-warning px-[15px] py-2.5 text-xs leading-[13px] mb-5">
                    <span dangerouslySetInnerHTML={{ __html: t.raw("bsc_note") }}></span>
                </p>
            </div>
            <h4
                className="text-center text-[1.5rem] mb-2 font-medium leading-[1.2]"
                dangerouslySetInnerHTML={{
                    __html: t.raw("your_coin_depositing_address").replace("{coinName}", "USDT"),
                }}
            ></h4>
            <div className="text-center">
                <div className="box-qr-code mb-5">
                    <div className="qr-code-container">
                        {addressData?.a && (
                            <QRCode
                                value={addressData.a}
                                className="inline-block bg-light px-1.5 w-[150px] h-[150px]"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full max-w-full">
                    {addressData?.a && (
                        <div className="address">
                            <input
                                readOnly
                                id="depositAddress"
                                className="text-[#778e9f] bg-light text-sm border border-secondary-400 rounded-lg w-full h-10 leading-[40px] text-center px-[11px] py-[5px] m-0"
                                value={addressData?.a || ""}
                            />
                        </div>
                    )}
                    <div className="w-full text-center">
                        <div className="address">
                            <span className="text-light block italic p-2.5">
                                {t("minimum_deposit_is")} {Formatter.formatNumber(config?.data?.u_min || 0)} USDT
                            </span>
                            <button
                                type="button"
                                className="w-[230px] bg-up text-center rounded-[5px] text-light h-[47px] px-[15px] py-[11px] leading-[19px] font-bold border-none cursor-pointer hover:shadow-[0_0_19px_1px_#04c793] hover:-translate-y-[3px] transition-all duration-300"
                                onClick={handleCopyAddress}
                            >
                                {addressData?.a ? t("copy") : t("request")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceDeposit;
