import { forwardRef } from "react";
import CustomToast from "@/components/toasts/CustomToast";

const ErrorToast = forwardRef(({ customType, ...props }, ref) => {
    return <CustomToast ref={ref} customType="error" {...props} />;
});

ErrorToast.displayName = "ErrorToast";
export default ErrorToast;
