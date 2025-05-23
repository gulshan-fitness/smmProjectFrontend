import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserProtectedRouts({children}) {

     const user= JSON.parse(localStorage.getItem("user"))
    const usertoken=localStorage.getItem("usertoken")
    const navigater=useNavigate()

    useEffect(
        ()=>{
            if(!user&& !usertoken){
navigater("/userlogin")
            }

        },[]
    )


  return children

}
