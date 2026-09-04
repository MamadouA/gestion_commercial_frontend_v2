import type { ReactNode } from "react";

interface ProtectedViewProps {
    requiredPermission: string
    children: ReactNode
}

const ProtectedView = ({ requiredPermission, children }: ProtectedViewProps) => {
    const currentPermission = "user.read";

    if(currentPermission !== requiredPermission) return null;

    return (
        <>{children}</>
    );
}

export default ProtectedView;
