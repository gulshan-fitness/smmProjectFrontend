import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminProtectedRoutes({children}) {
const navigator= useNavigate()


const admindata= JSON.parse( localStorage.getItem("admin"))

const admintoken= localStorage.getItem("admin")



useEffect(() => {




  if (!admindata && !admintoken) {
    navigator('/adminloginitslocked'); 
  }
  
  
  

}, []);

  return  children
}
