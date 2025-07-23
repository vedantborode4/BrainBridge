
type CreateContentModalProps = {
    open: boolean;
    onClose: () => void
}

export function ProfileCard ({open, onClose}:CreateContentModalProps) {
    return <div>
        {open && 
            <div className="bg-transparent h-screen w-screen z-10 fixed top-0 left-0" onClick={onClose}>
                <div className="fixed top-0 right-0 w-64  z-10 bg-white  shadow-xl m-2 rounded-md" onClick={(e) => {e.stopPropagation()}}>
                    <div className="flex justify-between items-center p-2 ">
                        <div className="px-2 text-xl text-gray-500 truncate">
                           <span className="text-gray-400">Hello, </span> Vedant
                        </div>
                        <div className="rounded-[50%] bg-blue-200 px-4 py-2 flex items-center justify-center cursor-pointer ">
                            V
                        </div>
                    </div>
                    <div className="px-4 p-2 pb-6 flex flex-col gap-2" >
                        <button className="shadow w-full text-left p-2 cursor-pointer rounded hover:bg-gray-100">Signin/Signup</button>
                        <button className="shadow w-full text-left p-2 cursor-pointer rounded hover:bg-gray-100">Logout</button>
                    </div>
                </div>  
            </div>
        }
    </div>
}