import {connect} from "@/db/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/sendEmail";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        
        // Check if user already exist
        const user = await User.findOne({email})
        if(user) {
            return NextResponse.json({error: "User already exist"}, {status: 400})
        }

        // Hash pasword
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        // const hashedToken = await bcryptjs.hash(username, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            // verifyToken: hashedToken,
            // verifyTokenExpiry: Date.now() + 3600000
        })
        
        
        
        const savedUser = await newUser.save()

        // // Hash token for email verify
        
        // const mailResponse = await sendEmail({
        //     email: savedUser.email, 
        //     emailType: process.env.VERIFY, 
        //     token: hashedToken
        // })

        // console.log(savedUser)
        // console.log(mailResponse)
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
    
}