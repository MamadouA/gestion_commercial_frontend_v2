import { tokens } from "@fluentui/react-components";
import type { ReactNode } from "react";

interface ScreenHeaderProps {
    Icon: ReactNode,
    title: string
    description: string
    action?: ReactNode
}

const ScreenHeader = (props: ScreenHeaderProps) => {
    return (
        <div className="flex bg-gray-50 p-5 border border-slate-300 rounded-md text-white" style={{ backgroundColor: tokens.colorBrandBackground }}>
            <div className="flex items-center gap-2">
                <div className="bg-slate-900 w-12 h-12 flex items-center justify-center rounded-md">
                    {props.Icon}
                </div>
                <h1 className="flex flex-col">
                    <span className="font-bold text-xl">{props.title}</span>
                    <span>{props.description}</span>
                </h1>
            </div>
        </div>
    );
}

export default ScreenHeader;
