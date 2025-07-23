import type { ReactNode } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode
}

export function Modal ({open, onClose, children}:ModalProps) {
    return <div>
        {open && <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-60 flex justify-center items-center backdrop-blur-sm"
                    onClick={onClose} 
                >
            <div className="bg-white opacity-100 min-w-96 rounded-md flex flex-col gap-2 p-8 shadow-lg shadow-gray-800 border-2 justify-center items-center"
                onClick={(e) => e.stopPropagation()} 
            >
        {children}
        </div>
        </div>}
    </div>
}