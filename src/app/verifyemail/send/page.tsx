"use client"
import Link from "next/link"
import axios from "axios"
import Reaxt, { useEffect } from "react"

export default function SendEmailVerification() {
    const sendEmail =async () => {
        try {
            const response = await axios.get("/api/user/verifyemail/send")
            console.log("success", response)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {sendEmail()}, [])
    return (
        <div className="flex justify-center items-center min-h-screen w-screen">
            <div>
                Verification email has been send. Please check your email or go
                back to <Link className="hover:text-slate-400" href="/profile">profile page</Link>
            </div>
        </div>
    )
}