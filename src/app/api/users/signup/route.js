import { connectDb } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";



connectDb();


export async function POST(request){
    try{
        const reqBody = await request.json();
         const {username, email , password} =  reqBody;

         console.log(reqBody);
         const User = await userModel.findOne({email});
         if(User){
            console.log('user already exists error');
            return NextResponse.json({error : 'User already exists'},{status : 404})
         }else{
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword =  await bcryptjs.hash(password,salt);

            const newUser = new userModel({
                username,
                email,
                password : hashedPassword
            });

            const savedUser = await newUser.save();
            console.log('The user is saved',savedUser);

            // send verification email 

            const emailResponse = await sendMail({email,emailType : "VERIFY",userId : newUser._id});
            console.log('got the email response',emailResponse);

           return  NextResponse.json({message : "user created successfully"},{status : 200},savedUser);
         }
    }catch(err){
        console.log('new different error',err);
        return NextResponse.json({error : err.message},{status:500})
    }
}