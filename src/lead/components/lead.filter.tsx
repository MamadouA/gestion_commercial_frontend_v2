import {
  Button,
  Field,
  makeStyles,
  Select,
  tokens,
} from "@fluentui/react-components";
import { ArrowSyncRegular, FilterRegular } from "@fluentui/react-icons";
import ClientAutocomplete from "../../client/components/client.autocomplete";
import { useState } from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";

const useStyles = makeStyles({
  input: {
    "& input:focus": {
      border: "1px solid #42749A",
      borderRadius: "5px",
      boxSizing: "border-box",
    },

  },
  select: {
    width: "220px",
    "& select:focus": {
      border: "1px solid #42749A",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
  },
});

const LeadFilter = () => {
  const styles = useStyles();
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [clientAutocompleteQuery, setClientAutocompleteQuery] = useState("");

  return (
    <div
      className="flex flex-col gap-3 bg-gray-50 px-5 py-8 border border-slate-200 rounded-md"
      style={{ backgroundColor: tokens.colorNeutralBackground1 }}
    >
      <div className="flex gap-2 items-center">
        <FilterRegular />
        Filtres
      </div>

      <form className="flex flex-wrap gap-4 items-end">
        <Field label="Type">
          <Select className={styles.select}  value="">
            <option value="">Tout</option>
            <option value="PROSPECTION">Prospection</option>
            <option value="OFFER">Offre</option>
          </Select>
        </Field>

        <ClientAutocomplete
          query={clientAutocompleteQuery}
          onQueryChange={setClientAutocompleteQuery}
          onSelect={setSelectedClientId}
        />

        <Field label="Echéance">
          <DatePicker
            placeholder="Sélecitonner une date"
            
          />
        </Field>

        <Field label="Statut">
          <Select className={styles.select} >
            <option value="">Tout</option>
          </Select>
        </Field>

        <Button appearance="secondary" icon={<ArrowSyncRegular />} >
          Réinitialiser
        </Button>
      </form>
    </div>
  );
};

export default LeadFilter;
