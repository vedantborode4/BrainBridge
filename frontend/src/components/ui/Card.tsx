import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";

interface CardProps {
    contentId: string,
    title: string;
    link: string;
    type: "tweet" | "video" | "audio" | "article" | "image"  
}

export default function Card(props: CardProps) {
  return (
    <div className="bg-white shadow-sm min-w-72 max-w-72 h-96 border-gray-100 border p-4 rounded-lg cursor-pointer hover:shadow-md hover:border-2">
      <CardHeader title={props.title} type={props.type} link={props.link} contentId={props.contentId}/>
      <CardContent title={props.title} type={props.type} link={props.link} />
    </div>
  )
}
