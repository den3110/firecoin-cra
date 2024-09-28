import { SnackbarContent, useSnackbar } from "notistack";
import { forwardRef } from "react";
import clsx from "clsx";

const CustomToast = forwardRef(({ customType, ...props }, ref) => {
    const { id, message, allowDownload, ...other } = props;

    const { closeSnackbar } = useSnackbar();

    return (
        <SnackbarContent ref={ref} role="alert" {...other}>
            <div style={{ marginRight: 20 }}>
                <div
                    className={clsx("relative min-w-[200px] bg-secondary-600 text-light rounded-[5px] border", {
                        "border-danger/10": customType === "error",
                        "border-success/10": customType === "success",
                    })}
                >
                    <div className="py-[13.5px] px-5">
                        <div className="flex items-center">
                            <div>
                                <span className={clsx("rounded-full inline-flex w-[31px] h-[31px] items-center justify-center", {
                                    "bg-danger": customType === "error",
                                    "bg-success": customType === "success",
                                })}>
                                    {customType === "error" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            data-prefix="fas"
                                            data-icon="times"
                                            role="img"
                                            viewBox="0 0 352 512"
                                            className="w-[11px]"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                            />
                                        </svg>
                                    )}
                                    {customType === "success" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            data-prefix="fas"
                                            data-icon="check"
                                            role="img"
                                            viewBox="0 0 512 512"
                                            className="w-[16px]"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </div>
                            <div className="ml-2">
                                <div className="h-full w-full relative ">
                                    <span className="text-base">{message}</span>
                                </div>
                            </div>
                        </div>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={34}
                                height={34}
                                viewBox="0 0 34 34"
                                className="flex rounded-full items-center justify-center absolute w-[30px] h-[30px] right-[-35px] top-0 bg-light/30 cursor-pointer"
                            >
                                <g
                                    onClick={() => closeSnackbar(id)}
                                    id="Group_11134"
                                    data-name="Group 11134"
                                    transform="translate(-1268 -28)"
                                >
                                    <circle
                                        id="Ellipse_201"
                                        data-name="Ellipse 201"
                                        cx={17}
                                        cy={17}
                                        r={17}
                                        transform="translate(1268 28)"
                                        opacity="0.081"
                                    />
                                    <g id="e-remove" transform="translate(1278.49 38.49)">
                                        <path
                                            id="Path_13784"
                                            data-name="Path 13784"
                                            d="M13.742,1.279a.9.9,0,0,0-1.3,0L7.51,6.208,2.581,1.279a.9.9,0,0,0-1.3,0,.9.9,0,0,0,0,1.3L6.208,7.51,1.279,12.44a.9.9,0,0,0,0,1.3.844.844,0,0,0,.651.279.844.844,0,0,0,.651-.279L7.51,8.813l4.929,4.929a.9.9,0,0,0,1.3,0,.9.9,0,0,0,0-1.3L8.813,7.51l4.929-4.929A.9.9,0,0,0,13.742,1.279Z"
                                            transform="translate(-1 -1)"
                                            fill="#fff"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </SnackbarContent>
    );
});
CustomToast.displayName = "CustomToast";

export default CustomToast;
