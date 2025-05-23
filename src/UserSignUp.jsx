

import React, { useContext, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";


import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Context } from "./Context_holder";
import { Link, useNavigate } from "react-router-dom";


export default function UserSignUp() {
  const {  
setusertoken, setuser,notify  } = useContext(Context);

  const[Phone,setPhone]=useState(null)
 const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigator=useNavigate()

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = Phone.replace("+","");
    
   
   
    const password = e.target.password.value;
    const confirm_password = e.target.confirmpassword.value;

   

    const data = { name, email, phone, password, confirm_password };
   
    axios
    .post(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_URL}sign_up`,
      data
    )

    .then((success) => {
     
notify(success.data.msg,success.data.status)

      if (success.data.status == 1) {


        e.target.reset()

        localStorage.setItem("user",JSON.stringify(success.data.user))

        setuser(success.data.user)

       
        
        
        localStorage.setItem("usertoken",success.data.token)


        setusertoken(success.data.token)


     

       
        setPhone(null)
        
       navigator("/userprofile")




   
        
       
      }
    })
    .catch((error) => {});

    

    

  };

  return (

<div className="px-3 w-full py-4 h-screen bg-black">
  <div className="w-full mx-auto p-4 rounded-md shadow-md bg-black border border-[#FFD700]">
    <h2 className="text-2xl font-bold mb-6 text-center text-[#FFD700]">Student Sign-Up</h2>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 px-1 gap-2 max-h-[60vh] overflow-y-auto">
      {/* Name */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1 text-[#FFD700]">Name</label>
        <input
          type="text"
          name="name"
          className="w-full border border-[#FFD700] rounded-md p-1 sm:p-2 text-xs sm:text-sm bg-black text-[#FFD700] placeholder:text-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none"
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1 text-[#FFD700]">Email</label>
        <input
          type="email"
          name="email"
          className="w-full border border-[#FFD700] rounded-md p-1 sm:p-2 text-xs sm:text-sm bg-black text-[#FFD700] placeholder:text-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs sm:text-sm font-medium mb-1 text-[#FFD700]">Phone</label>
        <div className="custom-phone-input">
          <PhoneInput
            placeholder="Phone Number"
            value={Phone}
            onChange={setPhone}
            defaultCountry="IN"
            className="w-full border border-[#FFD700] rounded-md p-1 sm:p-2 text-xs sm:text-sm bg-black text-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none"
          />
        </div>
      </div>

      {/* Password */}
      <div className="relative">
        <label className="block text-xs sm:text-sm font-medium mb-1 text-[#FFD700]">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className="w-full border border-[#FFD700] rounded-md p-1 sm:p-2 pr-10 text-xs sm:text-sm bg-black text-[#FFD700] placeholder:text-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none"
          placeholder="Enter password"
          required
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-[60%] right-3 text-[#FFD700] cursor-pointer"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative mt-4">
        <label className="block text-xs sm:text-sm font-medium mb-1 text-[#FFD700]">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmpassword"
          className="w-full border border-[#FFD700] rounded-md p-1 sm:p-2 pr-10 text-xs sm:text-sm bg-black text-[#FFD700] placeholder:text-[#FFD700] focus:ring-1 focus:ring-[#FFD700] focus:outline-none"
          placeholder="Confirm password"
          required
        />
        <span
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute top-[60%] right-3 text-[#FFD700] cursor-pointer"
        >
          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="py-1 px-3 rounded-md text-black bg-[#FFD700] font-semibold transition-all duration-300 text-xs sm:text-sm"
        >
          Sign Up
        </button>
      </div>
    </form>

    {/* Login Link */}
    <Link
      to={"/userlogin"}
      className="mt-4 text-sm text-center flex gap-1 justify-center items-center text-[#FFD700]"
    >
      <p>I already have an account</p>
      <p className="underline font-bold">Login</p>
    </Link>
  </div>
</div>



  
  );
}
