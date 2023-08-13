import { connectDb } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(request){
connectDb();
try{
    const reqBody = await request.json();
    console.log('got the body',reqBody);
    const {email  , password} = reqBody;
    console.log(email,password);
    const user = await userModel.find({email:email});
    if(user){
        console.log('We found the user',user);
        console.log('We found the user',user[0].password);
        const hashedPassword = user[0].password;
        // const salt = await bcryptjs.genSalt(10);
        const isMatch = await bcryptjs.compare(password,hashedPassword);
        if(isMatch){
            console.log('The password is a match');
            
            // return NextResponse.json({user},{status:200});
        }else{
            console.log('The passwords dont match');
            return NextResponse.json({error : 'Invalid credentials'},{status : 500});
        }

        const token_data = {
            _id : user[0]._id,
            username : user[0].username,
            email : user[0].email
        }
        console.log('the token data is : ',token_data);
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