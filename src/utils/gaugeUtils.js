export const convertTextValueMeter = (t) => {
    return t >= -90 && t <= -54
        ? "Strong sell"
        : t > -54 && t <= -18
            ? "Sell"
            : t > -18 && t <= 17
                ? "Neutral"
                : t > 17 && t <= 53
                    ? "Buy"
                    : t > 53
                        ? "Strong Buy"
                        : void 0;
};