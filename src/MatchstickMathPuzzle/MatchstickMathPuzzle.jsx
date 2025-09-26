import React, { useState } from "react";

const MatchStick = ({ match, onDragStart, onDrop }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`h-full w-[10px] relative ${match?.status ? "cursor-grab" : "cursor-pointer"} ${hover ? "bg-gray-400" : ""}`}
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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-4 rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-900 shadow-md border border-red-800" />
        </div>
      )}
    </div>
  );
};

const MatchStickHorizontal = ({ match, onDragStart, onDrop }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`w-full h-3 relative ${match?.status ? "cursor-grab" : "cursor-pointer"} ${hover ? "bg-gray-400" : ""}`}
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
        <div className="w-full h-[60%] mx-auto bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 rounded-full shadow-inner relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-6 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-red-900 shadow-md border border-red-800" />
        </div>
      )}
    </div>
  );
};

// Unified drag & drop for all components
const useDragDrop = (matchsticks, setEquation, index) => {

  const handleDragStart = (matchIndex) => (e) => {

    if (matchsticks[matchIndex]?.status) {
      e.dataTransfer.setData("match", JSON.stringify({ fromIndex: index, matchIndex }));
    } 

    else {
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
        }


        console.log("ram done",);
        
        return newEquation;
      });
    }
  };

  return { handleDragStart, handleDrop };
};

const Num = ({ matchsticks, setEquation, numIndex }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, numIndex);

  return (
    <div className="h-[224px] w-[94px] relative mx-2">
      <div className="absolute top-0 left-0 w-full h-3">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      <div className="absolute top-3 left-0 h-[94px] w-3">
        <MatchStick match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
      <div className="absolute top-3 right-0 h-[94px] w-3">
        <MatchStick match={matchsticks[2]} onDragStart={handleDragStart(2)} onDrop={handleDrop(2)} />
      </div>
      <div className="absolute top-[106px] left-0 w-full h-3">
        <MatchStickHorizontal match={matchsticks[3]} onDragStart={handleDragStart(3)} onDrop={handleDrop(3)} />
      </div>
      <div className="absolute bottom-3 left-0 h-[94px] w-3">
        <MatchStick match={matchsticks[4]} onDragStart={handleDragStart(4)} onDrop={handleDrop(4)} />
      </div>
      <div className="absolute bottom-3 right-0 h-[94px] w-3">
        <MatchStick match={matchsticks[5]} onDragStart={handleDragStart(5)} onDrop={handleDrop(5)} />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-3">
        <MatchStickHorizontal match={matchsticks[6]} onDragStart={handleDragStart(6)} onDrop={handleDrop(6)} />
      </div>
    </div>
  );
};

const Operator = ({ matchsticks, setEquation, operatorIndex }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, operatorIndex);

  return (
    <div className="h-[224px] w-[94px] relative mx-2 flex items-center justify-center">
      {/* Horizontal bar always */}
      <div className="absolute top-1/2 left-0 w-full h-3 -translate-y-1/2">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>

      {/* Vertical bar only for + */}
      <div className="absolute top-[27%] left-1/2 h-[94px] w-3 -translate-x-1/2">
        <MatchStick match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
    </div>
  );
};

const Equals = ({ matchsticks, setEquation, equalsIndex }) => {
  const { handleDragStart, handleDrop } = useDragDrop(matchsticks, setEquation, equalsIndex);

  return (
    <div className="h-[224px] w-[94px] relative mx-2 flex flex-col items-center justify-center gap-4">
      <div className="h-3 w-full">
        <MatchStickHorizontal match={matchsticks[0]} onDragStart={handleDragStart(0)} onDrop={handleDrop(0)} />
      </div>
      <div className="h-3 w-full">
        <MatchStickHorizontal match={matchsticks[1]} onDragStart={handleDragStart(1)} onDrop={handleDrop(1)} />
      </div>
    </div>
  );
};

const EquationComponent = ({ item, index, setEquation }) => {
  switch (item.id) {
    case "num":
      return <Num matchsticks={item.matchsticks} setEquation={setEquation} numIndex={index} />;
    case "operator":
      return <Operator matchsticks={item.matchsticks} setEquation={setEquation} operatorIndex={index} />;
    case "equals":
      return <Equals matchsticks={item.matchsticks} setEquation={setEquation} equalsIndex={index} />;
    case "result":
      return <Num matchsticks={item.matchsticks} setEquation={setEquation} numIndex={index} />;
    default:
      return null;
  }
};

export default function MatchstickMathPuzzle() {
  const [equation, setEquation] = useState(
    [

    {
      id: "num",
      value: "3",
      matchsticks: [
        { id: "a", status: true },
        { id: "b", status: false },
        { id: "c", status: true },
        { id: "d", status: true },
        { id: "e", status: false },
        { id: "f", status: false },
        { id: "g", status: true },
      ],
    },
    
    {
      id: "operator",
      value: "+",
      matchsticks: [
        { id: "a", status: true },  // horizontal
        { id: "b", status: true },  // vertical (true = "+", false = "-")
      ],
    },
    {
      id: "num",
      value: "5",
      matchsticks: [
        { id: "a", status: false },
        { id: "b", status: true },
        { id: "c", status: true },
        { id: "d", status: false },
        { id: "e", status: true },
        { id: "f", status: true },
        { id: "g", status: true },
      ],
    },
    {
      id: "equals",
      value: "=",
      matchsticks: [
        { id: "a", status: true },
        { id: "b", status: true },
      ],
    },
    {
      id: "result",
      value: "8",
      matchsticks: [
        { id: "a", status: true },
        { id: "b", status: true },
        { id: "c", status: true },
        { id: "d", status: true },
        { id: "e", status: true },
        { id: "f", status: true },
        { id: "g", status: true },
      ],
    },
  ]);

  return (
    <div className="p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 min-h-screen flex items-center justify-center">
      <div className="bg-white flex gap-3 p-4 rounded-lg shadow-lg">
        {equation.map((item, index) => (
          <EquationComponent key={index} item={item} index={index} setEquation={setEquation} />
        ))}
      </div>
    </div>
  );
}
