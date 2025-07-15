import { PlusIcon } from "../../icons/PlusIcon"
import { ShareIcon } from "../../icons/ShareIcon"
import { Button } from "./Button"


export function Navbar () {
return  <div>
    <div className="flex justify-end gap-2 p-4">
        <Button size="md" title="Add Content" variant="primary" onClick={() => {}} startIcon={<PlusIcon size="md"/>} />
        <Button size="md" title="Share Brain" variant="secondary" onClick={() => {}} startIcon={<ShareIcon size="md"/>} />
        <div className="rounded-[50%] bg-blue-200 px-4 flex items-center justify-center cursor-pointer ">
            R
        </div>
    </div>     
</div>
}