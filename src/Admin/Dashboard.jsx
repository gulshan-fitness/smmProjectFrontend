import React, { useContext, useEffect, useState } from "react";
import { FaUserGraduate, FaPuzzlePiece } from "react-icons/fa";
import { MdFunctions } from "react-icons/md";
import { Context } from "../Context_holder";
import { Link } from "react-router-dom";

export default function Dashboard() {

const{CrosswordPuzzleFetch,UsersFetch,UsersList, AllCrosswordPuzzle,SudokoFetch, AllSudoko,AllRiddles, RiddlesFetch,MatchistickPuzzleFetch,AllMatchistickPuzzles}=useContext(Context)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(
    ()=>{
UsersFetch()
CrosswordPuzzleFetch()
SudokoFetch()
RiddlesFetch()
MatchistickPuzzleFetch()
    },[]
  )


  const stats = [

    { title: "Total Students",value: UsersList?.length , icon: <FaUserGraduate />,Path:"/adminprofile/usersList" },

    { title: "Total Crossword Puzzles", value: AllCrosswordPuzzle?.length, icon: <FaPuzzlePiece/>,
      Path:"/adminprofile/crosswordpuzzle/view" },

    { title: "Total Sudoku Puzzles", value:AllSudoko?.length, icon: <MdFunctions />,Path:"/adminprofile/sudoko/view"},

     { title: "Total Riddles", value:AllRiddles?.length, icon: <MdFunctions />,Path:"/adminprofile/Riddles/view"},

     { title: "Total Matchistick Puzzle", value:AllMatchistickPuzzles?.length, icon: <MdFunctions />,Path:"/adminprofile/matchstickpuzzle/view"},
  ];



  return (
    <div className="min-h-screen flex bg-black text-[#FFD700] font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-6 sm:p-10 flex-1 w-full overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-[#FFD700]">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {stats?.map((s) => (
               <Link to={s?.Path} className="bg-gradient-to-br from-black to-gray-900 border border-[#FFD700]/30 rounded-2xl shadow-lg shadow-[#FFD700]/10 px-6 py-3 transition transform hover:scale-105 hover:shadow-xl hover:shadow-[#FFD700]/30 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="text-3xl text-[#FFD700]">{s?.icon}</div>
        <div>
          <p className="text-sm text-[#FFD700]/80">{s?.title}</p>
          <p className="text-2xl font-bold text-[#FFD700]">{s?.value}</p>
        </div>
      </div>
    </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}



