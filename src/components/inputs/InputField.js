import BaseField from "@/components/inputs/BaseField";
import { Field, useField } from "formik";
import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const InputField = ({ hideErrors, ...props }) => {
    const t = useTranslations();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [field, meta, helpers] = useField(props);

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePaste = (e) => {
        e.preventDefault();

        if (!navigator.clipboard) {
            console.log("Clipboard API not available");
            return;
        }

        navigator.clipboard.readText().then((text) => {
            return helpers.setValue(text);
        });
    };

    const newType = passwordVisible ? "text" : props.type;

    return (
        <BaseField {...props}>
            <Field
                {...props}
                type={newType}
                className={clsx(
                    "w-full rounded-lg border-light-100 bg-transparent px-2.5 text-light font-normal text-sm focus:ring-0 focus:border-light-100",
                    {
                        "h-[45px] leading-[45px]": !props.size || props.size === "md" || props.size === "profile",

                        "border-b-2 border-b-danger focus:border-light-100 focus:border-b-danger":
                            !hideErrors && meta.touched && meta?.error,
                    },
                    "disabled:bg-[#707070]/[.23] disabled:text-[#8b8d96]",
                    props.className,
                )}
            />
            <div className="absolute right-2 top-3">
                {props.type === "password" && (
                    <FontAwesomeIcon
                        icon={passwordVisible ? faEyeSlash : faEyeSlash}
                        className="w-6 h-6 text-light-100 cursor-pointer"
                        onClick={handlePasswordVisibility}
                    />
                )}
                {props.paste && (
                    <a href="#" onClick={handlePaste} className="text-text-paste">
                        {t("paste")}
                    </a>
                )}
            </div>
            {!hideErrors && meta?.touched && meta?.error && (
                <div
                    className={clsx("italic pl-2 text-danger text-xs", {
                        "absolute left-0 bottom-1": !props.newLineError,
                    })}
                >
                    {meta.error}
                </div>
            )}
            {props.maxLength > 0 && (
                <div className="absolute right-0 mt-1 text-xs text-primary">
                    {field.value.length} / {props.maxLength}
                </div>
            )}
        </BaseField>
    );
};

export default InputField;
