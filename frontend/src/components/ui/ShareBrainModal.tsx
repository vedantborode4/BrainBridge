import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { Modal } from "./Modal";

type CreateContentModalProps = {
    open: boolean;
    onClose: () => void
}

// const linkRef = useRef("")

function copyLinkToClip() {

}

export function ShareBrainModal({ open, onClose }: CreateContentModalProps) {
    return (<div className="">

        {open && <Modal open={open} onClose={onClose}>
            <div className="relative flex items-center justify-center w-full pb-2">
                <h1 className="font-medium text-2xl text-gray-500">Share Brain</h1>
                <div className="absolute right-0 cursor-pointer bg-slate-200 rounded-xl p-1"
                    onClick={onClose}
                >
                    <CloseIcon size="md" />
                </div>
            </div>
            <div>
                toggle
            </div>
            <div className="flex gap-2">
                <Input placeholder={"link from backend"} onChange={() => {}}  />
            </div>
                <Button onClick={copyLinkToClip} title="Copy" variant="primary" size="md"  />
        </Modal>
        }
    </div>
    )
}
