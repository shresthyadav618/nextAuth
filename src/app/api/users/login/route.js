import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(request){

try{
    const reqBody = await request.json();
    console.log('got the body',reqBody);
    const {email  , password} = reqBody;
    const user = await userModel.findOne({email});
    if(user){
        console.log('We found the user',user);
        const hashedPassword = user.password;
        const salt = await bcryptjs.genSalt(10);
        const isMatch = await bcryptjs.compare(password,hashedPassword);
        if(isMatch){
            console.log('The password is a match');
            
            NextResponse.json({user},{status:200});
        }else{
            console.log('The passwords dont match');
            NextResponse.json({error : 'Invalid credentials'},{status : 500});
        }

        const token_data = {
            _id : user._id,
            username : user.username,
            email : user.email
        }
        const token = await jwt.sign(token_data , process.env.TOKEN_SECRET,{expiresIn : "7d"});
        const response = NextResponse.json({message : "Login sucessfull",success : true});
        response.cookies.set("token",token,{
            httpOnly : true,
        })
        return response;
        
    }else{
        return NextResponse.json({error : 'The user doesnt exists , invalid credentials',err},{status : 500});
    }

}catch(err){
    console.log('there was some error ',err);
    return NextResponse.json({error : err.message},{status : 500});
}

}