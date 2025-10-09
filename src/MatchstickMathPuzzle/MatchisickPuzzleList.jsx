import React, { useContext, useEffect } from 'react'
import { Context } from '../Context_holder'
import { Link } from 'react-router-dom'

export default function MatchisickPuzzleList() {
 const {MatchistickPuzzleFetch,AllMatchistickPuzzles}=useContext(Context)
 useEffect(
    ()=>{MatchistickPuzzleFetch()},
    []
 )

  return (
    <div className='flex gap-2  flex-wrap items-center p-4'>


        
        

        {
            AllMatchistickPuzzles?.map(
                (data,index)=><Link to={`/matchstickpuzzle/${data?._id}`} key={index} 

                className=' h-12 w-12 flex items-center border-2 rounded-full p-5 border-black justify-center'>

                    {data?.level}

                </Link >
            )
        }
    </div>
  )



}
