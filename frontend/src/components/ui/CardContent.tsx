interface CardProps {
    title: string;
    link: string;
    type: "tweet" | "video" | "audio" | "article" | "image"  
}


function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}
function normalizeTweetLink(link: string): string {
  try {
    const url = new URL(link);
    if (url.hostname === "x.com") {
      url.hostname = "twitter.com";
    }
    return url.toString();
  } catch {
    return link;
  }
}
function getSpotifyEmbedUrl(link: string): string | null {
  try {
    const url = new URL(link);
    const pathParts = url.pathname.split("/").filter(Boolean);
    
    if (url.hostname === "open.spotify.com" && pathParts.length >= 2) {
      const [type, id] = pathParts;
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`;
    }

    return null;
  } catch {
    return null;
  }
}


const renderPreview = (type:CardProps["type"], link:string, title:string) => {
  switch (type) {
    case "tweet":
      return (
        <blockquote className="twitter-tweet">
            <a href={normalizeTweetLink(link)}></a> 
        </blockquote>
      );
    
    case "video":
      const videoId = extractYouTubeId(link);
      return (
        videoId && 
        <iframe
          width="100%"
          height=""
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          style={{ borderRadius: "12px" }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="my-2"
        />
      );
    
    case "audio":
      const url = getSpotifyEmbedUrl(link)
      return (
        <iframe
          style={{ borderRadius: "12px" }}
          src={url||""}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="my-2"
        />
      );
    
    case "image":
      return (
        <img src={link} alt={title} className="w-full h-48 object-cover rounded-[12px] my-2" />
      );
    
    case "article":
      return (
        <a href={link}>article</a>
      );
    
    default:
      return null
  }
}



export function CardContent (props: CardProps) {
    return <div>
        {renderPreview(props.type, props.link, props.title)}
    </div>
}