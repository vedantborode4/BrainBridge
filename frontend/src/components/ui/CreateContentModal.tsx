import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { Modal } from "./Modal";

type CreateContentModalProps = {
    open: boolean;
    onClose: () => void
}

export function CreateContentModal ({open  , onClose} : CreateContentModalProps) {
    return <div className="">
        {open && <Modal open={open} onClose={onClose} >
                <div className="relative flex items-center justify-center w-full pb-2">
                    <h1 className="font-medium text-2xl text-gray-500">Create Content</h1>
                    <div className="absolute right-0 cursor-pointer bg-slate-200 rounded-xl p-1"
                        onClick={onClose}
                    >
                        <CloseIcon size="md" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Input placeholder="Title" onChange={() => {}} />
                    <Input placeholder="Link" onChange={() => {}} />
                </div>
                <div className="flex justify-center pt-4">
                    <Button title="Submit" size="md" variant="primary" onClick={() => {}} />
                </div> 
        </Modal> }
    </div>
}