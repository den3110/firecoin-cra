import dayjs from "dayjs";

export default class Formatter {
    static formatCurrency(amount, currency = "USD", pretty = false) {
        if (pretty && amount > 1000) {
            return (
                new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency,
                    minimumFractionDigits: 2,
                }).format(amount / 1000) + "K"
            );
        }

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(amount);
    }

    static formatNumber(amount, fraction = 0, pretty = false) {
        if (pretty && amount > 1000) {
            return (
                new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                }).format(amount / 1000) + "K"
            );
        }

        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: fraction,
        }).format(amount);
    }

    static formatLocalTime(date) {
        return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
    }

    static formatHistoryTime(date) {
        return dayjs(date).format("DD/MM/YY HH:mm");
    }
}
