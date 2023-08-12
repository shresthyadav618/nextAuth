
import { connectDb } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
 export async function POST(request){

    connectDb();

    try{
        const reqBody = await request.json();
        console.log('the body is ',reqBody)
        const {token} = reqBody;

        const User = await userModel.findOneAndUpdate({verifyToken : token});
        if(User){
            console.log('user found',User);
            User.isVerified = true;
            User.verifyToken = undefined;
            User.verifyTokenExpiry = undefined;
            await User.save();

            return NextResponse.json({message :"User verified successfully"},{status : 200});
        }else{
            console.log('no user found');
            return NextResponse.json({error : 'No user found '},{status : 500});
        }
    }catch(error){
        console.log('some error',error);
        return NextResponse.json({error : error.message},{status : 500});
    }
 }