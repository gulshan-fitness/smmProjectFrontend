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
  FaCrown,
  FaTrophy,
  FaGem,
  FaShieldAlt,
} from 'react-icons/fa';
import {
  MdHome,
  MdEmail,
  MdPhone,
  MdWorkspacePremium,
} from "react-icons/md";
import { Context } from '../Context_holder';
import { Link } from 'react-router-dom';

export default function UserProfileDashboard() {
  const { user } = useContext(Context);

  // Mock data for demonstration
  const userStats = {
    logins: user?.logins || 125,
    puzzlesSolved: user?.puzzlesSolved || 58,
    achievements: user?.achievements || 6,
    streak: user?.streak || 12,
    rank: user?.rank || 'Elite',
    level: user?.level || 15,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-teal-950 text-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Sophisticated Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400">
              Player Dashboard
            </h1>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Your central hub for tracking progress, achievements, and gaming excellence
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link 
            to="/"
            className="group bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-teal-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-slate-600"
          >
            <MdHome className="text-xl" />
            <span>Home Portal</span>
          </Link>
          
          <button className="group bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
            <FaEdit className="text-lg" />
            <span>Edit Profile</span>
          </button>
          
          <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
            <FaLock className="text-lg" />
            <span>Security</span>
          </button>
        </div>

        {/* Profile Hero Section */}
        <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-600/50 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                <FaUser className="text-3xl sm:text-4xl" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-full shadow-lg">
                <FaGem className="text-sm" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {user?.name}
                </h2>
                <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm font-bold border border-teal-500/30">
                  <FaTrophy className="text-xs" />
                  Level {userStats.level}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-blue-300">
                  <MdWorkspacePremium className="text-lg" />
                  <span>{userStats.rank} Tier Player</span>
                </div>
                <div className="flex items-center gap-2 text-teal-300">
                  <FaCheckCircle className="text-lg" />
                  <span>Member since {new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Streak Badge */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-4 rounded-xl text-center shadow-xl">
              <div className="text-2xl font-black">{userStats.streak}</div>
              <div className="text-xs font-medium">Day Streak</div>
              <div className="w-12 h-1 bg-white/30 rounded-full mt-2 mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard 
            icon={<FaSignInAlt />} 
            label="Total Logins" 
            value={userStats.logins}
            gradient="from-slate-600 to-slate-700"
            trend="+12%"
          />
          <StatCard 
            icon={<FaPuzzlePiece />} 
            label="Puzzles Solved" 
            value={userStats.puzzlesSolved}
            gradient="from-teal-600 to-blue-600"
            trend="+8%"
          />
          <StatCard 
            icon={<FaTrophy />} 
            label="Achievements" 
            value={userStats.achievements}
            gradient="from-blue-600 to-indigo-600"
            trend="+2"
          />
          <StatCard 
            icon={<FaShieldAlt />} 
            label="Player Rank" 
            value={userStats.rank}
            gradient="from-indigo-600 to-purple-600"
            badge="Elite"
          />
        </div>

        {/* Account Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Personal Info */}
          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-teal-300 flex items-center gap-3">
              <FaUser className="text-lg" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <InfoRow 
                icon={<MdEmail className="text-blue-400" />} 
                label="Email Address"
                value={user?.email}
              />
              <InfoRow 
                icon={<MdPhone className="text-teal-400" />} 
                label="Phone Number"
                value={user?.phone || "Not provided"}
              />
              <InfoRow 
                icon={<FaStar className="text-yellow-400" />} 
                label="Player Rating"
                value={`${user?.rating || 0} / 5.0`}
              />
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-blue-300 flex items-center gap-3">
              <FaGem className="text-lg" />
              Account Status
            </h3>
            
            <div className="space-y-4">
              <StatusItem 
                label="Profile Completion"
                value={85}
                color="from-teal-500 to-blue-500"
              />
              <StatusItem 
                label="Email Verification"
                value={100}
                color="from-green-500 to-emerald-500"
                verified
              />
              <StatusItem 
                label="Security Level"
                value={70}
                color="from-blue-500 to-indigo-500"
              />
              <StatusItem 
                label="Game Progress"
                value={60}
                color="from-indigo-500 to-purple-500"
              />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-600/50">
              <p className="text-xs text-slate-400 text-center">
                Last updated: {new Date(user?.updatedAt).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Preview */}
        <div className="bg-gradient-to-br from-slate-800/80 to-teal-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/50 shadow-xl">
          <h3 className="text-xl font-bold mb-6 text-teal-300 flex items-center gap-3">
            <FaTrophy className="text-lg" />
            Recent Achievements
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Puzzle Master", icon: "🎯", progress: 100, color: "from-teal-500 to-blue-500" },
              { name: "Speed Solver", icon: "⚡", progress: 85, color: "from-blue-500 to-indigo-500" },
              { name: "Streak Champion", icon: "🔥", progress: 75, color: "from-indigo-500 to-purple-500" },
            ].map((achievement, index) => (
              <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/50 hover:border-teal-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <span className="font-semibold text-teal-300 text-sm">{achievement.name}</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-1000`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-teal-400 mt-1">
                  {achievement.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, gradient, trend, badge }) {
  return (
    <div className="group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-xl p-5 border border-slate-600/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white shadow-md`}>
          {icon}
        </div>
        {badge && (
          <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full font-bold">
            {badge}
          </span>
        )}
      </div>
      <div className="text-2xl font-black text-white">
        {value}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        {trend && (
          <span className="text-xs bg-gradient-to-r from-teal-500 to-blue-500 text-white px-2 py-1 rounded-full font-bold">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-colors">
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <div className="text-xs text-slate-400 font-medium">{label}</div>
        <div className="text-sm font-semibold text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, value, color, verified }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        {verified && (
          <FaCheckCircle className="text-teal-400 text-sm" />
        )}
        <span className="text-sm font-bold text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-2">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}