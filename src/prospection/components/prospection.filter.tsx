import { makeStyles, tokens } from "@fluentui/react-components";
import { FilterRegular } from "@fluentui/react-icons";

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

const ProspectionFilter = () => {
    const styles = useStyles();

    return (
        <div className='flex flex-col gap-3 bg-gray-50 px-5 py-8 border border-slate-200 rounded-md' style={{ backgroundColor: tokens.colorNeutralBackground1 }}>
            <div>
                <FilterRegular /> 
                Filtres
            </div>
        </div>
    );
}

export default ProspectionFilter;
