


import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';





const MatchStick = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Stick */}
      <div className="h-[200px] w-3 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-full shadow-inner relative">
        {/* Match head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-5 rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-900 shadow-md border border-red-800" />
      </div>
    </div>
  );
};








export default function MatchstickMathPuzzle() {
  const [equation, setEquation] = useState([
    {
      id: "num1",
      value: "3",
      matchsticks: [
        { id: "num1_a", type: "h", status: true },
        { id: "num1_b", type: "v", status: false },
        { id: "num1_c", type: "v", status: true },
        { id: "num1_d", type: "h", status: true },
        { id: "num1_e", type: "v", status: false },
        { id: "num1_f", type: "v", status: false },
        { id: "num1_g", type: "h", status: true },
      ],
    },
    {
      id: "operator",
      value: "+",
      matchsticks: [
        { id: "op_a", type: "h", status: true },
        { id: "op_b", type: "v", status: true },
      ],
    },
    {
      id: "num2",
      value: "3",
      matchsticks: [
        { id: "num2_a", type: "h", status: true },
        { id: "num2_b", type: "v", status: false },
        { id: "num2_c", type: "v", status: true },
        { id: "num2_d", type: "h", status: true },
        { id: "num2_e", type: "v", status: false },
        { id: "num2_f", type: "v", status: false },
        { id: "num2_g", type: "h", status: true },
      ],
    },
    {
      id: "equals",
      value: "=",
      matchsticks: [
        { id: "eq_a", type: "h", status: true },
        { id: "eq_b", type: "h", status: true },
      ],
    },
    {
      id: "result",
      value: "6",
      matchsticks: [
        { id: "res_a", type: "h", status: true },
        { id: "res_b", type: "v", status: true },
        { id: "res_c", type: "v", status: false },
        { id: "res_d", type: "h", status: true },
        { id: "res_e", type: "v", status: true },
        { id: "res_f", type: "v", status: true },
        { id: "res_g", type: "h", status: true },
      ],
    },
  ]);

  const toggleMatchstick = (elementId, matchstickId) => {
    setEquation(prev => prev.map(element => {
      if (element.id === elementId) {
        return {
          ...element,
          matchsticks: element.matchsticks.map(matchstick => 
            matchstick.id === matchstickId 
              ? { ...matchstick, status: !matchstick.status }
              : matchstick
          )
        };
      }
      return element;
    }));
  };

  const renderDigit = (digit, elementId) => {
    const positions = {
      // Seven-segment display positions
      a: { top: "0%", left: "10%", right: "10%", height: "8px" }, // top
      b: { top: "10%", right: "0%", width: "8px", height: "40%" }, // top-right
      c: { bottom: "10%", right: "0%", width: "8px", height: "40%" }, // bottom-right
      d: { bottom: "0%", left: "10%", right: "10%", height: "8px" }, // bottom
      e: { bottom: "10%", left: "0%", width: "8px", height: "40%" }, // bottom-left
      f: { top: "10%", left: "0%", width: "8px", height: "40%" }, // top-left
      g: { top: "50%", left: "10%", right: "10%", height: "8px", transform: "translateY(-50%)" } // middle
    };

    const segments = {

      '0': ['a', 'b', 'c', 'd', 'e', 'f'],
      '1': ['b', 'c'],
      '2': ['a', 'b', 'd', 'e', 'g'],
      '3': ['a', 'b', 'c', 'd', 'g'],
      '4': ['b', 'c', 'f', 'g'],
      '5': ['a', 'c', 'd', 'f', 'g'],
      '6': ['a', 'c', 'd', 'e', 'f', 'g'],
      '7': ['a', 'b', 'c'],
      '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      '9': ['a', 'b', 'c', 'd', 'f', 'g']

    };

    return (
      <div className="relative w-20 h-32">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((segment, index) => {
          const matchstick = digit.matchsticks[index];
          const isActive = segments[digit.value].includes(segment);
          const isLit = matchstick.status;
          
          return (
            <div
              key={matchstick.id}
              className={`absolute rounded-full transition-all duration-300 ${
                matchstick.type === 'h' ? 'h-2' : 'w-2'
              }
              ${
                isLit && isActive 
                  ? 'bg-amber-500 shadow-lg shadow-amber-500/50' 
                  : isLit 
                    ? 'bg-gray-400 opacity-40' 
                    : 'bg-transparent'
              }
              `}
              style={positions[segment]}
              onClick={()=>toggleMatchstick(elementId, matchstick.id)}
            />
          );
        })}
      </div>
    );
  };

  const renderOperator = (operator, elementId) => {
    return (
      <div className="relative w-12 h-32 flex items-center justify-center">
        {operator.matchsticks.map((matchstick, index) => (
          <div
            key={matchstick.id}
            className={`absolute rounded-full transition-all duration-300 ${
              matchstick.type === 'h' 
                ? 'w-8 h-2 top-1/2' 
                : 'h-8 w-2 left-1/2'
            } ${
              matchstick.status 
                ? 'bg-amber-500 shadow-lg shadow-amber-500/50' 
                : 'bg-gray-400 opacity-40'
            }`}
            style={{
              transform: matchstick.type === 'h' 
                ? 'translateY(-50%)' 
                : 'translateX(-50%)'
            }}
            onClick={() => toggleMatchstick(elementId, matchstick.id)}
          />
        ))}
        <span className="text-4xl font-bold text-gray-300 opacity-60 pointer-events-none">
          {operator.value}
        </span>
      </div>
    );
  };

  const renderEquals = (equals, elementId) => {
    return (
      <div className="relative w-12 h-32 flex items-center justify-center">
        {equals.matchsticks.map((matchstick, index) => (
          <div
            key={matchstick.id}
            className={`absolute rounded-full w-8 h-2 transition-all duration-300 ${
              matchstick.status 
                ? 'bg-amber-500 shadow-lg shadow-amber-500/50' 
                : 'bg-gray-400 opacity-40'
            }`}
            style={{
              top: `${30 + index * 40}%`,
              transform: 'translateY(-50%)'
            }}
            onClick={() => toggleMatchstick(elementId, matchstick.id)}
          />
        ))}
        <span className="text-4xl font-bold text-gray-300 opacity-60 pointer-events-none">
          {equals.value}
        </span>
      </div>
    );
  };

  return (
    <div className=" bg-gradient-to-br from-blue-900 via-purple-900 to-red-900  p-4">

     
      <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-blue-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Matchstick Math</h1>
          <div className="flex gap-2">
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">
              Full screen
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">
              Restart
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">
              Game trailer
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors">
              Install
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 p-4 flex justify-between border-b">
          <div className="text-center">
            <div className="text-gray-600 text-sm">Levels</div>
            <div className="text-2xl font-bold text-gray-800">5/10</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 text-sm">Moves</div>
            <div className="text-2xl font-bold text-gray-800">1</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 text-sm">Score</div>
            <div className="text-2xl font-bold text-gray-800">966</div>
          </div>
        </div>

        {/* Equation */}
        <div className="p-8 bg-white">
          <div className="flex items-center justify-center gap-6">
            {equation.map((element) => {
              switch (element.id) {
                case 'num1':
                case 'num2':
                case 'result':
                  return renderDigit(element, element.id);
                case 'operator':
                  return renderOperator(element, element.id);
                case 'equals':
                  return renderEquals(element, element.id);
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-between items-center border-t">
          <div className="text-gray-600 text-sm">
            Click on matchsticks to move them and make the equation correct
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-gray-700 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg transition-all">
            Move Matchstick
          </button>
        </div>
      </div>

<div className=' bg-white  h-[300px] flex  gap-3'>
 


<div className='h-[224px]  w-[94px]  relative mx-2 '>

<div className=' w-[94px]   h-3 rounded-full absolute top-0   left-0 bg-gray-400'>



</div>

 <div className=' h-[94px]   w-3 rounded-full absolute top-3  left-0 bg-gray-400'>
  
  <MatchStick className=" absolute top-0 h-full "/>
 
 </div>

  <div className=' h-[94px]   w-3 rounded-full absolute top-3  right-0 bg-gray-400'>

    
  </div>

  <div className=' w-[94px]   h-3 rounded-full absolute top-[106px]   left-0 bg-gray-400'>


</div>


<div className=' w-[94px]   h-3 rounded-full absolute bottom-0   left-0 bg-gray-400'>


</div>
 <div className=' h-[94px]   w-3 rounded-full absolute bottom-3  left-0 bg-gray-400'></div>
  <div className=' h-[94px]   w-3 rounded-full absolute bottom-3  right-0 bg-gray-400'></div>

   
</div>

<div className='h-[224px]  w-[94px]  relative mx-2    '>

<div className=' w-[94px]   h-3 rounded-full absolute top-[50%]  left-0 bg-gray-400'>


</div>

 <div className=' h-[94px]   w-3 rounded-full absolute  top-[32%]   left-[42%] bg-gray-400'></div>

 
   
</div>


<div className='h-[224px]  w-[94px]  relative mx-2    '>

<div className=' w-[94px]   h-3 rounded-full absolute top-0   left-0 bg-gray-400'>


</div>

 <div className=' h-[94px]   w-3 rounded-full absolute top-3  left-0 bg-gray-400'></div>

  <div className=' h-[94px]   w-3 rounded-full absolute top-3  right-0 bg-gray-400'></div>

  <div className=' w-[94px]   h-3 rounded-full absolute top-[106px]   left-0 bg-gray-400'>


</div>


<div className=' w-[94px]   h-3 rounded-full absolute bottom-0   left-0 bg-gray-400'>


</div>

 <div className=' h-[94px]   w-3 rounded-full absolute bottom-3  left-0 bg-gray-400'></div>
  <div className=' h-[94px]   w-3 rounded-full absolute bottom-3  right-0 bg-gray-400'></div>

   
</div>


<div className='h-[224px]  w-[94px]  relative mx-2    '>

<div className=' w-[94px]   h-3 rounded-full absolute top-[35%]  left-0 bg-gray-400'>


</div>

<div className=' w-[94px]   h-3 rounded-full absolute top-[60%]  left-0 bg-gray-400'>


</div>

 

 
   
</div>


<div className='h-[224px]  w-[94px]  relative mx-2 '>

<div className=' w-[94px]   h-3 rounded-full absolute top-0   left-0 bg-gray-400'>


</div>

 <div className=' h-[94px]   w-3 rounded-full absolute top-3  left-0 bg-gray-400'></div>

  <div className=' h-[94px]   w-3 rounded-full absolute top-3  right-0 bg-gray-400'></div>

  <div className=' w-[94px]   h-3 rounded-full absolute top-[106px]   left-0 bg-gray-400'>


</div>


<div className=' w-[94px]   h-3 rounded-full absolute bottom-0   left-0 bg-gray-400'>


</div>
 <div className=' h-[94px]   w-3 rounded-full absolute bottom-3  left-0 bg-gray-400'></div>
  <div className=' h-[94px]   w-3 rounded-full absolute bottom-3  right-0 bg-gray-400'></div>

   
</div>






</div>


    </div>
  );
}