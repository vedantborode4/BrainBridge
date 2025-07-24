import { useState, type JSX } from "react";
import { ArticleIcon } from "../../icons/ArticleIcon";
import { AudioIcon } from "../../icons/AudioIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ImageIcon } from "../../icons/ImageIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { ShareCard } from "./ShareCardModal";

interface CardProps {
    title: string;
    link: string;
    type: "tweet" | "video" | "audio" | "article" | "image"  
}

const iconMap: Record<CardProps["type"], JSX.Element> = {

  tweet: <TwitterIcon size="md"/>,
  video: <YoutubeIcon size="md"/>,
  audio: <AudioIcon size="md"/>,
  article: <ArticleIcon size="md"/>,
  image: <ImageIcon size="md"/>,
}

export function CardHeader (props: CardProps) {
    const [shareCardOpen, setShareCardOpen] = useState(false)
    
    return <div className="flex justify-between">
        <div className="flex gap-2 items-center">
            <div className="text-gray-500">
                {iconMap[props.type]}
            </div>
            <div className="max-w-[12rem] truncate">
                {props.title}
            </div>
        </div>
        <div className="">
            <ShareCard open={shareCardOpen} onClose={() => setShareCardOpen(false)} />
        </div>            
        <div className="flex gap-2 items-center text-gray-500">
            <button onClick={()=> {setShareCardOpen(true)}}><ShareIcon size="md"/></button>
            <button onClick={()=> {}}><DeleteIcon size="md"/></button>
        </div>
    </div>
}