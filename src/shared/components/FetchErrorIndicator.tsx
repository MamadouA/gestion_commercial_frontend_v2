import { ErrorCircleHint24Regular } from "@fluentui/react-icons";

const FetchErrorIndicator = () => {
    return (
        <div className="h-96 border border-slate-300 rounded-md flex items-center justify-center bg-red-200/25">
            <div className="flex flex-col gap-1 items-center">
                <ErrorCircleHint24Regular />
                <span>
                    Une erreur s'est produite. Veuillez réessayer!
                </span>
            </div>
        </div>
    );
}

export default FetchErrorIndicator;
