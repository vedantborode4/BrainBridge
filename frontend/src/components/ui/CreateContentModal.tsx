import { useRef, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { Modal } from "./Modal";
import axios from "axios";
import { BackendURL } from "../../App";

type CreateContentModalProps = {
    open: boolean;
    onClose: () => void
}

export function CreateContentModal ({open  , onClose} : CreateContentModalProps) {
    
    const ContentType = {
        Youtube: "video",
        Tweet: "tweet",
        Article: "article",
        Audio: "audio",
        Image: "image",
    } as const;
    
    type ContentType = (typeof ContentType)[keyof typeof ContentType];
    
    
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube)
    
    async function addContent () {
    
        const Title = titleRef.current?.value;
        const Link = linkRef.current?.value;
        const rawTags = tagRef.current?.value;
        const Type = type;
    
        const Tags = rawTags ? rawTags.split(/[, ]+/).map(tag => tag.toLowerCase().trim()).filter(Boolean) : [];

        if (!Title || !Link || Tags.length === 0) {
            alert("All fields are required and at least one tag must be provided.");
            return;
        }

        await axios.post(`${BackendURL}/api/v1/content`, 
            {
                title: Title,
                link: Link,
                tags: Tags,
                type: Type
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        ).then(
            response => {
                console.log("Create content success" , response.data);
                onClose();
            }
        ).catch(
            error => {
            console.error("Create content error:", error);
        });
    }


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
                    <Input placeholder="Title" inputRef={titleRef} />
                    <Input placeholder="Link" inputRef={linkRef} />
                    <Input placeholder="Tags" inputRef={tagRef} />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-gray-500">Type</h1>
                    <div className="flex gap-2">
                        <Button title="Youtube" onClick={() => {setType(ContentType.Youtube)}} variant={type === ContentType.Youtube ? "primary":"secondary"} size="sm" />
                        <Button title="Tweet" onClick={() => {setType(ContentType.Tweet)}} variant={type === ContentType.Tweet ? "primary":"secondary"} size="sm" />
                        <Button title="Article" onClick={() => {setType(ContentType.Article)}} variant={type === ContentType.Article ? "primary":"secondary"} size="sm" />
                        <Button title="Audio" onClick={() => {setType(ContentType.Audio)}} variant={type === ContentType.Audio ? "primary":"secondary"} size="sm" />
                        <Button title="Image" onClick={() => {setType(ContentType.Image)}} variant={type === ContentType.Image ? "primary":"secondary"} size="sm" />
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    <Button title="Submit" size="md" variant="primary" onClick={() => {addContent()}} />
                </div> 
        </Modal> }
    </div>
}