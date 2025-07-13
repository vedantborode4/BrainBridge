import type { ReactElement } from "react";

interface ButtonProps {
    title: string,
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
    className?: string;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-100 text-purple-600"
}

const sizeStyles = {
    "sm": "py-1 px-2 rounded-sm",
    "md": "py-2 px-4 rounded-md",
    "lg": "py-4 px-6 rounded-lg"
}

const defaultStyle = "flex items-center font-normal"

export function Button ({variant, title, startIcon, endIcon, size, onClick, className}: ButtonProps) {
    return <button onClick={onClick} className={`${variantStyles[variant]} ${defaultStyle} ${sizeStyles[size]} ${className || ""}`}>
    {startIcon}
    <div className="px-2">
        {title}
    </div>
    {endIcon}
    </button>
}