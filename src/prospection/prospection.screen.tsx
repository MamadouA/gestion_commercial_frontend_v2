import { useQuery } from "@tanstack/react-query";
import { getAllProspections } from "./prospection.api";
import type { PaginationType } from "../shared/shared.types";
import { useEffect, useMemo, useState } from "react";
import type { ProspectionRowItemType } from "./prospection.types";
import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, makeStyles, TableCellActions, TableCellLayout, tokens, Tooltip, type TableColumnDefinition } from "@fluentui/react-components";
import { AddCircleRegular, BranchForkHint20Regular, BranchForkHint24Regular, EyeCircle20Regular } from "@fluentui/react-icons";
import LoadingDataIndicator from "../shared/components/LoadingDataIndicator";
import FetchErrorIndicator from "../shared/components/FetchErrorIndicator";
import EmptyDataIndicator from "../shared/components/EmptyDataIndicator";
import ScreenHeader from "../shared/components/ScreenHeader";
import ProspectionFilter from "./components/prospection.filter";
import ProspectionStats from "./components/prospection.stats";
import { PROSPECTIONS_STATUSES } from "./prospection.constants";
import { getLocalDateFormat } from "../utils/getLocalDateFormat";

const useStyles = makeStyles({
  exportBtn: {
    color: "white",
    backgroundColor: "#087F5B",

    ":hover": {
      color: "white",
      backgroundColor: "#066A4C",
    },

    ":active": { 
        color: "white !important",
        backgroundColor: '#087F5B !important',
    }   
  },
});

const ProspectionScreen = () => {
    const styles = useStyles();
    const [pagination, setPagination] = useState<PaginationType>({ currentPage: 1, pageSize: 10, totalCount: 0 });
    const [prospections, setProspections] = useState<ProspectionRowItemType[]>([]);
    const [isProspectionFormOpen, setIsProspectionFormOpen] = useState(false);
    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['prospection'],
        queryFn: () => getAllProspections({ currentPage: pagination.currentPage, pageSize: pagination.pageSize })
    });

    // -
    const columns = useMemo<TableColumnDefinition<ProspectionRowItemType>[]>(() => [
            createTableColumn<ProspectionRowItemType>({
                columnId: "id",
                compare: (a, b) => a.id - b.id,
                renderHeaderCell: () => "Ref",
                renderCell: (item) => `${item.createdAt.split("-")[0]}-P-${item.id}`,
            }),
            createTableColumn<ProspectionRowItemType>({
                columnId: "service",
                compare: (a, b) => (a.service && b.service) ? a.service.localeCompare(b.service) : 0,
                renderHeaderCell: () => "Service",
                renderCell: (item) => item.service,
            }),
            createTableColumn<ProspectionRowItemType>({
                columnId: "Echéance",
                compare: (a, b) => a.deadline.localeCompare(b.deadline),
                renderHeaderCell: () => "Contact",
                renderCell: (item) => <TableCellLayout truncate>{getLocalDateFormat(item.deadline)}</TableCellLayout>
            }),
            createTableColumn<ProspectionRowItemType>({
                columnId: "client",
                compare: (a, b) => a.client.type === "ENTREPRISE" ? a.client.companyName.localeCompare(b.client.companyName) : a.client.contactName.localeCompare(b.client.contactName),
                renderHeaderCell: () => "Email",
                renderCell: (item) => <TableCellLayout truncate>{item.client.type === "ENTREPRISE" ? item.client.companyName : item.client.contactName}</TableCellLayout>,
            }),
            createTableColumn<ProspectionRowItemType>({
                columnId: "author",
                compare: (a, b) => a.author.fullname.localeCompare(b.author.fullname),
                renderHeaderCell: () => "Créé par",
                renderCell: (item) => item.author.fullname,
            }),
            createTableColumn<ProspectionRowItemType>({
                columnId: "status",
                compare: (a, b) => a.status.localeCompare(b.status),
                renderHeaderCell: () => "Statut",
                renderCell: (item) => PROSPECTIONS_STATUSES[item.status],
            }),
            createTableColumn({
                columnId: "actions",
                renderCell: (item) => (
                    <TableCellActions>
                        <Tooltip relationship="label" content="Nouvelle prospection">
                            <Button icon={<BranchForkHint20Regular />} appearance="subtle" onClick={() => {
                               
                            }} />
                        </Tooltip>
                        
                        <Tooltip relationship="label" content="Détails du client">   
                            <Button icon={<EyeCircle20Regular />} appearance="subtle" />
                        </Tooltip>
                    </TableCellActions> 
                )
            })
        ], []);
    

    // -
    useEffect(() => {
        if(isSuccess && data) {
            setProspections(data.prospections);
        }
    }, [isSuccess, data]);
    
    // -
    const renderContent = () => {
        if(isLoading) {
            return <LoadingDataIndicator />
        }

        if(isError) {
            return <FetchErrorIndicator />
        }

        if(isSuccess) {
            if(prospections && prospections.length > 0) {
                return (
                    <div className="border border-slate-300 rounded-md">
                        <div className="bg-slate-900 p-4 rounded-t-md" style={{ backgroundColor: tokens.colorNeutralBackground2}}>
                            <h2>
                                <span className="font-semibold text-lg">Liste des prospections</span>
                                <section className="flex float-right gap-2">
                                    <Button className={styles.exportBtn} icon={<AddCircleRegular />}>Export CSV</Button>
                                    <Button appearance="primary" icon={<AddCircleRegular />} onClick={() => setIsProspectionFormOpen(true)}>Nouveau</Button>
                                </section>
                            </h2>
                        </div>

                        <DataGrid items={prospections} columns={columns} sortable className="p-4">
                            <DataGridHeader>
                                <DataGridRow>
                                    {({ renderHeaderCell }) => (
                                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                                    )}
                                </DataGridRow>
                            </DataGridHeader>

                            <DataGridBody<ProspectionRowItemType>>
                                {({ item, rowId }) => (
                                    <DataGridRow key={rowId}>
                                        {({ renderCell }) => (
                                            <DataGridCell>{renderCell(item)}</DataGridCell>
                                        )}
                                    </DataGridRow>
                                )}
                            </DataGridBody>
                            <div className="h-10 rounded-b-md flex justify-center items-center">
                                pagination here
                            </div>
                        </DataGrid>
                    </div>
                )
            }

            return <EmptyDataIndicator />
        }
    }

    return (
        <div className="flex flex-col gap-3 h-full pb-10 overflow-scroll">
            <ScreenHeader Icon={<BranchForkHint24Regular className="text-white" />} title="Gestion des prospections" description="voir et gérer l'ensemble des prospections"/>
            <ProspectionStats />
            <ProspectionFilter />
            {renderContent()}
        </div>
    );
}

export default ProspectionScreen;
