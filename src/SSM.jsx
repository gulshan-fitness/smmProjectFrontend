import React from "react";
import { Link } from "react-router-dom";
import { name } from "tar/types";

export default function SSM() {

const buttons=[{name:"Crossword Puzzle", link:"/crosswordpuzzle"},{name:"Sudoko", link:"/sudoko"},{name:"Riddles", link:"/Riddles"},]

  return (
    <section className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
          About <span className="text-[#FFD700]">SMM Excellence Program</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white">
          The <strong>SMM Academic and Competitive Excellence Training Program</strong> redefines learning for today’s youth. 
          By blending <span className="text-white font-semibold">ancient wisdom</span> with{" "}
          <span className="text-white font-semibold">modern science</span>, SMM equips students with the{" "}
          <span className="italic">mindset, skills, and spirit</span> to thrive academically, socially, and spiritually.
        </p>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white underline decoration-[#FFD700]">
          Play & Learn
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {
            buttons?.map(
              (data,index)=>   <Link
            to={data?.link}
            key={index}
            className="bg-[#FFD700] text-black px-6 py-1 rounded-lg text-base sm:text-lg font-semibold shadow-md hover:bg-black hover:text-[#FFD700] transition duration-300
            border border-[#FFD700]
            "
          >
            {data.name}
          </Link>
            )
          }

       

         
        </div>
      </div>
    </section>
  );
}
