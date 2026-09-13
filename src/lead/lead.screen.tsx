import { BranchForkHint24Regular } from "@fluentui/react-icons";
import ScreenHeader from "../shared/components/ScreenHeader";
import LeadFilter from "./components/lead.filter";

const LeadScreen = () => {
    return (
        <div className="flex flex-col gap-3 h-full pb-10 overflow-scroll">
            <ScreenHeader Icon={<BranchForkHint24Regular className="text-white" />} title="Gestion des leads" description="voir et gérer l'ensemble des leads"/>

            <LeadFilter />
        </div>
    );
}

export default LeadScreen;
