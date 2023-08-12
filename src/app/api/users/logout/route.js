import { NextResponse } from "next/server";



export async function GET(request){

try{
const response = NextResponse.json({message : 'Logout successfull', success : true});
response.cookies.set("token","",{httpOnly : true, expires : new Date(0)});
return response;
}catch(error){
    console.log('there was some error',err);
    return NextResponse.json({error : error.message},{status : 500});
}

}