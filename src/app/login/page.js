"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const LoginPage = () => {
  const router = useRouter();
  const [user,setUser] = useState({
    email : "",
    password : ""
  });
  const [buttonDisabled,setButtonDisabled] = useState(false);
  useEffect(()=>{
    if(user.email && user.password ){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  },[user]);
  const [loading,setLoading] = useState(false);
  const onLogin = async () =>{
    try{
      setLoading(true);
      const response = await axios.post('/api/users/login',user);
      console.log('login success',response.data);
      toast.success("Login Success");
      router.push("/profile");
    }catch(err){
      console.log('there was some error',err);
      toast.error(err.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Login</h1>
      <hr/>
      
      <label htmlFor="email">email</label>
      <input className="p-4 text-black" name="email" placeholder="email" type="text" value={user.email} onChange={(e)=>{setUser((prev)=>{return {...prev,email : e.target.value}})}}></input>
      <label htmlFor="password">password</label>
      <input className="p-4 text-black" name="password" placeholder="password" type="text" value={user.password} onChange={(e)=>{setUser((prev)=>{return {...prev,password : e.target.value}})}}></input>
      <button onClick={buttonDisabled ? '':onLogin} className="p-4 bg-slate-600">{buttonDisabled ? 'fill all' : 'login'}</button>
      <Link href={'/signup'}>Visit the singup page</Link>
    </div>
  )
}

export default LoginPage