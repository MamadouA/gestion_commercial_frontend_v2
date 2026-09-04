import { Dashboard20Regular } from "@fluentui/react-icons";
import ScreenHeader from "../shared/components/ScreenHeader";

const DashboardScreen = () => {
    return (
        <div className="flex flex-col gap-4">
            <ScreenHeader Icon={<Dashboard20Regular className="text-white" />} title="Dashboard" description="Visualiser les indicateurs de votre entreprise"/>
            DashboardScreen
        </div>
    );
}

export default DashboardScreen;
