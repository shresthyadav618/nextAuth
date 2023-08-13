

import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse } from "next/server";

import { connectDb } from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";

connectDb();

export async function GET(request){
    try{
        const data = await getDataFromToken(request);
        if(data){
            console.log(data);
            const {email,username,_id} = data;
            console.log(email,username,_id);
            const response = await userModel.findById(_id);
            console.log('received the resposne from the userModel',response);

            return NextResponse.json(response , {status: 200});
        }else{
            console.log('there was error in fetching details from getDataFromToken');
            return NextResponse.json({error : 'There was some error while fetching the data from the getData from token function'});
        }
    }catch(error){
        console.log('oops, some error',error);
        return NextResponse.json({error : error.message},{status : 500});
    }
}