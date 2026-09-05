import { Toast, Toaster, ToastTitle, useId, useToastController } from "@fluentui/react-components";
import { useEffect } from "react";

interface ToastAlerteProps {
    isVisible: boolean,
    status: "success" | "error",
    message: string
}

const ToastAlerte = ({ isVisible, status, message }: ToastAlerteProps) => {
    const toasterId = useId('toaster');
    const { dispatchToast} = useToastController(toasterId);

    useEffect(() => {
        if(isVisible) notify(status);
    }, [isVisible]);

    const notify = (status: "success" | "error") => 
        dispatchToast(
                <Toast>
                <ToastTitle>{message}</ToastTitle>
            </Toast>  ,
            { intent: status }
        )

    return (
        <Toaster toasterId={toasterId} position="top-end"/>
    );
}

export default ToastAlerte;
