"use client"
import Link from "next/link";
import { useState } from "react";
const signUp = () => {

  const [user,setUser] = useState({
    email : "",
    password : "",
    username : ""
  });

  const onSignUp = async () =>{

  }


  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>SignUp</h1>
      <hr/>
      <label htmlFor="username">username</label>
      <input className="p-4 " name="username" placeholder="username" type="text" value={user.username} onChange={(e)=>{setUser((prev)=>{return {...prev,username : e.target.value}})}}></input>
      <label htmlFor="email">email</label>
      <input className="p-4 " name="email" placeholder="email" type="text" value={user.email} onChange={(e)=>{setUser((prev)=>{return {...prev,email : e.target.value}})}}></input>
      <label htmlFor="password">password</label>
      <input className="p-4 " name="password" placeholder="password" type="text" value={user.password} onChange={(e)=>{setUser((prev)=>{return {...prev,password : e.target.value}})}}></input>
      <button onClick={signUp} className="p-4 bg-slate-600">SignUp</button>
      <Link href={'/login'}>Visit the login page</Link>
    </div>
  )
}

export default signUp