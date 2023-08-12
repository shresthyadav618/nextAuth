"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function verifyEmail(){
    const router = useRouter();
    const [token,changeToken] = useState("");
    const [verified,changeVerified] = useState(false);
    console.log(token);

    
        async function verify(){
            if(token.length===0){
                return;
            }
            const verifyEmailOfUser = await axios.post('/api/users/verifyEmail',{token});
            console.log('the response from the api was',verifyEmailOfUser);
            if(verifyEmailOfUser.status===200){
                console.log('verified the email of the user');
                changeVerified(true);
            }else{
                console.log('some error in verification')
            }
        }

       useEffect(()=>{
        const token = window.location.search.split("=")[1];
        console.log('ur token',token);
        changeToken(token);
       },[])

       useEffect(()=>{
        verify();
       },[token])
  
    return(
        <>
        <div>{verified ? 'Thanks , verification successfull' : 'Please verify your email for certains reasons'}</div>
        <div>Your token is {token}</div>
        {verified && <button onClick={router.push('/login')}>Login</button>}
        </>
    )
}