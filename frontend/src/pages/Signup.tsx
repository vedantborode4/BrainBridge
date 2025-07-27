import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useRef } from "react";
import { BackendURL } from "../App";
import { useNavigate } from "react-router-dom";


export function Signup () {
    
    const navigate = useNavigate()

    const EmailRef = useRef<HTMLInputElement>(null)
    const UsernameRef = useRef<HTMLInputElement>(null)
    const PasswordRef = useRef<HTMLInputElement>(null)
    
    async function signup () {
        const email = EmailRef.current?.value;
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;

        try {
            await axios.post( `${BackendURL}/api/v1/signup`, {
                email,
                username,
                password
            }) 

            console.log("Signup succes")

            const signinResponse = await axios.post(`${BackendURL}/api/v1/signin`, {
                username,
                password
            })

            const jwt = signinResponse.data.token;
            localStorage.setItem("token", jwt)

            navigate("/")
        } catch (error) {
            console.log( "Signup or signin error", error)
        } 

    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl p-8 min-w-48 border-2 shadow-lg shadow-gray-600 flex flex-col justify-center items-center">
            <h1 className="font-medium text-2xl text-gray-500 pb-4">Signup</h1>
            <Input placeholder="Email" inputRef={EmailRef}/>
            <Input placeholder="Username" inputRef={UsernameRef}/>
            <Input placeholder="Password" inputRef={PasswordRef}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" title="Signup" size="md" onClick={() => {signup()}}/> 
            </div>
            <p className="p-4 text-gray-400">Already have an account? </p>
            <div className="flex justify-center ">
                <Button variant="secondary" title="Signin" size="md" onClick={() => {navigate("/signin")}}/> 
            </div>
        </div>
    </div>
}