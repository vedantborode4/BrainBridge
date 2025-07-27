import type { Ref } from "react";

export function Input ({placeholder, onChange, inputRef} : {onChange?: () => void, placeholder: string , inputRef?: Ref<HTMLInputElement>}) {
    return <div className="">
        <input type="text" placeholder={placeholder} onChange={onChange} className="px-4 py-2 border rounded m-2 shadow-md focus:outline-none min-w-96 " ref={inputRef}/>
    </div>
}