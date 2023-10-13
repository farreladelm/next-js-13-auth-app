"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export function Navbar() {
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
            <nav className="fixed top-0 left-0 w-full flex justify-between px-8 py-8">
                <Link href="/">Home</Link>
                <div className="flex gap-4 items-center">
                    <Link href="/profile" className="hover:underline hover:text-slate-400">profile</Link>
                    <button 
                    className="flex gap-2 justify-center items-center px-4 py-2 bg-slate-950 hover:bg-slate-800 focus:bg-slate-800 border-2 border-solid border-slate-300 rounded"
                    onClick={logout}>Logout</button>
                </div>
            </nav>
        </>
    )
}