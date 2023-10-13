"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {toast} from "react-hot-toast"


export default function profilePage() {
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get("/api/user/logout")
            toast.success("success")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message)

        }
    }
    return (
        <>
            <div className="flex justify-center items-center min-h-screen w-screen">
                <div>
                    <h1 className="p-4 text-center text-2xl font-bold">Profile Page</h1>
                </div>
                <div>
                    <button className="flex gap-2 justify-center items-center px-4 py-2 bg-slate-950 hover:bg-slate-800 focus:bg-slate-800 border-2 border-solid border-slate-300 rounded"
                    onClick={logout}>Logout</button>
                </div>
            </div>

        </>
    )
}