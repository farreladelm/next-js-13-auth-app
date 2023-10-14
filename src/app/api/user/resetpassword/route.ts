import {connect} from "@/db/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
        console.log(reqBody)

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        console.log(user)

        if(!user){
            console.log("hai")
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        // const isValidPassword = await bcryptjs.compare(password, user.password)
        // if(!isValidPassword){
        //     return NextResponse.json({error: "Can not use the same password"}, {status: 400})
        // }
            
        const hashedPassword = await bcryptjs.hash(password, 10)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined 
        user.forgotPasswordTokenExpiry = undefined 
        const savedUser = await user.save()

        console.log(savedUser)

        return NextResponse.json({
            message: "User password reset successfully",
            success: true
        })

        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}