import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, Field, makeStyles, Spinner, Textarea, tokens } from "@fluentui/react-components";
import { BranchForkHint24Regular, DismissFilled, SaveRegular } from "@fluentui/react-icons";
import {
  DatePicker,
} from "@fluentui/react-datepicker-compat";
import { useState } from "react";
import type { AttachmentType } from "../../attachment/attachment.types";
import AttachementForm from "../../attachment/components/attachement.form";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { CreateProspectionRequest } from "../prospection.types";
import { createProspection } from "../prospection.api";
import ToastAlerte from "../../shared/components/ToastAlerte";

interface ProspectionFormProps {
    clientId: number
    isOpen: boolean
    onClose: VoidFunction
}

const useStyles = makeStyles({
    dialog: {
        width: "700px",
        maxWidth: "700px",
        padding: 0
    }
})

const ProspectionForm = ({ clientId, isOpen, onClose }: ProspectionFormProps) => {
    const styles = useStyles();
    const [isAttachementFormOpen, setIsAttachementFormOpen] = useState(false);
    const [attachment, setAttachment] = useState<AttachmentType | null>(null);
    const { formState: { errors }, control, reset, handleSubmit } = useForm<{service: string, deadline: string}>();

    const { isPending, isError, isSuccess, error, mutateAsync: createProspectionMutation } = useMutation({
        mutationFn: (data: CreateProspectionRequest) => createProspection(data),
        onSuccess: (data) => {
            reset();
        },
    });

    console.log(error);

    return (
        <>
            <Dialog open={isOpen} modalType="modal">
                <div>
                    <ToastAlerte isVisible={isError} status="error" message="Une erreur s'est produite. Veuillez réessayer!" />
                    <ToastAlerte isVisible={isSuccess} status="success" message="Client enregistré avec succés!" />
                </div>
                <DialogSurface className={styles.dialog}>
                    <DialogBody>
                        <DialogTitle className="px-4 py-5  rounded-t-md text-white" style={{backgroundColor: tokens.colorBrandBackground}}>
                            <BranchForkHint24Regular />
                            Formulaire prospection
                            <Button className="absolute top-2 right-2 bg-gray-200!" shape="circular" icon={<DismissFilled />} appearance="transparent" onClick={onClose} />
                        </DialogTitle>
                        
                        <DialogContent>
                            <form className="p-5 flex flex-col gap-4" onSubmit={handleSubmit((data) => createProspectionMutation({...data, clientId, attachment}))}>
                                <Controller name="service" control={control} 
                                    rules={{ 
                                        required: "champ obligatoire!", 
                                        minLength: { value: 10, message: "minimum 10 caractères!"},
                                        maxLength: { value: 500, message: "maximum 500 caractères!" }
                                    }}
                                    render={({ field }) => 
                                        <Field label="Service" className="grow" validationState={errors.service ? "error" : "none"} validationMessage={errors.service?.message}>
                                            <Textarea placeholder="service proposé au client" size='large' rows={4} {...field} disabled={isPending}/>
                                        </Field>
                                    } 
                                />

                                <Controller name="deadline" control={control} rules={{ required: "champ obligatoire!" }}
                                    render={({ field }) => 
                                        <Field label="Echéance" className="grow" validationState={errors.deadline ? "error" : "none"} validationMessage={errors.deadline?.message}>
                                            <DatePicker
                                                size="large"
                                                firstWeekOfYear={1}
                                                placeholder="Sélectionnez une date..."
                                                onSelectDate={(date) => field.onChange(date?.toISOString())}
                                                disabled={isPending}
                                            />
                                        </Field>
                                    }
                                />
                            

                                <div className={`h-20 flex justify-between border rounded-md ${attachment?.file ? "bg-green-50 border-green-300" : "bg-yellow-50 border-yellow-300"} p-4`}>
                                    <p className="flex flex-col gap-1">
                                        <span>{attachment && attachment.file ? "Document ajouté" : "Ajouter un document"}</span>
                                        <span className="text-xs text-slate-500">
                                            {attachment && attachment.file ? attachment.file.name : "Aucun document"}
                                        </span>
                                    </p>

                                    {attachment && attachment.file ? 
                                    (
                                        <button type="button" onClick={() => setIsAttachementFormOpen(true)} disabled={isPending}
                                            className="bg-green-100 px-10 border border-green-300 rounded-md h-10 shadow hover:bg-green-200 enabled:hover:cursor-pointer enabled:hover:scale-[99.7%]
                                            disabled:cursor-not-allowed">
                                            Modifier le document
                                        </button>
                                    ) : (
                                        <button type="button" onClick={() => setIsAttachementFormOpen(true)} disabled={isPending}
                                            className="bg-yellow-100 px-10 disabled:cursor-not-allowed border border-yellow-300 rounded-md h-10 shadow enabled:hover:bg-yellow-200 hover:cursor-pointer enabled:hover:scale-[99.7%]">
                                            Nouveau document
                                        </button>
                                    )}
                                </div>

                                <Button appearance="primary" type="submit" className="self-end" size='large' icon={<SaveRegular />} disabled={isPending}>
                                    <Spinner size="extra-small" hidden={!isPending} />
                                    <span>Enregistrer</span>
                                </Button>
                            </form>
                        </DialogContent>
                    </DialogBody>
                </DialogSurface>
            </Dialog>

            {/* Modals */}
            <AttachementForm isOpen={isAttachementFormOpen} defaultValue={attachment}
                isOptional={true}
                onClose={() => setIsAttachementFormOpen(false)} 
                onSubmit={(attachment) => {
                    setAttachment(attachment);
                    setIsAttachementFormOpen(false);
                }}
            />
        </>
    );
}

export default ProspectionForm;
