"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
export default function profilePage(){
const router = useRouter();
const Logout = async()=>{
    try{
        const response = await axios.get('/api/users/logout');
        console.log('logout successfull',response);
        toast.success('Logged Out Successfully');
        router.push('/login');
    }
    catch(err){
        console.log('some error while loggin out',err);
    }
}
const [userId , changeUserId] = useState("nothing");
useEffect(()=>{
async function getUser(){
const res = await axios.get('/api/users/me');
if(res.status===200){
    // const data = await res.json();
console.log('data of the user is fetched',res.data._id);
changeUserId(res.data._id);
}else{
    console.log('the data fetched was wrong');
    const data = await res.json();
    console.log('there error was',data.error);
}
}
if(userId==="nothing")
getUser();

},[])

return(
    <>
    <div>This is the profile pages</div>
    <button className="p-4 bg-slate-400" onClick={()=>Logout()}>Logout</button>
    <button className="p-4 bg-slate-400" >{userId !=="nothing"? <Link href={`/profile/${userId}`}>{userId}</Link> : 'NoUserId baby'}</button>
    </>
)

}