import CloseIcon from "@/components/CloseIcon";

const ToastCloseIcon = ({ closeToast }) => {
    const handleClose = (e) => {
        e.preventDefault();

        closeToast();
    };

    return (
        <a href="#" onClick={handleClose}>
            <CloseIcon />
        </a>
    );
};

export default ToastCloseIcon;
