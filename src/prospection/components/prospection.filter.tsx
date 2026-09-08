import { Button, Field, Input, makeStyles, Select, tokens } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { ArrowSyncRegular, FilterRegular } from "@fluentui/react-icons";
import ClientAutocomplete from "../../client/components/client.autocomplete";
import { useState } from "react";
import { PROSPECTIONS_STATUSES } from "../prospection.constants";

const useStyles = makeStyles({
    input: {
        "& input:focus": {
            border: "1px solid #42749A",
            borderRadius: "5px",
            boxSizing: "border-box"
        },
        ":after": {
            display: "none"
        }
    },
    select: {
        width: "220px",
        "& select:focus": {
            border: "1px solid #42749A",
            borderRadius: "5px",
            boxSizing: "border-box"
        },
        ":after": {
            display: "none"
        }
    }
})

const ProspectionFilter = () => {
    const styles = useStyles();
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [clientAutocompleteQuery, setClientAutocompleteQuery] = useState('');

    console.log("selected client: ", selectedClientId);
    return (
        <div className='flex flex-col gap-3 bg-gray-50 px-5 py-8 border border-slate-200 rounded-md' style={{ backgroundColor: tokens.colorNeutralBackground1 }}>
            <div>
                <FilterRegular /> 
                Filtres
            </div>

            <form className='flex flex-wrap gap-4 items-end'>
                <ClientAutocomplete query={clientAutocompleteQuery} onQueryChange={setClientAutocompleteQuery} onSelect={setSelectedClientId}/>

                 <Field label="Echéance">
                    <DatePicker placeholder="Sélecitonner une date" className={styles.input} size='large'/>
                 </Field>

                 <Field label="Statut">
                    <Select className={styles.select} size='large'> 
                        {Object.entries(PROSPECTIONS_STATUSES).map(([key, value]) => (<option key={key} value={key}>{value}</option>))}
                    </Select>
                 </Field>

                 <Button appearance="secondary" icon={<ArrowSyncRegular />} size='large'>Réinitialiser</Button>
            </form>
        </div>
    );
}

export default ProspectionFilter;
