import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../Context_holder";
import axios from "axios";

  const Patterns = {
  
    0: [
      { id: 'a', status: true },
      { id: 'b', status: true },
      { id: 'c', status: true },
      { id: 'd', status: false },
      { id: 'e', status: true },
      { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    1: [
      { id: 'a', status: false },
      { id: 'b', status: false },
      { id: 'c', status: true },
      { id: 'd', status: false },
      { id: 'e', status: false },
      { id: 'f', status: true },
      { id: 'g', status: false },
    ],
    2: [
      { id: 'a', status: true },
      { id: 'b', status: false },
      { id: 'c', status: true },
      { id: 'd', status: true },
      { id: 'e', status: true },
      { id: 'f', status: false },
      { id: 'g', status: true },
    ],
    3: [
      { id: 'a', status: true },
      { id: 'b', status: false },
      { id: 'c', status: true },
      { id: 'd', status: true },
      { id: 'e', status: false },
      { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    4: [
      { id: 'a', status: false },
      { id: 'b', status: true },
      { id: 'c', status: true },
      { id: 'd', status: true },
      { id: 'e', status: false },
      { id: 'f', status: true },
      { id: 'g', status: false },
    ],
    5: [
      { id: 'a', status: true },
      { id: 'b', status: true },
      { id: 'c', status: false },
      { id: 'd', status: true },
      { id: 'e', status: false },
      { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    6: [
      { id: 'a', status: true },
      { id: 'b', status: true },
      { id: 'c', status: false },
      { id: 'd', status: true },
      { id: 'e', status: true },
      { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    7: [
      { id: 'a', status: true },
      { id: 'b', status: false },
      { id: 'c', status: true },
      { id: 'd', status: false },
      { id: 'e', status: false },
      { id: 'f', status: true },
      { id: 'g', status: false },
    ],
    8: [
      { id: 'a', status: true },
      { id: 'b', status: true },
      { id: 'c', status: true },
      { id: 'd', status: true },
      { id: 'e', status: true },
      { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    9: [
      { id: 'a', status: true },
      { id: 'b', status: true },
      { id: 'c', status: true },
      { id: 'd', status: true },
      { id: 'e', status: false },
      { id: 'f', status: true },
      { id: 'g', status: true },
    ],

  '+': [{ id: 'a', status: true },
      { id: 'b', status: true },] ,

  '-':  [{ id: 'a', status: true },
      { id: 'b', status: false },] ,

  '=':  [{ id: 'a', status: true },
      { id: 'b', status: true },] ,


    };

const MatchStick = ({match, onDragStart, onDrop }) => {

  const [hover, setHover] = useState(false);

  return (
    <div
      className={`h-full w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px] relative ${match?.status ? "cursor-grab" : "cursor-pointer"} ${hover ? "bg-white" : "bg-[#201f1f]"} rounded-full`}
      draggable={match?.status}
      onDragStart={onDragStart}
      onDragOver={(e) => {
        if (!match?.status) e.preventDefault();
      }}
      onDragEnter={() => {
        if (!match?.status) setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        setHover(false);
        onDrop(e);
      }}
    >
      {match?.status && (
        <div className="h-full w-[60%] mx-auto bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-full shadow-inner relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-2 sm:h-4 sm:w-3 md:h-5 md:w-3 lg:h-6 lg:w-4 rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-900 shadow-md border border-red-800" />
        </div>
      )}
    </div>
  );
};

const MatchStickHorizontal = ({ match, onDragStart, onDrop }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`w-full h-[2px] sm:h-2 md:h-[10px] lg:h-3 relative ${match?.status ? "cursor-grab" : "cursor-pointer"} ${hover ? "bg-white" : "bg-[#201f1f]"} rounded-full `}
      draggable={match?.status}
      onDragStart={onDragStart}
      onDragOver={(e) => {
        if (!match?.status) e.preventDefault();
      }}
      onDragEnter={() => {
        if (!match?.status) setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        setHover(false);
        onDrop(e);
      }}
    >
      {match?.status && (
        <div className="w-full h-[60%] mx-auto bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-full relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-3 sm:h-3 sm:w-4 md:h-3 md:w-5 lg:h-4 lg:w-6 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-red-900 shadow-md border border-red-800" />
        </div>
      )}
    </div>
  );
};

// Unified drag & drop for all components
const useDragDrop = (matchsticks, setEquation, index,VerifyHandler,ShowMoves,UseMoves) => {
  const handleDragStart = (matchIndex) => (e) => {
    if (matchsticks[matchIndex]?.status) {
      e.dataTransfer.setData("match", JSON.stringify({ fromIndex: index, matchIndex }));
    } else {
      e.preventDefault();
    }
  };

 const handleDrop = (matchIndex) => (e) => {
  e.preventDefault();
  if (!matchsticks[matchIndex]?.status) {
    const data = e.dataTransfer.getData("match");
    if (!data) return;
    const { fromIndex, matchIndex: fromMatchIndex } = JSON.parse(data);

    setEquation((prev) => {
      const newEquation = [...prev];

      if (newEquation[fromIndex]?.matchsticks[fromMatchIndex]?.status) {
        // Move the matchstick
        newEquation[fromIndex].matchsticks[fromMatchIndex].status = false;
        newEquation[index].matchsticks[matchIndex].status = true;

        // Update the 'value' based on new segment pattern
        const currentSegments = newEquation[index].matchsticks.map(({id, status}) => ({id, status}));

        const newValue = Object.entries(Patterns).find(([key, pattern]) =>
          pattern.length === currentSegments.length &&
          pattern.every((seg, i) => seg.id === currentSegments[i].id && seg.status === currentSegments[i].status)
        )?.[0] || newEquation[index].value;

        newEquation[index].value = newValue;
      }

      return newEquation;
    });

    if (ShowMoves < UseMoves) {
      VerifyHandler();
    }
  }
};


  return { handleDragStart, handleDrop };
};

const Num = ({ matchsticks, setEquation, numIndex,VerifyHandler,ShowMoves,UseMoves }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, numIndex,VerifyHandler,ShowMoves,UseMoves);

  return (
    <div className="h-[80px] w-[32px] xs:h-[100px] xs:w-[40px] sm:h-[120px] sm:w-[48px] md:h-[160px] md:w-[64px] lg:h-[200px] lg:w-[80px] xl:h-[224px] xl:w-[94px] relative mx-1 xs:mx-1 sm:mx-2 md:mx-2 lg:mx-3">
      <div className="absolute top-0 left-0 w-full h-[2px] sm:h-2 md:h-[10px] lg:h-3">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      <div className="absolute top-[2px] sm:top-2 md:top-[10px] lg:top-3 left-0 h-[32px] xs:h-[40px] sm:h-[48px] md:h-[64px] lg:h-[80px] xl:h-[94px] w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px]">
        <MatchStick match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
      <div className="absolute top-[2px] sm:top-2 md:top-[10px] lg:top-3 right-0 h-[32px] xs:h-[40px] sm:h-[48px] md:h-[64px] lg:h-[80px] xl:h-[94px] w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px]">
        <MatchStick match={matchsticks[2]} onDragStart={handleDragStart(2)} onDrop={handleDrop(2)} />
      </div>
      <div className="absolute top-[34px] xs:top-[42px] sm:top-[52px] md:top-[74px] lg:top-[92px] xl:top-[106px] left-0 w-full h-[2px] sm:h-2 md:h-[10px] lg:h-3">
        <MatchStickHorizontal match={matchsticks[3]} onDragStart={handleDragStart(3)} onDrop={handleDrop(3)} />
      </div>
      <div className="absolute bottom-[2px] sm:bottom-2 md:bottom-[10px] lg:bottom-3 left-0 h-[32px] xs:h-[40px] sm:h-[48px] md:h-[64px] lg:h-[80px] xl:h-[94px] w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px]">
        <MatchStick match={matchsticks[4]} onDragStart={handleDragStart(4)} onDrop={handleDrop(4)} />
      </div>
      <div className="absolute bottom-[2px] sm:bottom-2 md:bottom-[10px] lg:bottom-3 right-0 h-[32px] xs:h-[40px] sm:h-[48px] md:h-[64px] lg:h-[80px] xl:h-[94px] w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px]">
        <MatchStick match={matchsticks[5]} onDragStart={handleDragStart(5)} onDrop={handleDrop(5)} />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] sm:h-2 md:h-[10px] lg:h-3">
        <MatchStickHorizontal match={matchsticks[6]} onDragStart={handleDragStart(6)} onDrop={handleDrop(6)} />
      </div>
    </div>
  );
};

const Operator = ({ matchsticks, setEquation, operatorIndex,VerifyHandler,ShowMoves,UseMoves }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, operatorIndex,VerifyHandler,ShowMoves,UseMoves);

  return (
    <div className="h-[80px] w-[24px] xs:h-[100px] xs:w-[30px] sm:h-[120px] sm:w-[36px] md:h-[160px] md:w-[48px] lg:h-[200px] lg:w-[60px] xl:h-[224px] xl:w-[94px] relative mx-1 xs:mx-1 sm:mx-2 md:mx-2 lg:mx-3 flex items-center justify-center">
      {/* Horizontal bar always */}
      <div className="absolute top-1/2 z-10 left-0 w-full h-[2px] sm:h-2 md:h-[10px] lg:h-3 -translate-y-1/2">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)}  />
      </div>

      {/* Vertical bar only for + */}
      <div className="absolute top-[27%] left-1/2 h-[32px] xs:h-[40px] sm:h-[48px] md:h-[64px] lg:h-[80px] xl:h-[94px] w-[4px] sm:w-[6px] md:w-[8px] lg:w-[10px] -translate-x-1/2">
        <MatchStick match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
    </div>
  );
};

const Equals = ({ matchsticks, setEquation, equalsIndex,VerifyHandler,ShowMoves,UseMoves }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, equalsIndex,VerifyHandler,ShowMoves,UseMoves);

  return (
    <div className="h-[80px] w-[24px] xs:h-[100px] xs:w-[30px] sm:h-[120px] sm:w-[36px] md:h-[160px] md:w-[48px] lg:h-[200px] lg:w-[60px] xl:h-[224px] xl:w-[94px] relative mx-1 xs:mx-1 sm:mx-2 md:mx-2 lg:mx-3 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4">
      <div className="h-[2px] sm:h-2 md:h-[10px] lg:h-3 w-full">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      <div className="h-[2px] sm:h-2 md:h-[10px] lg:h-3 w-full">
        <MatchStickHorizontal match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
    </div>
  );
};

const EquationComponent = ({ item, index, setEquation,VerifyHandler,ShowMoves,UseMoves }) => {
  switch (item.id) {
    case "number":
      return <Num matchsticks={item.matchsticks} setEquation={setEquation} numIndex={index} VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    case "operator":
      return <Operator matchsticks={item.matchsticks} setEquation={setEquation} operatorIndex={index}  VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    case "equals":
      return <Equals matchsticks={item.matchsticks} setEquation={setEquation} equalsIndex={index}  VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    case "result":
      return <Num matchsticks={item.matchsticks} setEquation={setEquation} numIndex={index}  VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    default:
      return null;
  }
};

export default function MatchstickMathPuzzlePlay() {
  const {MatchistickPuzzleFetch, MatchistickPuzzles,usertoken,notify } = useContext(Context);
  const [equation, setEquation] = useState([]);

    const [UseMoves,setUseMoves]=useState(0);
    const [ShowMoves, setShowMoves]=useState(0);
      const [Congrates,setCongrates]=useState(false);
      const [Faildpopup,setFaildpopup]=useState(false)


  const {id} = useParams();


  useEffect(() => {
    MatchistickPuzzleFetch(id);
  }, [id]);

  useEffect(() => {
    
    if (MatchistickPuzzles) {

      setEquation(MatchistickPuzzles?.game)
      setUseMoves(MatchistickPuzzles?.move)
     
    }

  }, [MatchistickPuzzles]);

  const VerifyHandler=()=>{
    if(equation?.length==0||!id||!usertoken)return
    
    const data={submitedAnswer:equation}
        axios.post(
            `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MATCHSTICKPUZZLE_URL}resultVerify/${id}`,
            data,
            {
              headers: {
                Authorization: usertoken,
              },
            }
    
          )
          .then((success) => {

            notify(success.data.msg, success.data.status);
            setShowMoves(ShowMoves+1)
    
            if (success.data.status === 1) {
             
setCongrates(true)
            }

            else setFaildpopup(true)
           
          })
          .catch((error) => {
            notify(error.message, 0);
          });
    
  }

  return (
    <div className="p-2 xs:p-3 sm:p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 min-h-screen">
      <div className=" flex justify-between items-center"> 
        <p> Level {MatchistickPuzzles?.level}</p>
        <p> Move {`${ShowMoves}/${MatchistickPuzzles?.move}`}</p>
        <p>  {MatchistickPuzzles?.level}</p>
        </div>
    
      <div className="w-full flex justify-center">
        {
          equation?.length!=0? (  <div className="bg-black flex flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3 p-3 xs:p-4 sm:p-4 md:p-6 rounded-lg shadow-lg max-w-full">
          {equation?.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              <EquationComponent item={item} index={index} setEquation={setEquation} VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves}  />

            </div>
          ))}
        </div>):(  
<div className=" text-white text-xl fon-bold">
          Loading ...
        </div>
        )
        }
      
      </div>


      <div className={`${Congrates?"block":"hidden"} fixed top-[50%] left-[50%] flex gap-2 p-3 items-center bg-white `}>
        <button onClick={()=>setCongrates(false)}> Levels </button>
        congretulations
        <button onClick={()=>setCongrates(false)}> Next </button>

      </div>



       <div className={`${Faildpopup?"block":"hidden"} fixed top-[50%] left-[50%] flex gap-2 p-3 items-center bg-white `}>
        <button onClick={()=>setFaildpopup(false)}> Levels </button>
        Faild
        <button onClick={()=>setFaildpopup(false)}> RePlay </button>

      </div>


    </div>
  );
}