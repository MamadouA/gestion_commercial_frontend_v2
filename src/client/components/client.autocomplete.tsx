import { Combobox, Field, makeStyles, useComboboxFilter, type ComboboxProps } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import type { PaginationType } from '../../shared/shared.types';
import { useQuery } from '@tanstack/react-query';
import { getAllClients } from '../client.api';
import type { ClientRowItemType } from '../client.types';

const useStyles = makeStyles({
    input: {
        "& input:focus": {
            border: "1px solid #42749A",
            borderRadius: "5px",
            boxSizing: "border-box"
        },
        ":after": {
            display: "none",
        }
    }
})

interface ClientAutocompleteProps { 
    query: string
    onQueryChange: (query: string) => void
    onSelect: (clientId: number | null) => void
}

const ClientAutocomplete = ({ query, onQueryChange, onSelect }: ClientAutocompleteProps) => {
    const styles = useStyles();
    const [options, setOptions] = useState<{ children: string; value: string }[]>([]);
    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['clients'],
        queryFn: () => getAllClients({ currentPage: 1, pageSize: 10 }),
    });

    // -
    const clients = data?.clients ?? [];

    const children = useComboboxFilter(query, options, {
        noOptionsMessage: "Aucun client ne corresspond",
    });
    const onOptionSelect: ComboboxProps["onOptionSelect"] = (_, data) => {
        onQueryChange(data.optionText ?? "");
        onSelect(clients.find((client: ClientRowItemType) => client.type === "ENTREPRISE" ? client.companyName === data.optionText : client.contactName === data.optionText)?.id ?? null);
    };

    // -
    useEffect(() => {
        if(isSuccess) {
            setOptions(clients.map((client: ClientRowItemType) => ({ children: client.type === "ENTREPRISE" ? client.companyName : client.contactName, value: client.type === "ENTREPRISE" ? client.companyName : client.contactName })));
        }
    }, [isSuccess, clients]);

    return (
        <Field label="Sélectionner un client">
            <Combobox   
                onOptionSelect={onOptionSelect}
                placeholder="Sélectionner un client"
                onChange={(ev) => {
                    onQueryChange(ev.target.value);
                    onSelect(null);
                }}
                value={query}
            >
                {children}
            </Combobox>
        </Field>
    );
}

export default ClientAutocomplete;
