export function Input ({placeholder, onChange} : {onChange: () => void, placeholder: string }) {
    return <div className="">
        <input type="text" placeholder={placeholder} onChange={onChange} className="px-4 py-2 border rounded m-2 shadow-md focus:outline-none min-w-96 "/>
    </div>
}