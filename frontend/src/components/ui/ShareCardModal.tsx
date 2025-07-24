import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button"
import { Modal } from "./Modal";

type ShareCardProbs = {
    open: boolean;
    onClose: () => void
}

export function ShareCard({open, onClose}: ShareCardProbs) {
  return ( <div>
    {open && <div>
        <Modal open={open} onClose={onClose} >
        <div className=" w-full mt-2  border p-4 rounded shadow-xl flex gap-2 items-center justify-between ">
            <div className="flex gap-2">
            <Button size="sm" title="Copy" variant="primary" onClick={() => {}}/>
            <Button size="sm" title="Redirect" variant="secondary" onClick={() => {}}/>
            </div>
            <button className="rounded-2xl h-6 bg-gray-200 ml-2 px-1 flex items-center" onClick={onClose}><CloseIcon size="md"/></button>
        </div>
        </Modal>
    </div>
    }
  </div>
  )
}
