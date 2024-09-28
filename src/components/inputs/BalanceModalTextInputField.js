import { Field, useField } from "formik";
import clsx from "clsx";

const BalanceModalTextInputField = ({
    postfix,
    labelComponent = null,
    labelInHtml = null,
    canPasteFromClipboard = false,
    size = "base",
    ...props
}) => {
    const { label, className, ...extraProps } = props;

    const [field, meta, helpers] = useField(props);

    const handlePasteFromClipboard = (e) => {
        e.preventDefault();

        if (!navigator.clipboard) {
            console.log("Clipboard API not available");
            return;
        }

        navigator.clipboard.readText().then((text) => {
            return helpers.setValue(text);
        });
    };

    return (
        <div className="mb-5 relative">
            {labelInHtml ? (
                <h4
                    className="text-[#778e9f] text-xs leading-[14px] font-normal m-0 absolute -top-[6px] left-[30px] px-1.5 bg-secondarySidebar"
                    dangerouslySetInnerHTML={{ __html: labelInHtml }}
                ></h4>
            ) : (
                label && (
                    <h4 className="text-[#778e9f] text-xs leading-[14px] font-normal m-0 absolute -top-[6px] left-[30px] px-1.5 bg-secondarySidebar">
                        {label}
                    </h4>
                )
            )}
            {labelComponent}
            <Field
                {...extraProps}
                className={clsx(
                    "bg-transparent border border-light/[.23] rounded-lg h-[46px] leading-[46px] mb-0 text-light transition-[border-color] w-full focus:ring-0",
                    {
                        "text-sm": size === "base",
                        "text-base": size === "large",
                    },
                    className,
                )}
            />
            {postfix}
            {canPasteFromClipboard && (
                <span
                    className="block cursor-pointer top-1/2 -translate-y-1/2 text-sm leading-[20px] h-5 absolute right-[14px] text-up"
                    onClick={handlePasteFromClipboard}
                >
                    Paste
                </span>
            )}
        </div>
    );
};

export default BalanceModalTextInputField;
