import { Button } from "@fluentui/react-components";
import { DismissFilled } from "@fluentui/react-icons";
import { useRef } from "react";

interface FilePickerProps {
    selectedFile: File | null
    onChange: (file: File | null) => void
}

const FilePicker = ({ selectedFile, onChange }: FilePickerProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-3 bg-gray-50 px-5 py-4 border border-slate-300 rounded-md">

            <button type="button" className="border py-7 text-slate-500 rounded-md bg-slate-50 border-slate-400 hover:bg-slate-100 hover:cursor-pointer" onClick={() => inputRef.current?.click()}>
                Cliquer ici pour choisir un fichier
            </button>

            <section className={`border py-2 px-4 rounded-md ${selectedFile ? "bg-green-300/25 border-green-200" : "bg-red-300/25 border-red-200"} flex justify-between`}>
                {selectedFile ? (
                    <div className="flex justify-between w-full">
                        <p className="flex flex-col gap-1">
                            <span className="text-slate-600">{selectedFile.name}</span>
                            <span className="text-slate-500 text-xs">{selectedFile.size}</span>
                        </p>
                        <Button appearance="transparent" icon={<DismissFilled />} shape="circular" onClick={() => onChange(null)}/>
                    </div>) : 
                    (<p>Aucun fichier sélectionné</p>)}

            </section>
            <input ref={inputRef} type="file" name="" id="" className="hidden" onChange={(e) => e.target.files && onChange(e.target.files[0])}/>
        </div>
    );
}

export default FilePicker;
