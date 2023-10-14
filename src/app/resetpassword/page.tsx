"use client"
import React, {useEffect} from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function resetPassword() {
    const router = useRouter()
    const token = useSearchParams().get('token')

    const [password, setPassword] = React.useState("")
    const [buttonDisabled, setButtonDisabled] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const onReset = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/user/resetpassword", {token, password})
            console.log("success", response)
            setLoading(false)
            router.push("/profile")
        } catch (error: any) {
            console.log(error.message)            
        }
    }

    useEffect(() => {
        if(password.length < 8) {
            setButtonDisabled(true)
        }else{
            setButtonDisabled(false)
        }
    }, [password])

    return (
        <>
           <div className="flex justify-center items-center min-h-screen w-screen">
                <div className="p-4 rounded-md min-w-[300px]">
                    <h1 className="p-4 text-center text-2xl font-bold">Signup Form</h1>
                    <hr className="rounded h-[2px]" />
                    <div className="py-4">
                        <div>
                            <div className="flex flex-col gap-2 mb-4">
                                <label htmlFor="password">new password</label>
                                <input 
                                id="password" 
                                type="password" 
                                value={password}
                                className="rounded bg-slate-300 p-2 outline-none text-slate-900" 
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            <hr className="mt-8 rounded h-[2px]" />
                            <div className="flex flex-col justify-center items-center gap-2 my-4">
                                <button onClick={onReset} className="px-4 py-2 bg-slate-950 hover:bg-slate-800 focus:bg-slate-800 border-2 border-solid border-slate-300 rounded flex gap-4 items-center justify-center" disabled={buttonDisabled} >
                                    <span>Reset</span>
                                    {   
                                        loading ?
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            : ""
                                    }
                                </button>
                                <small>
                                    Go back to <Link href="/profile" className="hover:text-slate-500 text-slate-600">Profile</Link> page
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}