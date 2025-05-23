


import React, { useContext } from 'react';
import { FaEnvelope, FaPhone, FaStar, FaUser } from 'react-icons/fa';
import { Context } from '../Context_holder';



export default function UserProfile(){
  const{user}=useContext(Context)

   


  return (
    <div className="min-h-screen bg-[a] flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white border border-[#17412D]/20 rounded-2xl shadow-md p-6 space-y-4">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <div className="bg-[#17412D] text-white p-4 rounded-full text-3xl">
            <FaUser />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#17412D]">{user?.name}</h2>
            <p className="text-sm text-gray-600">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-sm text-[#17412D] space-y-2">
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>{user?.email}</span>
          </div>
          {user?.phone && (
            <div className="flex items-center gap-2">
              <FaPhone />
              <span>{user?.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <FaStar />
            <span>Rating: {user?.rating || 0}</span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="text-xs text-gray-500 border-t pt-3">
          <p>Last updated: {new Date(user?.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};


