import { AddCircleRegular, Handshake24Regular } from "@fluentui/react-icons";
import ScreenHeader from "../shared/components/ScreenHeader";
import OfferFilter from "./components/offer.filter";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type PaginationType } from "../shared/shared.types";
import { getAllOffers } from "./offer.api";
import LoadingDataIndicator from "../shared/components/LoadingDataIndicator";
import FetchErrorIndicator from "../shared/components/FetchErrorIndicator";
import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, makeStyles, tokens, type TableColumnDefinition } from "@fluentui/react-components";
import type { OfferRowItemType } from "./offer.types";
import { OFFER_STATUSES } from "./offer.constants";
import { getLocalDateFormat } from "../utils/getLocalDateFormat";
import EmptyDataIndicator from "../shared/components/EmptyDataIndicator";

// -
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

const OfferScreen = () => {
    const styles = useStyles();
    const [offers, setOffers] = useState<OfferRowItemType[]>([]);
    const [pagination, setPagination] = useState<PaginationType>({ currentPage: 1, pageSize: 10, totalCount: 0 });

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['offers'],
        queryFn: () => getAllOffers(pagination, {}),
    });

        // -
    useEffect(() => {
        if (isSuccess) {
            setOffers(data.offers);
            setPagination(data.pagination);
        }
    }, [isSuccess, data]);

    
    const columns: TableColumnDefinition<OfferRowItemType>[] = useMemo<TableColumnDefinition<OfferRowItemType>[]>(() => [
      
            createTableColumn<OfferRowItemType>({
                columnId: "title",
                compare: (a, b) => a.title.localeCompare(b.title),
                renderHeaderCell: () => "Intitulé",
                renderCell: (item) => item.title,
            }),
            createTableColumn<OfferRowItemType>({
                columnId: "companyName",
                compare: (a, b) =>  (a.client.companyName && b.client.companyName) ? a.client.companyName.localeCompare(b.client.companyName) : 0,
                renderHeaderCell: () => "Entreprise",
                renderCell: (item) => item.client.type === "ENTREPRISE" ? item.client.companyName : "",
            }),
            createTableColumn<OfferRowItemType>({
                columnId: "contactName",
                compare: (a, b) => a.client.contactName.localeCompare(b.client.contactName),
                renderHeaderCell: () => "Contact",
                renderCell: (item) => item.client.contactName,
            }),
            createTableColumn<OfferRowItemType>({
                columnId: "deadline",
                compare: (a, b) => a.deadline.localeCompare(b.deadline),
                renderHeaderCell: () => "Service",
                renderCell: (item) => getLocalDateFormat(item.deadline),
            }),
            createTableColumn<OfferRowItemType>({
                columnId: "status",
                compare: (a, b) => a.status.localeCompare(b.status),
                renderHeaderCell: () => "Statut",
                renderCell: (item) => OFFER_STATUSES[item.status],
            }),
        ], 
    []);

    // -
    const renderContent = () => {
        if(isLoading) {
            return <LoadingDataIndicator />
        }

        if(isError) {
            return <FetchErrorIndicator />
        }

        if(isSuccess) {
            if(offers && offers.length > 0) {
                return (
                    <div className="border border-slate-300 rounded-md">
                        <div className="bg-slate-900 p-4 rounded-t-md" style={{ backgroundColor: tokens.colorBrandBackground2}}>
                            <h2>
                                <span className="font-semibold text-lg">Liste des offres</span>
                                <section className="flex float-right gap-2">
                                    <Button className={styles.exportBtn} icon={<AddCircleRegular />}>Export CSV</Button>
                                </section>
                            </h2>
                        </div>

                        <DataGrid items={offers} columns={columns} sortable className="p-4">
                            <DataGridHeader>
                                <DataGridRow>
                                    {({ renderHeaderCell }) => (
                                        <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                                    )}
                                </DataGridRow>
                            </DataGridHeader>

                            <DataGridBody<OfferRowItemType>>
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
    };

    return (
        <div className="flex flex-col gap-3 h-full pb-10 overflow-scroll">
            <ScreenHeader Icon={<Handshake24Regular />} title="Offres" description="Voir et gérer l'ensemble des offres"/>
            <OfferFilter />

            {renderContent()}
        </div>
    );
}

export default OfferScreen;
