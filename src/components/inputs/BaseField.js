import clsx from "clsx";

const BaseField = ({ children, label, baseClassName, ...props }) => {
    return (
        <div
            className={clsx(
                "text-light-50 flex flex-col",
                {
                    "mt-2.5 mb-2 pt-4": !props.size || props.size === "md",
                    "": props.size === "profile",
                },
                baseClassName,
            )}
        >
            {label && (
                <label htmlFor={props.id} className={clsx("text-sm", {
                    "mb-1 text-light/40": props.size === "profile",
                    "px-[5px] mb-2": props.size !== "profile"
                })}>
                    {label} {props.required ? "*" : null}
                </label>
            )}
            <div className="relative w-full">{children}</div>
        </div>
    );
};

export default BaseField;
