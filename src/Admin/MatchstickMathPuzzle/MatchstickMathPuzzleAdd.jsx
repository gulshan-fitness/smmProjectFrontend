import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context_holder';

export default function MatchstickMathPuzzleAdd() {
  const {adminToken,notify }=useContext(Context)

    const [game, setGame] = useState("");

  const [result, setResult] = useState("");

  const [hint, sethint] = useState("");


    const [gameBackenddata, setgameBackenddata] = useState([]);

  const [ResultBackenddata, setResultBackenddata] = useState([]);

    

  const [level, setLevel] = useState(0);
  const [moves, setMoves] = useState(0);


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


useEffect(
    ()=>{


    },[game,result]
)









const SaveHandler=()=>{
    if(game && result ){
    
    const  gameArr= game?.split("")
    const  resultArr= result?.split("")

    setgameBackenddata([])
    setResultBackenddata([])



    gameArr?.map(
        (data,index)=> {

         

        if( ["0","1","2","3","4","5","6","7","8","9"].includes(data) ){

            const numobj={
                  id: gameArr?.length-1==index?"result":"number",
      value: data,
      matchsticks: [...Patterns[data]]
    
            }
setgameBackenddata(
    predata=>{

       const newarr=[...predata] 
    newarr.push(numobj)
return newarr
    }
)

           
            

        }

          if( ["-","+",].includes(data) ){

            const numobj={
                  id: "operator",
      value: data,
      matchsticks: [...Patterns[data]]
    
            }
setgameBackenddata(
    predata=>{

       const newarr=[...predata] 
    newarr.push(numobj)
return newarr
    }
)

            
            

        }

            if( ["="].includes(data) ){

            const numobj={
      id: "equals",
      value: data,
      matchsticks: [...Patterns[data]]
    
            }
setgameBackenddata(
    predata=>{
       const newarr=[...predata] 
       newarr.push(numobj)
return newarr
    }
)

            
            

        }

        


        
        
        }
    )

      resultArr?.map(
        (data,index)=> {

         

        if( ["0","1","2","3","4","5","6","7","8","9"].includes(data) ){

            const numobj={
                  id: gameArr?.length-1==index?"result":"number",
      value: data,
      matchsticks: [...Patterns[data]]
    
            }
setResultBackenddata(
    predata=>{

       const newarr=[...predata] 
    newarr.push(numobj)
return newarr
    }
)

           
            

        }

          if( ["-","+",].includes(data) ){

            const numobj={
                  id: "operator",
      value: data,
      matchsticks: [...Patterns[data]]
    
            }
setResultBackenddata(
    predata=>{

       const newarr=[...predata] 
    newarr.push(numobj)
return newarr
    }
)

            
            

        }

            if( ["="].includes(data) ){

            const numobj={
      id: "equals",
      value: data,
      matchsticks: [...Patterns[data]]
    
            }
setResultBackenddata(
    predata=>{
       const newarr=[...predata] 
       newarr.push(numobj)
return newarr
    }
)

            
            

        }

        


        
        
        }
    )
    

    
        if(gameBackenddata?.length!=0&&adminToken && 
          ResultBackenddata?.length!=0 && level && moves &&hint){

  const data={
  game:gameBackenddata,
  level: level ,
  move:moves ,
  hint: hint,
  result: ResultBackenddata,
            }


        axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MATCHSTICKPUZZLE_URL}add`,
        data,
        {
          headers: {
            Authorization: adminToken,
          },
        }

      )
      .then((success) => {
        notify(success.data.msg, success.data.status);

        if (success.data.status === 1) {
          setGame(" ")
        }
      })
      .catch((error) => {
        notify(error.message, 0);
      });



        }
}





}



//   const initialGame = [
//     { id: "item1", type: "number", value: "3" },
//     { id: "item2", type: "operator", value: "+" },
//     { id: "item3", type: "number", value: "5" },
//     { id: "item4", type: "operator", value: "=" },
//     { id: "item5", type: "number", value: "8" }
//   ];


  

  console.log(game);
  

//   const updateValue = (id, newValue, isResult = false) => {
//     const setter = isResult ? setResult : setGame;
//     setter(prev => prev.map(item => 
//       item.id === id ? { ...item, value: newValue } : item
//     ));
//   };

//   const toggleMatchstick = (itemId, stickId, isResult = false) => {
//     const setter = isResult ? setResult : setGame;
//     setter(prev => prev.map(item => {
//       if (item.id === itemId) {
//         const pattern = item.type === 'number' ? digitPatterns[item.value] : 
//                        item.type === 'operator' ? operatorPatterns[item.value] : {};
        
//         const currentMatchsticks = item.matchsticks || Object.entries(pattern).map(([id, status]) => ({
//           id, status
//         }));
        
//         const updatedMatchsticks = currentMatchsticks.map(stick => 
//           stick.id === stickId ? { ...stick, status: !stick.status } : stick
//         );
        
//         return { ...item, matchsticks: updatedMatchsticks };
//       }
//       return item;
//     }));
//   };

//   const generateMatchsticks = (item) => {
//     if (item.type === 'number') {
//       const pattern = digitPatterns[item.value] || {};
//       return Object.entries(pattern).map(([id, status]) => ({
//         id,
//         status: item.matchsticks?.find(m => m.id === id)?.status ?? status
//       }));
//     } else if (item.type === 'operator') {
//       const pattern = operatorPatterns[item.value] || {};
//       return Object.entries(pattern).map(([id, status]) => ({
//         id,
//         status: item.matchsticks?.find(m => m.id === id)?.status ?? status
//       }));
//     }
//     return [];
//   };

//   const generateOutput = () => {
//     const gameWithMatchsticks = game.map(item => ({
//       ...item,
//       matchsticks: generateMatchsticks(item)
//     }));

//     const resultWithMatchsticks = result.map(item => ({
//       ...item,
//       matchsticks: generateMatchsticks(item)
//     }));

//     const output = {
//       game: gameWithMatchsticks,
//       level,
//       move: moves,
//       result: resultWithMatchsticks
//     };

//     setJsonOutput(JSON.stringify(output, null, 2));
//   };

//   const DigitDisplay = ({ item, onToggle, isResult = false }) => {
//     const matchsticks = generateMatchsticks(item);
//     const segments = [
//       { id: 'a', className: 'top' },
//       { id: 'b', className: 'top-right' },
//       { id: 'c', className: 'bottom-right' },
//       { id: 'd', className: 'bottom' },
//       { id: 'e', className: 'bottom-left' },
//       { id: 'f', className: 'top-left' },
//       { id: 'g', className: 'middle' }
//     ];

//     return (
//       <div className="relative w-16 h-24 bg-gray-900 rounded-lg p-2">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-2xl font-bold text-white">{item.value}</span>
//         </div>
//         {segments.map(seg => {
//           const matchstick = matchsticks.find(m => m.id === seg.id);
//           if (!matchstick) return null;
          
//           return (
//             <div
//               key={seg.id}
//               className={`absolute w-1 bg-yellow-400 transition-all duration-200 ${
//                 matchstick.status ? 'opacity-100' : 'opacity-30'
//               } ${seg.className}`}
//               onClick={() => onToggle(item.id, seg.id, isResult)}
//             />
//           );
//         })}
//       </div>
//     );
//   };

//   const OperatorDisplay = ({ item, onToggle, isResult = false }) => {
//     const matchsticks = generateMatchsticks(item);
    
//     return (
//       <div className="relative w-12 h-24 flex items-center justify-center">
//         <span className="text-3xl font-bold text-white">{item.value}</span>
//         <div className="absolute space-y-2">
//           {matchsticks.map(stick => (
//             <div
//               key={stick.id}
//               className={`w-8 h-1 bg-yellow-400 transition-all duration-200 ${
//                 stick.status ? 'opacity-100' : 'opacity-30'
//               } ${stick.id === 'b' ? 'rotate-90' : ''}`}
//               onClick={() => onToggle(item.id, stick.id, isResult)}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const ItemEditor = ({ item, onUpdate, onToggle, isResult = false }) => {
//     return (
//       <div className="flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg">
//         <div className="flex space-x-2">
//           <select
//             value={item.type}
//             onChange={(e) => onUpdate(item.id, 'type', e.target.value, isResult)}
//             className="px-2 py-1 bg-gray-700 text-white rounded"
//           >
//             <option value="number">Number</option>
//             <option value="operator">Operator</option>
//           </select>
          
//           {item.type === 'number' ? (
//             <select
//               value={item.value}
//               onChange={(e) => onUpdate(item.id, 'value', e.target.value, isResult)}
//               className="px-2 py-1 bg-gray-700 text-white rounded"
//             >
//               {['0','1','2','3','4','5','6','7','8','9'].map(num => (
//                 <option key={num} value={num}>{num}</option>
//               ))}
//             </select>
//           ) : (
//             <select
//               value={item.value}
//               onChange={(e) => onUpdate(item.id, 'value', e.target.value, isResult)}
//               className="px-2 py-1 bg-gray-700 text-white rounded"
//             >
//               <option value="+">+</option>
//               <option value="-">-</option>
//               <option value="=">=</option>
//             </select>
//           )}
//         </div>

//         {item.type === 'number' ? (
//           <DigitDisplay item={item} onToggle={onToggle} isResult={isResult} />
//         ) : (
//           <OperatorDisplay item={item} onToggle={onToggle} isResult={isResult} />
//         )}
//       </div>
//     );
//   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Matchstick Math Puzzle Creator
        </h1>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="block text-white mb-2">Level</label>
            <input
              type="number"
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="block text-white mb-2">Moves</label>
            <input
              type="number"
              value={moves}
              onChange={(e) => setMoves(parseInt(e.target.value))}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
        </div>

<div className=' flex gap-2 justify-between items-center'>

<div className=' border-2 p-2  '>

    <p>Puzzle</p>

    <label htmlFor="">use numbers only 0 to 9</label>

    <input type="text"   className='block px-2'
     onChange={(e)=>{setGame(e.target.value)

      setgameBackenddata([])
     }} 
     />


</div>


<div className=' border-2 p-2  '>

    <p>Result</p>

    <label htmlFor="">use numbers only 0 to 9</label>

    <input type="text" className='block px-2'
     onChange={(e)=>{setResult(e.target.value)

      setResultBackenddata([])
     }} 
     />


</div>


<div className=' border-2 p-2  '>

    <p>Hint</p>

    <label htmlFor="">use numbers only 0 to 9</label>

    <input type="text" className='block px-2'
     onChange={(e)=>{sethint(e.target.value)

     
     }} 
     />


</div>


<div>
    
</div>


<div>
    
</div>
</div>


<button className='px-3 py-1 border-2' onClick={()=>SaveHandler() }>
    save
</button>


      </div>
    </div>
  );
};

