import { ChannelShare24Regular, AddCircleRegular, BranchForkHint20Regular, Handshake20Regular, EyeCircle20Regular } from "@fluentui/react-icons";
import ScreenHeader from "../shared/components/ScreenHeader";
import ClientFilter from "./components/client.filter";
import { useQuery } from '@tanstack/react-query';
import { useClientStore } from "./client.store";
import { getAllClients } from "./client.api";
import LoadingDataIndicator from "../shared/components/LoadingDataIndicator";
import FetchErrorIndicator from "../shared/components/FetchErrorIndicator";
import EmptyDataIndicator from "../shared/components/EmptyDataIndicator";
import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, makeStyles, TableCellActions, TableCellLayout, tokens, Tooltip, type TableColumnDefinition } from "@fluentui/react-components";
import type { ClientRowItemType } from "./client.types";
import { useEffect, useMemo, useState } from "react";
import ClientForm from "./components/client.form";
import ProspectionForm from "../prospection/components/prospection.form";
import type { PaginationType } from "../shared/shared.types";

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


const ClientScreen = () => {
    const styles = useStyles();
    const { clients, setClients } = useClientStore();
    const [isClientFormOpen, setIsClientFormOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [isProspectionFormOpen, setIsProspectionFormOpen] = useState(false);
    const [pagination, setPagination] = useState<PaginationType>({ currentPage: 1, pageSize: 10, totalCount: 0 });

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients({ currentPage: pagination.currentPage, pageSize: pagination.pageSize }),
    });

    // -
    const columns = useMemo<TableColumnDefinition<ClientRowItemType>[]>(() => [
        createTableColumn<ClientRowItemType>({
            columnId: "id",
            compare: (a, b) => a.id - b.id,
            renderHeaderCell: () => "Ref",
            renderCell: (item) => `${item.createdAt.split("-")[0]}-C-${item.id}`,
        }),
        createTableColumn<ClientRowItemType>({
            columnId: "companyName",
            compare: (a, b) => (a.companyName && b.companyName) ? a.companyName.localeCompare(b.companyName) : 0,
            renderHeaderCell: () => "Entreprise",
            renderCell: (item) => item.companyName,
        }),
        createTableColumn<ClientRowItemType>({
            columnId: "contactName",
            compare: (a, b) => a.contactName.localeCompare(b.contactName),
            renderHeaderCell: () => "Contact",
            renderCell: (item) => <TableCellLayout truncate>{item.contactName}</TableCellLayout>
        }),
        createTableColumn<ClientRowItemType>({
            columnId: "email",
            compare: (a, b) => a.email.localeCompare(b.email),
            renderHeaderCell: () => "Email",
            renderCell: (item) => <TableCellLayout truncate>{item.email}</TableCellLayout>,
        }),
        createTableColumn<ClientRowItemType>({
            columnId: "phone",
            compare: (a, b) => a.phone.localeCompare(b.phone),
            renderHeaderCell: () => "Téléphone",
            renderCell: (item) => item.phone,
        }),
        createTableColumn<ClientRowItemType>({
            columnId: "type",
            compare: (a, b) => a.type.localeCompare(b.type),
            renderHeaderCell: () => "Type",
            renderCell: (item) => item.type[0].concat(item.type.slice(1).toLowerCase()),
        }),
        createTableColumn({
            columnId: "actions",
            renderCell: (item) => (
                <TableCellActions>
                    <Tooltip relationship="label" content="Nouvelle prospection">
                        <Button icon={<BranchForkHint20Regular />} appearance="subtle" onClick={() => {
                            setSelectedClientId(item.id);
                            setIsProspectionFormOpen(true)
                        }} />
                    </Tooltip>

                    <Tooltip relationship="label" content="Nouvelle offre">
                        <Button icon={<Handshake20Regular />} appearance="subtle" />
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
            setClients(data.clients);
        }
    }, [isSuccess, data]);

    const renderContent = () => {
        if(isLoading) {
            return <LoadingDataIndicator />
        }

        if(isError) {
            return <FetchErrorIndicator />
        }

        if(isSuccess) {
            if(clients && clients.length > 0) {
                return (
                    <div className="border border-slate-300 rounded-md">
                        <div className="bg-slate-900 p-4 rounded-t-md" style={{ backgroundColor: tokens.colorBrandBackground2}}>
                            <h2>
                                <span className="font-semibold text-lg">Liste des clients</span>
                                <section className="flex float-right gap-2">
                                    <Button className={styles.exportBtn} icon={<AddCircleRegular />}>Export CSV</Button>
                                    <Button appearance="primary" icon={<AddCircleRegular />} onClick={() => setIsClientFormOpen(true)}>Nouveau</Button>
                                </section>
                            </h2>
                        </div>

                        <DataGrid items={clients} columns={columns} sortable className="p-4">
                            <DataGridHeader>
                                <DataGridRow>
                                    {({ renderHeaderCell }) => (
                                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                                    )}
                                </DataGridRow>
                            </DataGridHeader>

                            <DataGridBody<ClientRowItemType>>
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

            return <EmptyDataIndicator action={<Button appearance="primary" icon={<AddCircleRegular />} onClick={() => setIsClientFormOpen(true)}>Nouveau client</Button>}/>
        }
    }
    
    return (
        <div className="flex flex-col gap-3 h-full pb-10 overflow-scroll">
            <ScreenHeader Icon={<ChannelShare24Regular className="text-white" />} title="Gestion des clients" description="voir et gérer l'ensemble de vos clients"/>

            <ClientFilter />

            {renderContent()}

            {/* Modals */}
            <ClientForm isOpen={isClientFormOpen} 
                onClose={() => {
                    setIsClientFormOpen(false)
                }} 
            />

            <ProspectionForm isOpen={isProspectionFormOpen} clientId={selectedClientId!}
                onClose={() => {
                    setIsProspectionFormOpen(false)
                }}
            />
        </div>
    );
}

export default ClientScreen;
