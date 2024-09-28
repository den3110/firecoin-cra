"use client";

import { SnackbarProvider } from "notistack";
import ErrorToast from "@/components/toasts/ErrorToast";
import SuccessToast from "@/components/toasts/SuccessToast";

const SnackbarContainerProvider = ({ children }) => (
    <SnackbarProvider
        Components={{
            error: ErrorToast,
            success: SuccessToast,
        }}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        maxSnack={10}
        autoHideDuration={2000}
        classes={{ containerRoot: "z-alert" }}
    >
        {children}
    </SnackbarProvider>
);

export default SnackbarContainerProvider;
