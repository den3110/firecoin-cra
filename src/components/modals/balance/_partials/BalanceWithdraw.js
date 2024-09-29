import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import Formatter from "@/utils/Formatter";
import BalanceModalTextInputField from "@/components/inputs/BalanceModalTextInputField";
import { Form, FormikProvider, useFormik } from "formik";
import useSpotBalancesQuery from "@/hooks/queries/useSpotBalancesQuery";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetWithdraw, setSelectedNetwork, showTransferConfirm } from "@/store/balanceReducer";
import HttpClient from "@/services/HttpClient";

const BalanceWithdraw = ({ config }) => {
    const {t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const selectedNetwork = useSelector((state) => state.balance.selectedNetwork);

    const dispatch = useDispatch();

    const validationSchema = useMemo(() => {
        if (selectedNetwork === "internal") {
            return Yup.object({
                amount: Yup.number()
                    .min(config?.data?.w_min || 5)
                    .required(),
                nickname: Yup.string().required(),
                note: Yup.string(),
            });
        }

        return Yup.object({
            amount: Yup.number()
                .min(config?.data?.w_min || 5)
                .required(),
            address: Yup.string().required(),
            note: Yup.string(),
            two_factor_code: Yup.string().required(),
        });
    }, [config?.data?.w_min, selectedNetwork]);

    const formik = useFormik({
        initialValues: {
            amount: "",
            nickname: "",
            note: "",
            address: "",
            two_factor_code: "",
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            if (selectedNetwork === "internal") {
                dispatch(
                    showTransferConfirm({
                        amount: values.amount,
                        nickName: values.nickname,
                        memo: values.note,
                    }),
                );
                return;
            }

            HttpClient.instanceClient()
                .post("/api/wallet/USDT/withdraw", {
                    amount: values.amount,
                    memo: values.note,
                    network: "bsc",
                    toAddress: values.address,
                    verifyCode: values.two_factor_code,
                })
                .then((res) => res.data)
                .then((data) => {
                    if (!data.ok) {
                        const { err_code } = data.d;

                        enqueueSnackbar(err_code === "err_binaryoption_notfoundinfo" ? data.m : t(err_code), {
                            variant: "error",
                        });
                        return;
                    }

                    enqueueSnackbar(t("withdraw_success"), { variant: "success" });

                    dispatch(resetWithdraw());
                });
        },
    });

    const { data: balanceData } = useSpotBalancesQuery();

    const handleSelectNetwork = useCallback(
        (network) => {
            return () => {
                dispatch(setSelectedNetwork(network));
            };
        },
        [dispatch],
    );

    const twoFaEnabled = useSelector((state) => state.auth.user["2fa"]);

    const handleMaxCopy = (e) => {
        e.preventDefault();

        formik.setFieldValue(
            "amount",
            selectedNetwork === "BEP20"
                ? Math.max(0, (balanceData?.d.usdtAvailableBalance || 0) - 1)
                : balanceData?.d.usdtAvailableBalance,
        );
    };

    const handleSubmit = (e) => {
        formik.submitForm().then();
    };

    return (
        <div className="box-address overflow-hidden">
            <div className="transfer-network">
                <h4 className="text-xs leading-none mb-[15px] mt-0 font-medium">{t("transfer_network")}</h4>
                <ul className="flex justify-start -mx-1 mb-[15px] pl-0 ">
                    <li
                        className={clsx(
                            "rounded-[6px] mx-1 py-[9px] flex flex-col text-center basis-1/2 cursor-pointer text-xs leading-[13px] font-bold",
                            {
                                "bg-secondary-400 border border-secondary-400 text-[#7c7c7c]":
                                    selectedNetwork !== "internal",
                                "relative bg-gradient-primary border-0 text-light check-bg before:content-[''] before:block before:w-[17px] before:h-[17px] before:absolute before:-top-[5px] before:-right-[5px]":
                                    selectedNetwork === "internal",
                            },
                        )}
                        onClick={handleSelectNetwork("internal")}
                    >
                        <span className="mb-0.5">{t("internal")}</span>
                        <span className="text-light/50 font-normal">{t("fee")}: 0 USDT</span>
                    </li>
                    <li
                        className={clsx(
                            "rounded-[6px] mx-1 py-[9px] flex flex-col text-center basis-1/2 cursor-pointer text-xs leading-[13px] font-bold",
                            {
                                "bg-secondary-400 border border-secondary-400 text-[#7c7c7c]":
                                    selectedNetwork !== "BEP20",
                                "relative bg-gradient-primary border-0 text-light check-bg before:content-[''] before:block before:w-[17px] before:h-[17px] before:absolute before:-top-[5px] before:-right-[5px]":
                                    selectedNetwork === "BEP20",
                            },
                        )}
                        onClick={handleSelectNetwork("BEP20")}
                    >
                        <span className="mb-0.5">BEP20 (BSC)</span>
                        <span className="text-light/50 text-warning uppercase">
                            {t("fee")}: {Formatter.formatNumber(config?.data?.u_fee_bsc)} USDT
                        </span>
                    </li>
                </ul>
                {selectedNetwork === "BEP20" && (
                    <p className="transfer-network-warn rounded-[5px] bg-warning/[.26] border border-warning text-warning px-[15px] py-2.5 text-xs leading-[13px] mb-5">
                        <span dangerouslySetInnerHTML={{ __html: t("bsc_note") }}></span>
                    </p>
                )}
            </div>
            <FormikProvider value={formik}>
                <Form>
                    <BalanceModalTextInputField
                        name="amount"
                        id="amount"
                        label={`${t("amount")} USDT`}
                        placeholder={`${t("minimum_withdrawal_amount")}: ${Formatter.formatNumber(
                            config?.data?.w_min,
                        )} USDT`}
                        type="number"
                        decimal="true"
                        className="pr-[55px]"
                        postfix={
                            <button
                                type="button"
                                className="capitalize absolute right-[14px] -translate-y-1/2 top-1/2 px-1.5 py-0.5 text-light bg-gradient-primary border-none cursor-pointer transition-all duration-300 font-bold inline-flex items-center jusitfy-center text-center align-middle text-base leading-[1.5] rounded"
                                onClick={handleMaxCopy}
                            >
                                {t("max")}
                            </button>
                        }
                    />
                    {selectedNetwork === "BEP20" && (
                        <BalanceModalTextInputField
                            name="address"
                            label={t("your_address")}
                            placeholder={t("enter_your_address")}
                            canPasteFromClipboard={true}
                        />
                    )}
                    {selectedNetwork === "internal" && (
                        <BalanceModalTextInputField
                            name="nickname"
                            label={t("recipient_nickname")}
                            placeholder={t("enter_recipient_nickname")}
                        />
                    )}
                    <BalanceModalTextInputField
                        name="note"
                        label={t("note")}
                        labelInHtml={t("note_optional")}
                        placeholder={t("enter_your_note")}
                        canPasteFromClipboard={true}
                    />
                    {selectedNetwork === "BEP20" && twoFaEnabled && (
                        <BalanceModalTextInputField
                            name="two_factor_code"
                            label={t("twoFA_code")}
                            placeholder={t("enter_your_twoFA_code")}
                            canPasteFromClipboard={true}
                        />
                    )}
                </Form>
            </FormikProvider>
            <div className="flex flex-wrap">
                <div className="w-full max-w-full">
                    <div className="w-full text-center">
                        <div className="address">
                            {!twoFaEnabled && (
                                <small className="text-danger italic block">
                                    {t("you_must_enable_2FA_to_make_withdrawal_requests")}
                                </small>
                            )}
                            <button
                                type="button"
                                className="w-[230px] bg-down text-center rounded-[5px] text-light h-[47px] px-[15px] py-[11px] leading-[19px] font-bold border-none cursor-pointer hover:shadow-[0_0_19px_1px_#FA4B62] hover:-translate-y-[3px] transition-all duration-300 disabled:cursor-not-allowed"
                                onClick={handleSubmit}
                                disabled={!twoFaEnabled || Object.entries(formik.errors).length > 0}
                            >
                                {t("send")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceWithdraw;
