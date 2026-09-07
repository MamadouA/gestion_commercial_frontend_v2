import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, Field, Input, makeStyles, Select, Spinner, tokens } from "@fluentui/react-components";
import { ChannelShare24Regular, DismissFilled, SaveRegular } from "@fluentui/react-icons";
import { Controller, useForm } from "react-hook-form";
import { type CreateClientRequest } from "../client.types";
import { ENTERPRISE_LEGAL_FORMS } from "../client.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../client.api";
import { useClientStore } from "../client.store";
import ToastAlerte from "../../shared/components/ToastAlerte";

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
    const { clients, setClients } = useClientStore();
    const { watch, reset, control, handleSubmit} = useForm<CreateClientRequest>({ mode: 'onChange', defaultValues: { type: "PARTICULIER", companyLegalForm: "Person"}});
    const queryClient = useQueryClient();

    const type = watch('type');

    const { isPending, isError, isSuccess, mutateAsync: createClientMutation } = useMutation({
        mutationFn: (data: CreateClientRequest) => createClient(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            setClients([data, ...clients]);
            reset();
        }
    });
            
    return (
        <Dialog modalType="modal" open={isOpen}>
            <div>
                <ToastAlerte isVisible={isError} status="error" message="Une erreur s'est produite. Veuillez réessayer!" />
                <ToastAlerte isVisible={isSuccess} status="success" message="Client enregistré avec succés!" />
            </div>
            <DialogSurface className={styles.dialog}>
                <DialogBody>
                    <DialogTitle className="px-4 py-5  rounded-t-md text-white" style={{backgroundColor: tokens.colorBrandBackground}}>
                        <ChannelShare24Regular />
                        Formulaire client
                        <Button className="absolute top-2 right-2 bg-gray-200!" shape="circular" icon={<DismissFilled />} appearance="transparent" onClick={onClose} />
                    </DialogTitle>

                    <DialogContent className="">
                        <form className="px-5 grid grid-cols-3 gap-x-5 gap-y-8 grid-rows-4 h-full" onSubmit={handleSubmit((data) => createClientMutation(data))}>
                            <Controller 
                                name="type"
                                control={control}
                                render={({ field }) => 
                                    <Field label="Type" className="grow min-w-67" required>
                                        <Select defaultValue='PARTICULIER' {...field} disabled={isPending} size="large">
                                            <option value="PARTICULIER">Particulier</option>
                                            <option value="ENTREPRISE">Entreprise</option>
                                        </Select>
                                    </Field>
                                }
                            />
                                
                            <Controller 
                                name="country"
                                control={control}
                                rules={{
                                    minLength: { value: 3, message: "minimum 3 caractères!" },
                                    maxLength: { value: 255, message: "maximum 255 caractères!"}
                                }}
                                render={({ field }) => 
                                    <Field label="Pays" className="grow">
                                        <Input placeholder="pays de l'entreprise" {...field} disabled={isPending} size="large"/>
                                    </Field>
                                }
                            />

                            <Controller 
                                name="address"
                                control={control}
                                render={({ field }) => 
                                    <Field label="Adresse" className="grow">
                                        <Input placeholder="adresse de entreprise" {...field} disabled={isPending} size="large"/>
                                    </Field>
                                }
                            />

                            <Controller 
                                name="companyName"
                                control={control}
                                 rules={{
                                    minLength: { value: 3, message: "minimum 3 caractères!" },
                                    maxLength: { value: 255, message: "maximum 250 caractères!"}
                                }}
                                render={({ field }) => 
                                    <Field label="Entreprise" className="grow" required={type === 'ENTREPRISE'}>
                                        <Input placeholder="nom de l'entreprise" disabled={(type === 'PARTICULIER') || isPending} {...field} size="large"/>
                                    </Field>
                                }
                            />

                            <Controller 
                                name="companyLegalForm"
                                control={control}
                                render={({ field }) => 
                                    <Field label="Forme légale" className="grow min-w-67" required={type === 'ENTREPRISE'}>
                                        <Select className="w-[78%]" {...field} disabled={isPending} size="large">
                                            <option key="Person">Personne physique</option>
                                            {
                                                ENTERPRISE_LEGAL_FORMS.map(legalForm => <option key={legalForm.key} value={legalForm.key}>{legalForm.value}</option>)
                                            }
                                        </Select>
                                    </Field>
                                }
                            />


                            <Controller 
                                name="industry"
                                control={control}
                                 rules={{
                                    minLength: { value: 3, message: "minimum 3 caractères!" },
                                    maxLength: { value: 255, message: "maximum 255 caractères!"}
                                }}
                                render={({ field }) => 
                                    <Field label="Secteur d'activité" className="grow">
                                        <Input placeholder="secteur d'activité du client" {...field} disabled={isPending} size="large"/>
                                    </Field>
                                }
                            />

                            <Controller 
                                name="contactName"
                                control={control}
                                rules={{
                                    minLength: { value: 3, message: "minimum 3 caractères!" },
                                    maxLength: { value: 255, message: "maximum 255 caractères!"}
                                }}
                                render={({ field }) => 
                                    <Field label="Contact" className="grow" required>
                                        <Input placeholder="nom du contact principal" {...field} disabled={isPending} size="large"/>
                                    </Field>
                                }
                            />

                            <Controller 
                                name="email"
                                control={control}
                                rules={{
                                    minLength: { value: 3, message: "minimum 3 caractères!" },
                                    maxLength: { value: 255, message: "maximum 255 caractères!"}
                                }}
                                render={({ field }) => 
                                    <Field label="Email" className="grow" required>
                                        <Input placeholder="email de contact" {...field} disabled={isPending} size="large"/>
                                    </Field>
                                }
                            />

                            <Controller 
                                name="phone"
                                rules={{
                                    minLength: { value: 9, message: "minimum 9 caractères!" },
                                    maxLength: { value: 255, message: "maximum 255 caractères!"}
                                }}
                                control={control}
                                render={({ field }) => 
                                    <Field label="Téléphone" className="grow" required>
                                        <Input placeholder="numéro de téléphone" {...field} disabled={isPending} size="large"/>
                                    </Field>
                                }
                            />
                            <Button appearance="primary" type="submit" className="col-start-3 self-start" size='large' disabled={isPending} icon={<SaveRegular />}>
                                <Spinner size="small" className="mr-2" hidden={!isPending}/>
                                <span>Enregistrer</span>
                            </Button>
                        </form>
                    </DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}

export default ClientForm;
