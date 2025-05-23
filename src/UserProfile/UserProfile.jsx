import React, { useContext } from 'react';
import {
  FaEnvelope,
  FaPhone,
  FaStar,
  FaUser,
  FaEdit,
  FaLock,
  FaCheckCircle,
  FaPuzzlePiece,
  FaSignInAlt,
} from 'react-icons/fa';
import {
  MdHome,
 
} from "react-icons/md"
import { Context } from '../Context_holder';
import { Link } from 'react-router-dom';

export default function UserProfileDashboard() {
  const { user } = useContext(Context);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-[#FFD700] px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">User Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-3">
               <Link to={"/"}
              className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
              
            >
              <MdHome className="inline mr-2 text-xl" /> Home
            </Link>

            <button className="bg-[#FFD700] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#e6c200] transition text-sm sm:text-base">
              <FaEdit className="inline mr-2" /> Edit Profile
            </button>
            <button className="bg-transparent border border-[#FFD700] px-4 py-2 rounded-lg font-semibold hover:bg-[#FFD700] hover:text-black transition text-sm sm:text-base">
              <FaLock className="inline mr-2" /> Change Password
            </button>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-black border border-[#FFD700]/30 rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="bg-[#FFD700] text-black p-4 sm:p-5 rounded-full text-3xl sm:text-4xl shadow-md">
            <FaUser />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">{user?.name}</h2>
            <p className="text-xs sm:text-sm text-[#FFD700]/70">
              Member since {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard icon={<FaSignInAlt />} label="Logins" value={user?.logins || 125} />
          <StatCard icon={<FaPuzzlePiece />} label="Puzzles Solved" value={user?.puzzlesSolved || 58} />
          <StatCard icon={<FaCheckCircle />} label="Achievements" value={user?.achievements || 6} />
        </div>

        {/* Account Info */}
        <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Account Information</h3>
          <div className="space-y-3 text-sm sm:text-base">
            
            <InfoRow icon={<FaEnvelope />} text={user?.email} />
            {user?.phone && <InfoRow icon={<FaPhone />} text={user?.phone} />}
            <InfoRow icon={<FaStar />} text={`Rating: ${user?.rating || 0}`} />
          </div>
          <p className="text-xs text-[#FFD700]/40 pt-4 border-t border-[#FFD700]/10">
            Last updated: {new Date(user?.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-[#0e0e0e] border border-[#FFD700]/20 rounded-xl p-4 flex items-center gap-4 shadow-md hover:shadow-[#FFD700]/30 hover:scale-105 transition">
      <div className="text-[#FFD700] text-xl sm:text-2xl">{icon}</div>
      <div>
        <p className="text-xs sm:text-sm text-[#FFD700]/70">{label}</p>
        <p className="text-lg sm:text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#FFD700] text-base sm:text-lg">{icon}</span>
      <span className=' whitespace-nowrap truncate'>{text}</span>
    </div>
  );
}
