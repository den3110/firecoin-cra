import clsx from "clsx";

const Button = ({ className, type = "primary", size = "normal", ...props }) => {
    return (
        <button
            {...props}
            type={props.htmltype || "button"}
            className={clsx(className, {
                "bg-gradient-primary": !type || type === "primary",
                "bg-secondary-400": type === "secondary",

                "text-lg px-5 py-[11px]": size === "large",
                "px-6 text-sm leading-[2.71428571]": size === "normal",

                "rounded-[0.625rem] text-secondary-50": true,
            })}
        />
    );
};

export default Button;
