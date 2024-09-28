import clsx from "clsx";
import { Field, useField } from "formik";
import { useState } from "react";

const InputFieldInChangePassword = ({ type, ...props }) => {
    const [field, meta, helpers] = useField(props);

    const [focused, setFocused] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div
                className={clsx(
                    "block my-2.5 w-full min-h-[48px] mx-0 pt-4 relative",
                    "before:h-0.5 z-[2] before:opacity-0 before:scale-[.12] before:absolute before:bottom-0 before:right-0 before:left-0 before:transition-[border] before:duration-300 before:will-change-[border,opacity,transform] before:content-[' ']",
                    "after:h-[1px] after:absolute after:bottom-0 after:right-0 after:left-0 after:z-[1] after:transition-[border] after:duration-300 after:will-change-[border,opacity,transform] after:content-[' ']",
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <label
                    className={clsx(
                        "static opacity-1 text-text transition-all duration-300 leading-[20px] inline-block mb-2",
                        focused ? "text-xs" : "text-base",
                    )}
                    htmlFor={props.id}
                >
                    {props.label}
                </label>
                <Field
                    {...props}
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    className={clsx(
                        "w-full px-2.5 rounded h-10 leading-none text-[#333] bg-[#fafafa] block border-none transition-[font-size,padding-top,color] duration-[.4s] text-base focus:ring-0",
                        props.className,
                    )}
                />
                {type === "password" && (
                    <button
                        className={clsx(
                            "top-[51px] bottom-1.5 m-0 absolute right-0 w-8 min-w-[32px] h-8 transition-all duration-[.4s] text-[13px] cursor-pointer rounded-full z-[10] font-medium uppercase inline-block p-0 overflow-hidden outline-none bg-transparent align-top whitespace-nowrap",
                            "before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-[1] before:opacity-0 before:transition before:duration-[.4s] before:will-change-[background-color,opacity] before:hover:opacity-[.12]",
                        )}
                        onClick={togglePassword}
                    >
                        <div className="rounded-full py-2 flex items-center justify-center w-full h-full relative z-[10] overflow-hidden [-webkit-mask-image:radial-gradient(circle,#fff_100%,#000_0)]">
                            <div className="relative z-[2]">
                                {showPassword ? (
                                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                                    </svg>
                                ) : (
                                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
                                            fill="none"
                                        ></path>
                                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                                    </svg>
                                )}
                            </div>
                        </div>
                    </button>
                )}
            </div>
            {meta?.touched && meta?.error && (
                <small className="text-danger absolute -bottom-2.5 text-[80%] font-normal">{meta.error}</small>
            )}
            {props.maxLength > 0 && (
                <div className="absolute right-0 -bottom-2 text-xs text-primary">
                    {field.value?.length || 0} / {props.maxLength}
                </div>
            )}
        </>
    );
};

export default InputFieldInChangePassword;
