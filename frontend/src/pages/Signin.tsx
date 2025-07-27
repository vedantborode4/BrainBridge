import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef } from "react";
import axios from "axios";
import { BackendURL } from "../App";

export function Signin () {

    const UsernameRef = useRef<HTMLInputElement>(null)
    const PasswordRef = useRef<HTMLInputElement>(null)

    const navigate = useNavigate()

    async function signin () {
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;

        await axios.post( `${BackendURL}/api/v1/signin`, {
            username,
            password
        })  
        .then(response => {
            console.log("Signin success:", response.data);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            navigate("/")

        })
        .catch(error => {
            console.error("Signin error:", error);
        });

        //redirect to dashboard
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 min-w-48 border-2 shadow-lg shadow-gray-600 flex flex-col justify-center items-center">
            <h1 className="font-medium text-2xl text-gray-500 pb-4">Signin</h1>
            <Input placeholder="Username" inputRef={UsernameRef}/>
            <Input placeholder="Password" inputRef={PasswordRef}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" title="Signin" size="md" onClick={() => {signin()}}/> 
            </div>
            <p className="p-4 text-gray-400">Don't have an account? </p>
            <div className="flex justify-center ">
                <Button variant="secondary" title="Signup" size="md" onClick={() => {navigate("/signup")}}/> 
            </div>
        </div>
    </div>
}