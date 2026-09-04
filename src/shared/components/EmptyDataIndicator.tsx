import { tokens } from "@fluentui/react-components";
import { CollectionsEmpty24Regular } from "@fluentui/react-icons";
import type { ReactNode } from "react";

interface EmptyDataIndicatorProps {
    action?: ReactNode
}

const EmptyDataIndicator = ({ action }: EmptyDataIndicatorProps) => {
    return (
        <div className="h-96 border border-slate-300 rounded-md flex flex-col gap-2 items-center justify-center bg-blue-200/25" style={{ backgroundColor: tokens.colorBrandBackground2 }}>
            <div className="flex flex-col gap-1 items-center">
                <CollectionsEmpty24Regular />
                <span>
                    Aucune donnée disponible!
                </span>
            </div>
            {action}
        </div>
    );
}

export default EmptyDataIndicator;
