import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, Field, makeStyles, Textarea, tokens, } from "@fluentui/react-components";
import { DismissFilled, DocumentOnePageLink24Regular, CheckmarkRegular } from "@fluentui/react-icons";
import FilePicker from "./file-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { AttachmentType } from "../attachment.types";

interface AttachementFormProps {
    isOpen: boolean
    defaultValue?: AttachmentType | null
    isOptional?: boolean
    onSubmit: (attachement: AttachmentType) => void
    onClose: VoidFunction
}

const useStyles = makeStyles({
    dialog: {
        width: "600px",
        maxWidth: "600px",
        padding: 0
    }
})

const AttachementForm = ({ isOpen, onSubmit, onClose, isOptional = false, defaultValue }: AttachementFormProps) => {
    const styles = useStyles();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { formState: { errors, isValid }, control, reset, handleSubmit } = useForm<{ summary: string}>({ mode: 'onChange', defaultValues: defaultValue || { summary: "" } });

    return (
        <Dialog open={isOpen} modalType="modal">
            <DialogSurface className={styles.dialog}>
                <DialogBody>
                    <DialogTitle className="px-4 py-5  rounded-t-md text-white" style={{backgroundColor: tokens.colorBrandBackground}}>
                        <DocumentOnePageLink24Regular />
                            Pièces jointes
                        <Button className="absolute top-2 right-2 bg-gray-200!" shape="circular" icon={<DismissFilled />} appearance="transparent" onClick={() => {
                            reset({ summary: "" });
                            setSelectedFile(null);
                            onClose();
                        }} />
                    </DialogTitle>

                    <DialogContent>
                        <form className="flex flex-col gap-3 p-4" onSubmit={handleSubmit((data) => onSubmit({ summary: data.summary, file: selectedFile! }))}>
                            <Controller name="summary" control={control} 
                                rules={{ 
                                    required: { value: !isOptional, message: "champ obligatoire!"}, 
                                    minLength: { value: !isOptional ? 0 : 10, message: "minimum 10 caractères!" },
                                    maxLength: { value: !isOptional ? 0 : 255, message: "maximum 255 caractères!" }
                                }} 
                                render={({ field }) =>  
                                    <Field label="Description" validationState={errors.summary ? "error" : "none"} validationMessage={errors.summary?.message}>
                                        <Textarea placeholder="description de la pièce jointe" size='large' rows={3} {...field} />
                                    </Field>}
                            />
                                
                            <FilePicker selectedFile={selectedFile} onChange={setSelectedFile}/>

                            <Button appearance="primary" size="large" type="submit" disabled={isOptional ? false : !(isValid && selectedFile)} className="self-end" icon={<CheckmarkRegular />}>Valider</Button>
                        </form>
                    </DialogContent>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
}

export default AttachementForm;
