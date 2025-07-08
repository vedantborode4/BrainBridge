import type { ReactElement } from "react";

interface ButtonProps {
    title: string,
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

export function Button (props : ButtonProps) {
    return <button className={`${variantStyles[props.variant]}  ${sizeStyles[props.size]}`}>
    {props.startIcon}
    <div className="px-2">
        {props.title}
    </div>
    {props.endIcon}
    </button>
}