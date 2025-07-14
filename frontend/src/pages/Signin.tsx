import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function Signin () {
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 min-w-48 border-2 shadow-lg shadow-gray-600 flex flex-col justify-center items-center">
            <h1 className="font-medium text-2xl text-gray-500 pb-4">Signin</h1>
            <Input placeholder="Username" onChange={() => {}}/>
            <Input placeholder="Password" onChange={() => {}}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" title="Signin" size="md" onClick={() => {}}/> 
            </div>
            <p className="p-4 text-gray-400">Don't have an account? </p>
            <div className="flex justify-center ">
                <Button variant="secondary" title="Signup" size="md" onClick={() => {}}/> 
            </div>
        </div>
    </div>
}