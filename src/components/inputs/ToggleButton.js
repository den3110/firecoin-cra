import clsx from "clsx";

const ToggleButton = ({ checked, onChange }) => {
    const handleChange = (e) => {
        e.preventDefault();

        onChange?.(!checked);
    };

    return (
        <div className="flex">
            <span className="inline-block leading-[25px] px-[5px] text-light text-[15px] font-bold uppercase">Off</span>
            <div
                className={clsx(
                    "block overflow-hidden w-[55px] h-[25px] rounded-[25px] border border-text relative cursor-pointer",
                    {
                        "bg-secondary-400": !checked,
                        "bg-up": checked,
                    },
                )}
                onClick={handleChange}
            >
                <div
                    className={clsx(
                        "absolute top-[2px] left-[2px] block overflow-hidden w-[20px] h-[20px] rounded-full bg-light transition-transform",
                        {
                            "translate-x-[30px]": checked,
                            "translate-x-0": !checked,
                        },
                    )}
                ></div>
            </div>
            <span className="inline-block leading-[25px] px-[5px] text-light text-[15px] font-bold uppercase">On</span>
        </div>
    );
};

export default ToggleButton;
