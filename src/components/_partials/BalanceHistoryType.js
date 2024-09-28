import { useTranslation } from "react-i18next";
import clsx from "clsx";

const BalanceHistoryType = ({ ts, tsTxid, withoutPadding = false }) => {
    const {t } = useTranslation();

    let tsTxidDescription = null;
    switch (ts.type) {
        case "InternalDeposit":
            tsTxidDescription = (
                <span className={clsx("inline-block", { "px-2.5 py-[15px]": !withoutPadding })}>{`${t("from")}: ${
                    tsTxid.TransactionId
                }`}</span>
            );
            break;
        case "Deposit":
            tsTxidDescription = (
                <a
                    href={`https://bscscan.com/tx/${tsTxid.TransactionId}`}
                    target="_blank"
                    className={clsx(
                        "inline-block w-full text-primary hover:text-light hover:no-underline whitespace-nowrap overflow-hidden text-ellipsis",
                        {
                            "px-2.5 py-[15px] underline": !withoutPadding,
                        },
                    )}
                >
                    {tsTxid.TransactionId}
                </a>
            );
            break;
        case "InternalWithdraw":
            tsTxidDescription = (
                <span
                    className={clsx("inline-block", {
                        "px-2.5 py-[15px]": !withoutPadding,
                    })}
                >{`${t("to")}: ${tsTxid.ReceiverNickName}`}</span>
            );
            break;
        case "Withdraw":
            tsTxidDescription = (
                <a
                    href={`https://bscscan.com/tx/${tsTxid.TransactionId}`}
                    target="_blank"
                    className={clsx(
                        "inline-block w-full text-primary hover:text-light hover:no-underline whitespace-nowrap overflow-hidden text-ellipsis",
                        {
                            "px-2.5 py-[15px] underline": !withoutPadding,
                        },
                    )}
                >
                    {tsTxid.TransactionId}
                </a>
            );
            break;
    }

    return tsTxidDescription;
};

export default BalanceHistoryType;
