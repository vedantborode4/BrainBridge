import type { ReactElement } from "react"

export function SidebarItem ({text, icon, onClick}: {
    text: string,
    icon: ReactElement,
    onClick: () => void
}) {
    return <div onClick={onClick} className="flex gap-2 text-slate-500 border rounded-md p-2  cursor-pointer hover:border-2 ">
        <div className="flex justify-center items-center">
            {icon}
        </div>
        <div className="flex justify-center items-center">
            {text}
        </div>
    </div>
}