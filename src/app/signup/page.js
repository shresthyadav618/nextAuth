"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const useSignUp = () => {
  // const router = useRouter();
  const [user,setUser] = useState({
    email : "",
    password : "",
    username : ""
  });
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const onSignUp = async () =>{
    try{
      setLoading(true);
      const resposne = await axios.post('/api/users/signup',user);
      console.log('signup success',resposne.data);
      router.push('/login');
    }catch(error){
      toast.error(error.message);
      console.log('Signup failed',error.message);
    }finally{

    }
  }


  useEffect(()=>{
    if(user.password.length>0 && user.email.length>0 && user.username.length>0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>SignUp</h1>
      <hr/>
      <label htmlFor="username">username</label>
      <input className="p-4 text-black" name="username" placeholder="username" type="text" value={user.username} onChange={(e)=>{setUser((prev)=>{return {...prev,username : e.target.value}})}}></input>
      <label htmlFor="email">email</label>
      <input className="p-4 text-black" name="email" placeholder="email" type="email" value={user.email} onChange={(e)=>{setUser((prev)=>{return {...prev,email : e.target.value}})}}></input>
      <label htmlFor="password">password</label>
      <input className="p-4 text-black" name="password" placeholder="password" type="password" value={user.password} onChange={(e)=>{setUser((prev)=>{return {...prev,password : e.target.value}})}}></input>
      <button onClick={onSignUp} className="p-4 bg-slate-600">{buttonDisabled ? 'No Singup' : 'SignUp'}</button>
      <Link href={'/login'}>Visit the login page</Link>
    </div>
  )
}

export default useSignUp