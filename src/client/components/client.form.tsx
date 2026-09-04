import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, makeStyles, Select, tokens } from "@fluentui/react-components";
import { ChannelShare24Regular, ClosedCaptionRegular, DismissFilled, SaveRegular } from "@fluentui/react-icons";

interface ClientFormProps {
    isOpen: boolean
    onClose: VoidFunction
}

const useStyles = makeStyles({
    dialog: {
        width: "1000px",
        maxWidth: "1000px",
        padding: 0
    }
})
const ClientForm = ({ isOpen, onClose }: ClientFormProps) => {
    const styles = useStyles();

    return (
        <Dialog modalType="modal" open={isOpen}>
            <DialogSurface className="p-0! min-w-4xl">
                <DialogBody>
                    <DialogTitle className="px-4 py-5  rounded-t-md text-white" style={{backgroundColor: tokens.colorBrandBackground}}>
                        <ChannelShare24Regular />
                        Formulaire client
                        <Button className="absolute top-2 right-2 bg-gray-200!" shape="circular" icon={<DismissFilled />} appearance="transparent" onClick={onClose} />
                    </DialogTitle>

                    <DialogContent>
                        <form className="px-5 grid grid-cols-3 gap-4 grid-rows-4">
                             <Field label="Type" className="grow min-w-67">
                                    <Select size='large'>
                                        <option value="">Tous</option>
                                        <option value="PARTICULIER">Particulier</option>
                                        <option value="ENTREPRISE">Entreprise</option>
                                    </Select>
                                </Field>

                                <Field label="Pays" className="grow">
                                    <Input placeholder="pays de l'entreprise" size='large'/>
                                </Field>

                                <Field label="Adresse" className="grow">
                                    <Input placeholder="adresse de entreprise" size='large'/>
                                </Field>

                            <Field label="Entreprise" className="grow">
                                    <Input placeholder="nom de l'entreprise" size='large'/>
                                </Field>

                                <Field label="Forme légale" className="grow min-w-67">
                                    <Select size='large'>
                                        <option value="">Tous</option>
                                        <option value="PARTICULIER">Particulier</option>
                                        <option value="ENTREPRISE">Entreprise</option>
                                    </Select>
                                </Field>

                                <Field label="Secteur d'activité" className="grow">
                                    <Input placeholder="secteur d'activité du client" size='large'/>
                                </Field>

                            <Field label="Contact" className="grow">
                                    <Input placeholder="nom du contact principal" size='large'/>
                                </Field>

                                <Field label="Email" className="grow">
                                    <Input placeholder="email de contact" size='large'/>
                                </Field>

                                <Field label="Téléphone" className="grow">
                                    <Input placeholder="numéro de téléphone" size='large'/>
                                </Field>
                            <Button appearance="primary" className="col-start-3 self-start" size='large' icon={<SaveRegular />}>Enregistrer</Button>
                        </form>
                    </DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}

export default ClientForm;
