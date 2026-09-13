import { BranchForkHint24Regular } from "@fluentui/react-icons";
import ScreenHeader from "../shared/components/ScreenHeader";
import LeadFilter from "./components/lead.filter";
import { useState } from "react";
import LeadForm from "./components/lead.form";
import { useQuery } from "@tanstack/react-query";
import type { PaginationType } from "../shared/shared.types";
import { getAllLeads } from "./lead.api";

const LeadScreen = () => {
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
    const [pagination, setPagination] = useState<PaginationType>({ currentPage: 1, pageSize: 10, totalCount: 0 });

    const { } = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllLeads(),
    });

    return (
        <div className="flex flex-col gap-3 h-full pb-10 overflow-scroll">
            <ScreenHeader Icon={<BranchForkHint24Regular className="text-white" />} title="Gestion des leads" description="voir et gérer l'ensemble des leads"/>

            <LeadFilter />

            <LeadForm clientId={selectedClientId!} isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
        </div>
    );
}

export default LeadScreen;
