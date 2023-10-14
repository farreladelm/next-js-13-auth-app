import {connect} from "@/db/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(reqBody)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        console.log(user)

        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined 
        user.verifyTokenExpiry = undefined 
        const savedUser = await user.save()

        console.log(savedUser)

        return NextResponse.json({
            message: "User verified successfully",
            success: true
        })

        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}