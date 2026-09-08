import { Button, Field, Input, makeStyles, Select, tokens } from '@fluentui/react-components';
import { FilterRegular, ArrowSyncRegular } from '@fluentui/react-icons';  

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
        width: "220px"
    }
})

const ClientFilter = () => {
    const styles = useStyles();
    
    return (
        <div className='flex flex-col gap-3 bg-gray-50 px-5 py-8 border border-slate-200 rounded-md' style={{ backgroundColor: tokens.colorNeutralBackground1 }}>
            <div>
                <FilterRegular /> 
                Filtres
            </div>

            <form className='flex flex-wrap gap-4 items-end'>
                <Field label="Type">
                    <Select className={styles.select} size='large'>
                        <option value="">Tous</option>
                        <option value="PARTICULIER">Particulier</option>
                        <option value="ENTREPRISE">Entreprise</option>
                    </Select>
                </Field>
                
                <Field label="Entreprise">
                    <Input placeholder="nom de l'entreprise" className={styles.input} size='large'/>
                </Field>
                <Field label="Contact">
                    <Input placeholder="nom du contact" className={styles.input} size='large'/>
                </Field>
                <Field label="Email">
                    <Input placeholder="email de l'entreprise" className={styles.input} size='large'/>
                </Field>

                <Button appearance="secondary" icon={<ArrowSyncRegular />} size='large'>Réinitialiser</Button>
            </form>
        </div>
    );
}

export default ClientFilter;
