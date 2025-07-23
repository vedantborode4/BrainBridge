import { useState } from "react"
import { PlusIcon } from "../../icons/PlusIcon"
import { ShareIcon } from "../../icons/ShareIcon"
import { Button } from "./Button"
import { CreateContentModal } from "./CreateContentModal"
import { ProfileCard } from "./ProfileCard"
import { ShareBrainModal } from "./ShareBrainModal"

export function Navbar () {
    const [createContentModalOpen, setCreateContentModalOpen] = useState(false)
    const [shareModalOpen, setShareModalOpen] = useState(false)
    const [profileModalOpen, setProfileModalOpen] = useState(false)
return  <div>
    <CreateContentModal open={createContentModalOpen} onClose={() => {setCreateContentModalOpen(false)}}/>
    <ProfileCard open={profileModalOpen} onClose={() => {setProfileModalOpen(false)}} />
    <ShareBrainModal open={shareModalOpen} onClose={() => {setShareModalOpen(false)}} />
    <div className="flex justify-end gap-2 p-4">
        <Button size="md" title="Add Content" variant="primary" onClick={() => {setCreateContentModalOpen(true)}} startIcon={<PlusIcon size="md"/>} />
        <Button size="md" title="Share Brain" variant="secondary" onClick={() => {setShareModalOpen(true)}} startIcon={<ShareIcon size="md"/>} />
        <div className="rounded-[50%] bg-blue-200 px-4 flex items-center justify-center cursor-pointer " onClick={() => {{setProfileModalOpen(true)}}} >
            V
        </div>
    </div>     
</div>
}