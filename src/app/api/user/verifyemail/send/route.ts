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
        }

        // Create verify token
        const hashedToken = await bcryptjs.hash(user.username, 10)

        user.verifyToken = hashedToken
        user.verifyTokenExpiry = Date.now() + 3600000

        await user.save()

        const responseEmail = await sendEmail({
            email: user.email,
            emailType: process.env.VERIFY,
            token: hashedToken
        })

        return NextResponse.json({
            message: "Successfully send email verification to user",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}