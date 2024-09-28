import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Formatter from "@/utils/Formatter";
import dayjs from "dayjs";
import { Form, FormikProvider, useFormik } from "formik";
import BalanceModalTextInputField from "@/components/inputs/BalanceModalTextInputField";
import { useEffect, useRef } from "react";
import HttpClient from "@/services/HttpClient";
import { useSnackbar } from "notistack";
import { resetWithdraw } from "@/store/balanceReducer";

const TransferConfirmModal = () => {
    const {t } = useTranslation();
    const { transferConfirm, amount, nickName, memo } = useSelector((state) => state.balance);

    const dispatch = useDispatch();

    const formRef = useRef();

    const { enqueueSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            verifyCode: "",
        },
        onSubmit: (values, { resetForm }) => {
            if (!values.verifyCode) {
                enqueueSnackbar(t("fa_code_required"), { variant: "error" });
                return;
            }

            HttpClient.instanceClient()
                .post("/api/wallet/USDT/transfer", {
                    amount,
                    nickName,
                    memo,
                    verifyCode: values.verifyCode,
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

                    enqueueSnackbar(t("transfer_successfully"), { variant: "success" });
                    resetForm();
                    dispatch(resetWithdraw());
                });
        },
    });

    const handleClose = () => {
        dispatch(resetWithdraw());
    };

    useEffect(() => {
        if (!transferConfirm) return;

        document.body.classList.add("no-scroll-modal");

        return () => {
            // remove .no-scroll-modal class to body when modal is close
            document.body.classList.remove("no-scroll-modal");
        };
    }, [transferConfirm]);

    if (!transferConfirm) return null;

    return (
        <div className="pr-[15px] block fixed left-0 bg-black/50 top-0 z-[9999] w-full h-full max-h-dvh overflow-hidden outline-0">
            <div className="modal-dialog m-0 top-0 left-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 text-light h-dvh lg:h-auto w-screen lg:w-auto lg:min-w-[500px] absolute pointer-events-auto">
                <div className="modal-content lg:rounded-[23px] px-[27px] py-[30px] bg-secondarySidebar relative flex flex-col h-full lg:h-auto w-full pointer-events-auto bg-clip-padding border border-black/20 outline-0">
                    <header className="w-full flex justify-between p-0">
                        <p className="text-lg font-bold text-light m-0">{t("confirm_withdrawal")}</p>
                        <button
                            className="bg-transparent border-none transition-all duration-200 cursor-pointer"
                            onClick={handleClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19.125"
                                height="19.125"
                                viewBox="0 0 19.125 19.125"
                            >
                                <path
                                    id="Path_67111"
                                    data-name="Path 67111"
                                    d="M19.565,1.56a1.913,1.913,0,0,0-2.7,0l-6.3,6.3-6.3-6.3a1.912,1.912,0,1,0-2.7,2.7l6.3,6.3-6.3,6.3a1.912,1.912,0,1,0,2.7,2.7l6.3-6.3,6.3,6.3a1.912,1.912,0,1,0,2.7-2.7l-6.3-6.3,6.3-6.3A1.913,1.913,0,0,0,19.565,1.56Z"
                                    transform="translate(-1 -1)"
                                    fill="#fff"
                                ></path>
                            </svg>
                        </button>
                    </header>
                    <div className="modal-body mt-[30px] text-center relative flex-1 flex-shrink p-4">
                        <div className="">
                            <p className="text-text text-sm leading-[1rem] m-0">{t("withdraw_amount")}</p>
                            <p className="text-[28px] font-bold text-light leading-[31px] mt-0 mb-4">
                                {Formatter.formatNumber(amount)} USDT
                            </p>
                            <div className="custom-table rounded-lg bg-secondarySidebar border-none overflow-hidden mb-[30px]">
                                <div className="table-content w-full p-[18px] pb-4">
                                    <div className="table--row pt-0 flex justify-between pb-[15px] border-b border-b-secondary-400 capitalize text-sm leading-[16px]">
                                        <p className="text-light mb-0">{t("time")}</p>
                                        <p className="mb-0">{Formatter.formatLocalTime(dayjs())}</p>
                                    </div>
                                    <div className="table--row pt-2.5 flex justify-between pb-[15px] border-b border-b-secondary-400 capitalize text-sm leading-[16px]">
                                        <p className="text-light mb-0">{t("withdraw_type")}</p>
                                        <p className="mb-0">{t("internal")}</p>
                                    </div>
                                    <div className="table--row pt-2.5 flex justify-between capitalize text-sm leading-[16px]">
                                        <p className="text-light mb-0">{t("recipient_nickname")}</p>
                                        <p className="mb-0">{nickName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 relative">
                                <FormikProvider value={formik}>
                                    <Form>
                                        <BalanceModalTextInputField
                                            name="verifyCode"
                                            size="large"
                                            labelComponent={
                                                <h4 className="text-xs leading-[14px] text-primary m-0 absolute -top-1.5 left-[30px] bg-custom-chart-title px-1.5">
                                                    {t("twoFA_code")}
                                                </h4>
                                            }
                                            canPasteFromClipboard={true}
                                            placeholder={t("enter_your_twoFA_code")}
                                            className="text-base"
                                        />
                                    </Form>
                                </FormikProvider>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="rounded-lg px-[85px] py-[15px] bg-primary hover:bg-opacity-60 text-sm font-bold leading-[16px] text-secondary border-none transition-all duration-300 min-w-[224px] h-[46px] cursor-pointer"
                                onClick={() => {
                                    formik.submitForm();
                                }}
                            >
                                {t("confirm")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransferConfirmModal;
