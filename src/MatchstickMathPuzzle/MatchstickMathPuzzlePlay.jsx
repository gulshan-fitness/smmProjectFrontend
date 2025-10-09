import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  '+': [{ id: 'a', status: true }, { id: 'b', status: true }],
  '-': [{ id: 'a', status: true }, { id: 'b', status: false }],
  '=': [{ id: 'a', status: true }, { id: 'b', status: true }],
};

// MatchStick Component (Vertical)
const MatchStick = ({ match, onDragStart, onDrop }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`h-full w-[6px] sm:w-[8px] md:w-[10px] lg:w-[12px] relative rounded-sm transition-all duration-200 
        ${match?.status ? "cursor-grab hover:shadow-lg" : "cursor-pointer"} 
        ${hover ? "bg-gray-300" : "bg-gray-800"}`}
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
        <div className="h-full w-full bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-sm shadow-inner relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[10px] sm:h-[12px] md:h-[14px] lg:h-[16px] w-[8px] sm:w-[10px] md:w-[12px] lg:w-[14px] rounded-sm bg-gradient-to-b from-red-600 via-red-700 to-red-900 shadow-md border border-red-800" />
        </div>
      )}
    </div>
  );
};

// MatchStickHorizontal Component
const MatchStickHorizontal = ({ match, onDragStart, onDrop }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px] relative rounded-sm transition-all duration-200 
        ${match?.status ? "cursor-grab hover:shadow-lg" : "cursor-pointer"} 
        ${hover ? "bg-gray-300" : "bg-gray-800"}`}
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
        <div className="w-full h-full bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-sm relative z-10">

          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[8px] sm:h-[10px] md:h-[12px] lg:h-[14px] w-[10px] sm:w-[12px] md:w-[14px] lg:w-[16px] rounded-sm bg-gradient-to-r from-red-600 via-red-700 to-red-900 shadow-md border border-red-800 " />

        </div>
      )}
    </div>
  );
};

// useDragDrop Hook (unchanged)
const useDragDrop = (matchsticks, setEquation, index, VerifyHandler, ShowMoves, UseMoves) => {
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
          newEquation[fromIndex].matchsticks[fromMatchIndex].status = false;
          newEquation[index].matchsticks[matchIndex].status = true;

          const currentSegments = newEquation[index].matchsticks.map(({ id, status }) => ({ id, status }));

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

// Num Component (Seven-Segment Display)
const Num = ({ matchsticks, setEquation, numIndex, VerifyHandler, ShowMoves, UseMoves }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, numIndex, VerifyHandler, ShowMoves, UseMoves);

  return (
    <div className="relative h-[80px] w-[40px] sm:h-[100px] sm:w-[50px] md:h-[120px] md:w-[60px] lg:h-[140px] lg:w-[70px] xl:h-[160px] xl:w-[80px] mx-1 sm:mx-2">
      {/* Top Horizontal (a) */}
      <div className="absolute top-0 left-0 w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px]">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      {/* Top-Left Vertical (b) */}
      <div className="absolute top-[6px] sm:top-[8px] md:top-[10px] lg:top-[12px] left-0 h-[32px] sm:h-[40px] md:h-[48px] lg:h-[56px] xl:h-[64px] w-[6px] sm:w-[8px] md:w-[10px] lg:w-[12px]">
        <MatchStick match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
      {/* Top-Right Vertical (c) */}
      <div className="absolute top-[6px] sm:top-[8px] md:top-[10px] lg:top-[12px] right-0 h-[32px] sm:h-[40px] md:h-[48px] lg:h-[56px] xl:h-[64px] w-[6px] sm:w-[8px] md:w-[10px] lg:w-[12px]">
        <MatchStick match={matchsticks[2]} onDragStart={handleDragStart(2)} onDrop={handleDrop(2)} />
      </div>
      {/* Middle Horizontal (d) */}
      <div className="absolute top-[38px] sm:top-[48px] md:top-[58px] lg:top-[68px] xl:top-[76px] left-0 w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px]">
        <MatchStickHorizontal match={matchsticks[3]} onDragStart={handleDragStart(3)} onDrop={handleDrop(3)} />
      </div>
      {/* Bottom-Left Vertical (e) */}
      <div className="absolute bottom-[6px] sm:bottom-[8px] md:bottom-[10px] lg:bottom-[12px] left-0 h-[32px] sm:h-[40px] md:h-[48px] lg:h-[56px] xl:h-[64px] w-[6px] sm:w-[8px] md:w-[10px] lg:w-[12px]">
        <MatchStick match={matchsticks[4]} onDragStart={handleDragStart(4)} onDrop={handleDrop(4)} />
      </div>
      {/* Bottom-Right Vertical (f) */}
      <div className="absolute bottom-[6px] sm:bottom-[8px] md:bottom-[10px] lg:bottom-[12px] right-0 h-[32px] sm:h-[40px] md:h-[48px] lg:h-[56px] xl:h-[64px] w-[6px] sm:w-[8px] md:w-[10px] lg:w-[12px]">
        <MatchStick match={matchsticks[5]} onDragStart={handleDragStart(5)} onDrop={handleDrop(5)} />
      </div>
      {/* Bottom Horizontal (g) */}
      <div className="absolute bottom-0 left-0 w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px]">
        <MatchStickHorizontal match={matchsticks[6]} onDragStart={handleDragStart(6)} onDrop={handleDrop(6)} />
      </div>
    </div>
  );
};

// Operator Component
const Operator = ({ matchsticks, setEquation, operatorIndex, VerifyHandler, ShowMoves, UseMoves }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, operatorIndex, VerifyHandler, ShowMoves, UseMoves);

  return (
    <div className="relative h-[80px] w-[24px] sm:h-[100px] sm:w-[30px] md:h-[120px] md:w-[36px] lg:h-[140px] lg:w-[42px] xl:h-[160px] xl:w-[48px] mx-1 sm:mx-2 flex items-center justify-center">
      {/* Horizontal Bar (a) */}
      <div className="absolute top-1/2 left-0 w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px] -translate-y-1/2">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      {/* Vertical Bar for '+' (b) */}
      <div className="absolute top-[25%] left-1/2 h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] xl:h-[80px] w-[6px] sm:w-[8px] md:w-[10px] lg:w-[12px] -translate-x-1/2">
        <MatchStick match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
    </div>
  );
};

// Equals Component
const Equals = ({ matchsticks, setEquation, equalsIndex, VerifyHandler, ShowMoves, UseMoves }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, equalsIndex, VerifyHandler, ShowMoves, UseMoves);

  return (
    <div className="relative h-[80px] w-[24px] sm:h-[100px] sm:w-[30px] md:h-[120px] md:w-[36px] lg:h-[140px] lg:w-[42px] xl:h-[160px] xl:w-[48px] mx-1 sm:mx-2 flex flex-col items-center justify-center gap-[8px] sm:gap-[10px] md:gap-[12px] lg:gap-[14px]">
      {/* Top Horizontal Bar (a) */}
      <div className="w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px]">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      {/* Bottom Horizontal Bar (b) */}
      <div className="w-full h-[6px] sm:h-[8px] md:h-[10px] lg:h-[12px]">
        <MatchStickHorizontal match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
    </div>
  );
};

// EquationComponent (unchanged)
const EquationComponent = ({ item, index, setEquation, VerifyHandler, ShowMoves, UseMoves }) => {
  switch (item.id) {
    case "number":
      return <Num matchsticks={item.matchsticks} setEquation={setEquation} numIndex={index} VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    case "operator":
      return <Operator matchsticks={item.matchsticks} setEquation={setEquation} operatorIndex={index} VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    case "equals":
      return <Equals matchsticks={item.matchsticks} setEquation={setEquation} equalsIndex={index} VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    case "result":
      return <Num matchsticks={item.matchsticks} setEquation={setEquation} numIndex={index} VerifyHandler={VerifyHandler} ShowMoves={ShowMoves} UseMoves={UseMoves} />;
    default:
      return null;
  }
};

// Main Component
export default function MatchstickMathPuzzlePlay() {

  const { MatchistickPuzzleFetch, MatchistickPuzzles,AllMatchistickPuzzles, usertoken, notify,user } = useContext(Context);
  const [equation, setEquation] = useState([]);
  const [useMoves, setUseMoves] = useState(0);
  const [showMoves, setShowMoves] = useState(0);

// console.log(useMoves,showMoves);

  const [congrats, setCongrats] = useState(false);

  const [failedPopup, setFailedPopup] = useState(false);

  const { id } = useParams();

const  Nextindex = AllMatchistickPuzzles[AllMatchistickPuzzles?.findIndex(d=>d?._id ==id)+1]?._id

  

  useEffect(() => {
    MatchistickPuzzleFetch(id);
    MatchistickPuzzleFetch()
  }, [id]);

  useEffect(() => {
    if (MatchistickPuzzles) {
      setEquation(MatchistickPuzzles?.game);
      setUseMoves(MatchistickPuzzles?.move);
    }
  }, [MatchistickPuzzles]);


  const MatchstickMathPuzzleScoreSubmit=(ans)=>{
  if(!user ||!id) return

const score={
   user_id:user?._id,
    MatchstickMathPuzzle_id:id,
    score: ans,
  
}


    axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MATCHISTICKSCORESCORE_URL
}add`,
          score,
          {
            headers: {
              Authorization: usertoken,
            },
          }
        )
        .then(success => {
          notify(success.data.msg, success.data.status);
  
        })
        .catch(error => {});
}



  const VerifyHandler = () => {


    if (equation?.length === 0 || !id || !usertoken) return;

    const data = { submitedAnswer: equation };
    axios
      .post(
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
        setShowMoves(showMoves + 1);

        if (success.data.status === 1) {
          setCongrats(true);
          MatchstickMathPuzzleScoreSubmit(1)
        } else {
          setFailedPopup(true);
          MatchstickMathPuzzleScoreSubmit(0)
        }
      })
      .catch((error) => {
        notify(error.message, 0);
      });
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center text-white text-sm sm:text-base md:text-lg font-semibold mb-4">
        <p>Level {MatchistickPuzzles?.level}</p>
        <p>Moves: {showMoves}/{MatchistickPuzzles?.move}</p>
        <p>Puzzle {MatchistickPuzzles?.level}</p>
      </div>

      {/* Instructions */}
      <div className="w-full max-w-4xl text-center text-white text-sm sm:text-base mb-4">
        <p>Drag and drop matchsticks to correct the equation. You have {MatchistickPuzzles?.move} moves.</p>
      </div>

      {/* Equation Display */}
      <div className="w-full max-w-4xl flex justify-center">
        {equation?.length !== 0 ? (
          <div className="bg-gray-900 flex flex-wrap justify-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-lg shadow-xl border border-gray-700">
            {equation?.map((item, index) => (
              <div key={index} className="flex-shrink-0">
                <EquationComponent
                  item={item}
                  index={index}
                  setEquation={setEquation}
                  VerifyHandler={VerifyHandler}
                  ShowMoves={showMoves}
                  UseMoves={useMoves}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-xl font-bold animate-pulse">Loading...</div>
        )}
      </div>

      {/* Congrats Popup */}
      <div
        className={`${
          congrats ? "block" : "hidden"
        } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-lg shadow-2xl p-6 sm:p-8 flex flex-col gap-4 items-center animate-fade-in z-50`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600">Congratulations!</h2>
        <p className="text-sm sm:text-base">You solved the puzzle!</p>
        <div className="flex gap-4">

          <Link to={"/matchstickpuzzleLevels"}
            onClick={() => setCongrats(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Levels
          </Link>


          <Link to={`/matchstickpuzzle/${Nextindex}`}
            onClick={() => setCongrats(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </Link>



          


         
        </div>
      </div>

      {/* Failed Popup */}
      <div
        className={`${
          failedPopup ? "block" : "hidden"
        } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-lg shadow-2xl p-6 sm:p-8 flex flex-col gap-4 items-center animate-fade-in z-50`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600">Try Again!</h2>
        <p className="text-sm sm:text-base">The equation is incorrect. You have {useMoves - showMoves} moves left.</p>
        <div className="flex gap-4">
            <Link to={"/matchstickpuzzleLevels"}
            onClick={() => setCongrats(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Levels
          </Link>
          <button
            onClick={() => {setFailedPopup(false)
              setShowMoves(0)
              MatchistickPuzzleFetch(id)
              
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}