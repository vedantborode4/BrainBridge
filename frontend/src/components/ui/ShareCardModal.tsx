import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button"
import { Modal } from "./Modal";

type ShareCardProbs = {
    link: string,
    open: boolean;
    onClose: () => void
}

export function ShareCard({open, onClose, link}: ShareCardProbs) {
  
    function copyLink () {
        navigator.clipboard.writeText(link)
            .then(() => {
                alert("Link copied to clipboard!");
                //toast
            })
            .catch(() => {
                alert("Failed to copy link.");
                // toast
            });
    }
    function redirectLink () {
      window.open(link, "_blank");
    }

  return ( <div>
    {open && <div>
        <Modal open={open} onClose={onClose} >
        <div className=" w-full mt-2  border p-4 rounded shadow-xl flex gap-2 items-center justify-between ">
            <div className="flex gap-2">
            <Button size="sm" title="Copy" variant="primary" onClick={() => {copyLink()}}/>
            <Button size="sm" title="Redirect" variant="secondary" onClick={() => {redirectLink()}}/>
            </div>
            <button className="rounded-2xl h-6 bg-gray-200 ml-2 px-1 flex items-center" onClick={onClose}><CloseIcon size="md"/></button>
        </div>
        </Modal>
    </div>
    }
  </div>
  )
}
