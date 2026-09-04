import { Spinner } from "@fluentui/react-components";

const LoadingDataIndicator = () => {
    return (
        <div className="h-96 border border-slate-300 rounded-md flex items-center justify-center bg-slate-200/25">
            <div className="flex flex-col gap-1 items-center">
                <Spinner size="small"/>
                <span>
                    chargement
                </span>
            </div>
        </div>
    );
}

export default LoadingDataIndicator;
