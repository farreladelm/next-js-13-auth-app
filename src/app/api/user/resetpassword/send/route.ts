import {connect} from "@/db/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/sendEmail";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        console.log(userId)

        const user = await User.findOne({_id: userId})
        console.log(user.email)
        if(!user) {
            return NextResponse.json({error: "No user found"}, {status: 400})
            console.log(user)   
        }
        console.log(user)

        // Create verify token
        const hashedToken = await bcryptjs.hash(user._id.toString(), 10)
        
        console.log("hashed")

        user.forgotPasswordToken = hashedToken
        user.forgotPasswordTokenExpiry = Date.now() + 3600000

        console.log(user)
        await user.save()

        const responseEmail = await sendEmail({
            email: user.email,
            emailType: process.env.RESET,
            token: hashedToken
        })

        return NextResponse.json({
            message: "Successfully send password reset verification to user",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}