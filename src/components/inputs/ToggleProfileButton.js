import { Switch } from "@headlessui/react";
import clsx from "clsx";

const ToggleProfileButton = ({ checked, onChange }) => {
    const handleChange = (value) => {
        onChange?.(value);
    };

    return (
        <Switch checked={checked} onChange={handleChange}>
            <div
                className={clsx(
                    "block overflow-hidden relative w-[60px] h-[26px] rounded-[13px] cursor-pointer min-[768px]:text-right transition-colors duration-300",
                    {
                        "border border-[#8b8b8b] bg-[#bababa] before:content-[''] before:absolute before:top-0 before:left-0 before:z-[2] before:block before:overflow-hidden before:w-full before:h-full":
                            !checked,
                        "border border-success-50 bg-success-50": checked,
                    },
                )}
            >
                <span
                    className={clsx(
                        "text-light text-[10px] absolute top-1/2 -translate-y-[48%] font-bold opacity-1",
                        !checked ? "left-[calc(100%-27px)]" : "left-[12px]",
                    )}
                >
                    {checked ? "On" : "Off"}
                </span>
                <div
                    className={clsx(
                        "shadow-[0_4px_12px_rgba(0,0,0,.08)] absolute top-[3px] z-[2] bg-light rounded-[100%] w-5 h-5 transition-[left] duration-300",
                        {
                            "left-[4px]": !checked,
                            "left-[calc(100%-24px)]": checked,
                        },
                    )}
                ></div>
            </div>
        </Switch>
    );
};

export default ToggleProfileButton;
