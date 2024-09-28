import { forwardRef } from "react";
import CustomToast from "@/components/toasts/CustomToast";

const SuccessToast = forwardRef(({ customType, ...props }, ref) => {
    return <CustomToast ref={ref} customType="success" {...props} />;
});

SuccessToast.displayName = "ErrorToast";
export default SuccessToast;
