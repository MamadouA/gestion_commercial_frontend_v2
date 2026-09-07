import { useQuery } from "@tanstack/react-query";
import { getProspectionsStats } from "../prospection.api";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { PROSPECTIONS_STATUSES } from "../prospection.constants";
import type { ProspectionStatusType } from "../prospection.types";
import ToastAlerte from "../../shared/components/ToastAlerte";
import DistributionIndicator from "../../shared/components/DistributionIndicator";
import { getStatusStyle } from "../../utils/getStatusStyle";
import { TextAlignJustifyLowFilled } from "@fluentui/react-icons";


const ProspectionStats = () => {
    const [stats, setStats] = useState<{ status: ProspectionStatusType, ratio: number }[]>([
        { status: 'OPENED', ratio: 0 },
        { status: 'WON', ratio: 0 },
        { status: 'LOST', ratio: 0 },
    ]);

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['prospectionStats'],
        queryFn: () => getProspectionsStats()
    });

    
    // -
    useEffect(() => {
        if (isSuccess) {
            setStats(data);
        }
    }, [isSuccess, data]);

    console.log(data)
    return (
        <div>
            <ToastAlerte isVisible={isError} status="error" message="Une erreur s'est produite. Veuillez réessayer!" />
            <Skeleton hidden={!isLoading}>
                <SkeletonItem className="h-96" size={92}/>
            </Skeleton>

            {
                isSuccess && (
                    <div className="flex flex-col gap-2 px-8 border border-slate-300 rounded-md p-7">
                        <h3 className="font-semibold text-xl flex gap-2 items-center">
                            <TextAlignJustifyLowFilled />
                            <span>Répartitions des prospections</span>
                        </h3>
                        <DistributionIndicator className={getStatusStyle(stats[0].status)} title={PROSPECTIONS_STATUSES[stats[0].status]} ratio={stats[0].ratio} />
                        <DistributionIndicator className={getStatusStyle(stats[1].status)} title={PROSPECTIONS_STATUSES[stats[1].status]} ratio={stats[1].ratio} />
                        <DistributionIndicator className={getStatusStyle(stats[2].status)} title={PROSPECTIONS_STATUSES[stats[2].status]} ratio={stats[2].ratio} />
                    </div>
                )
            }
        </div>
    );
}

export default ProspectionStats;
