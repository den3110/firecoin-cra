import clsx from "clsx";

const BaseRadioInput = ({ className, ...props }) => {
    return (
        <span>
            <input type="radio" className="hidden" {...props}></input>
            <span
                className={clsx("relative inline-block bg-light/30 w-[19px] h-[19px] rounded-full", {
                    "after:content-[''] after:inline-block after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-1/2 after:h-1/2 after:bg-primary after:brightness-[130%] after:rounded-full":
                        props.checked,
                })}
            ></span>
        </span>
    );
};

export default BaseRadioInput;
