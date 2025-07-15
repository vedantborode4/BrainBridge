import { ArticleIcon } from "../../icons/ArticleIcon";
import { AudioIcon } from "../../icons/AudioIcon";
import { ImageIcon } from "../../icons/ImageIcon";
import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar () {
    return <div className="p-2  ">
        <div className="p-2 text-3xl text-purple-600 font-bold flex items-center gap-1">
            <Logo/>
            <div className="pb-1">
                Brain Bridge
            </div>
        </div>
        <div className="pl-5 pr-2 flex flex-col gap-4 pt-4">
            <SidebarItem icon={<TwitterIcon size="md"/>} text="Twitter" onClick={() => {}}/>
            <SidebarItem icon={<YoutubeIcon size="md"/>} text="Youtube" onClick={() => {}}/>
            <SidebarItem icon={<AudioIcon size="md"/>} text="Audio" onClick={() => {}}/>
            <SidebarItem icon={<ImageIcon size="md"/>} text="Image" onClick={() => {}}/>
            <SidebarItem icon={<ArticleIcon size="md"/>} text="Article" onClick={() => {}}/>
        </div>
    </div>
}