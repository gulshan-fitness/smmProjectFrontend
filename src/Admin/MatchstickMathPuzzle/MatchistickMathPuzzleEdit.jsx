
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../../Context_holder';

export default function MatchistickMathPuzzleEdit(){

  const { adminToken, notify ,MatchistickPuzzles,MatchistickPuzzleFetch} = useContext(Context);

  const { id } = useParams();

  const navigate = useNavigate();
  
  const [game, setGame] = useState("");

  const [result, setResult] = useState("");
  
  const [hint, setHint] = useState("");

  const [gameBackenddata, setGameBackenddata] = useState([]);
  const [resultBackenddata, setResultBackenddata] = useState([]);
  const [level, setLevel] = useState("");
  const [moves, setMoves] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
MatchistickPuzzleFetch(id)
  }, [id]);

  const Patterns = {
    0: [
      { id: 'a', status: true }, { id: 'b', status: true }, { id: 'c', status: true },
      { id: 'd', status: false }, { id: 'e', status: true }, { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    1: [
      { id: 'a', status: false }, { id: 'b', status: false }, { id: 'c', status: true },
      { id: 'd', status: false }, { id: 'e', status: false }, { id: 'f', status: true },
      { id: 'g', status: false },
    ],
    2: [
      { id: 'a', status: true }, { id: 'b', status: false }, { id: 'c', status: true },
      { id: 'd', status: true }, { id: 'e', status: true }, { id: 'f', status: false },
      { id: 'g', status: true },
    ],
    3: [
      { id: 'a', status: true }, { id: 'b', status: false }, { id: 'c', status: true },
      { id: 'd', status: true }, { id: 'e', status: false }, { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    4: [
      { id: 'a', status: false }, { id: 'b', status: true }, { id: 'c', status: true },
      { id: 'd', status: true }, { id: 'e', status: false }, { id: 'f', status: true },
      { id: 'g', status: false },
    ],
    5: [
      { id: 'a', status: true }, { id: 'b', status: true }, { id: 'c', status: false },
      { id: 'd', status: true }, { id: 'e', status: false }, { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    6: [
      { id: 'a', status: true }, { id: 'b', status: true }, { id: 'c', status: false },
      { id: 'd', status: true }, { id: 'e', status: true }, { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    7: [
      { id: 'a', status: true }, { id: 'b', status: false }, { id: 'c', status: true },
      { id: 'd', status: false }, { id: 'e', status: false }, { id: 'f', status: true },
      { id: 'g', status: false },
    ],
    8: [
      { id: 'a', status: true }, { id: 'b', status: true }, { id: 'c', status: true },
      { id: 'd', status: true }, { id: 'e', status: true }, { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    9: [
      { id: 'a', status: true }, { id: 'b', status: true }, { id: 'c', status: true },
      { id: 'd', status: true }, { id: 'e', status: false }, { id: 'f', status: true },
      { id: 'g', status: true },
    ],
    '+': [{ id: 'a', status: true }, { id: 'b', status: true }],
    '-': [{ id: 'a', status: true }, { id: 'b', status: false }],
    '=': [{ id: 'a', status: true }, { id: 'b', status: true }],
  };

  useEffect(
    ()=>{

      if(MatchistickPuzzles?.length!=0){

        setFetchLoading(false)

         setLevel(MatchistickPuzzles?.level.toString());
        setMoves(MatchistickPuzzles?.move.toString());
        setHint(MatchistickPuzzles?.hint);
        
        // Convert game array to string
        const gameString = MatchistickPuzzles?.game.map(item => item.value).join('');
        setGame(gameString);
        
        // Convert result array to string
        const resultString = MatchistickPuzzles?.result.map(item => item.value).join('');
        setResult(resultString);
        
        // Store backend data for reference
        setGameBackenddata(MatchistickPuzzles?.game);
        setResultBackenddata(MatchistickPuzzles?.result);
      }



    },
    [MatchistickPuzzles]
  )

  // const fetchPuzzleData = async () => {
  //   try {
  //     setFetchLoading(true);
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MATCHSTICKPUZZLE_URL}read/${id}`,
  //       {
  //         headers: {
  //           Authorization: adminToken,
  //         },
  //       }
  //     );
      
  //     const puzzle = response.data.data;
  //     if (puzzle) {
  //       // Pre-fill the form with existing data
  //       setLevel(puzzle.level.toString());
  //       setMoves(puzzle.move.toString());
  //       setHint(puzzle.hint);
        
  //       // Convert game array to string
  //       const gameString = puzzle.game.map(item => item.value).join('');
  //       setGame(gameString);
        
  //       // Convert result array to string
  //       const resultString = puzzle.result.map(item => item.value).join('');
  //       setResult(resultString);
        
  //       // Store backend data for reference
  //       setGameBackenddata(puzzle.game);
  //       setResultBackenddata(puzzle.result);
  //     }
  //   } catch (error) {
  //     notify('Failed to fetch puzzle data', 0);
  //     console.error('Error fetching puzzle:', error);
  //     navigate('/matchstick-puzzles');
  //   } finally {
  //     setFetchLoading(false);
  //   }
  // };

  const getInputSize = () => {
    if (windowSize.width < 640) return 'text-lg py-3 px-4';
    if (windowSize.width < 768) return 'text-xl py-4 px-5';
    return 'text-xl py-4 px-6';
  };

  const getButtonSize = () => {
    if (windowSize.width < 640) return 'py-3 px-6 text-base';
    if (windowSize.width < 768) return 'py-4 px-8 text-lg';
    return 'py-4 px-10 text-lg';
  };

  const getGridLayout = () => {
    if (windowSize.width < 768) return 'grid-cols-1 gap-4';
    if (windowSize.width < 1024) return 'grid-cols-2 gap-6';
    return 'grid-cols-3 gap-8';
  };

  const UpdateHandler = async () => {
    if (!game || !result || !hint || !level || !moves) {
      notify('Please fill all fields', 0);
      return;
    }

    setIsLoading(true);

    // Process game input
    const gameArr = game.split("");
    const resultArr = result.split("");
    const tempGameData = [];
    const tempResultData = [];

    // Process game array
    gameArr.forEach((data, index) => {
      let id;
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(data)) {
        id = index === gameArr.length - 1 ? "result" : "number";
        tempGameData.push({
          id: id,
          value: data,
          matchsticks: [...Patterns[data]]
        });
      } else if (["-", "+"].includes(data)) {
        tempGameData.push({
          id: "operator",
          value: data,
          matchsticks: [...Patterns[data]]
        });
      } else if (data === "=") {
        tempGameData.push({
          id: "equals",
          value: data,
          matchsticks: [...Patterns[data]]
        });
      }
    });

    // Process result array
    resultArr.forEach((data, index) => {
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(data)) {
        const id = index === resultArr.length - 1 ? "result" : "number";
        tempResultData.push({
          id: id,
          value: data,
          matchsticks: [...Patterns[data]]
        });
      } else if (["-", "+"].includes(data)) {
        tempResultData.push({
          id: "operator",
          value: data,
          matchsticks: [...Patterns[data]]
        });
      } else if (data === "=") {
        tempResultData.push({
          id: "equals",
          value: data,
          matchsticks: [...Patterns[data]]
        });
      }
    });

    if (tempGameData.length === 0 || tempResultData.length === 0) {
      notify('Invalid input format', 0);
      setIsLoading(false);
      return;
    }

    const data = {
      game: tempGameData,
      level: parseInt(level),
      move: parseInt(moves),
      hint: hint,
      result: tempResultData,
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MATCHSTICKPUZZLE_URL}edit/${id}`,
        data,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );

      notify(response.data.msg, response.data.status);
      if (response.data.status === 1){
       
       MatchistickPuzzleFetch(id)

      }
    } catch (error) {
      notify(error.message, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const CancelHandler = () => {
    navigate('/matchstick-puzzles');
  };

  const inputSize = getInputSize();
  const buttonSize = getButtonSize();
  const gridLayout = getGridLayout();

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#111] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffd700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#ffd700] text-lg">Loading Puzzle Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111] via-[#0a0a0a] to-[#111] p-4 sm:p-6 md:p-8">
      {/* Gold Accent Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ffd700]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#ffd700]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] p-0.5 rounded-2xl sm:rounded-3xl shadow-2xl shadow-[#ffd700]/20">
              <div className="bg-[#111] rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-4 sm:py-6 border border-[#ffd700]/10">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ffd700] to-[#ffed4e] bg-clip-text text-transparent mb-2 sm:mb-4">
                  Edit Matchstick Puzzle
                </h1>
                <p className="text-[#ffd700]/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  Update and modify your mathematical puzzle
                </p>
                <div className="mt-3 flex items-center justify-center space-x-2 text-[#ffd700]/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Editing Level {level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-[#111]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#ffd700]/20 shadow-2xl shadow-[#ffd700]/10 p-6 sm:p-8 md:p-10 mb-8">
          {/* Level and Moves */}
          <div className={`grid ${gridLayout} mb-8`}>
            <div className="space-y-2">
              <label className="block text-[#ffd700] text-sm font-semibold mb-2">
                Level Number
              </label>
              <input
                type="number"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Enter level number"
                className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 ${inputSize}`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#ffd700] text-sm font-semibold mb-2">
                Allowed Moves
              </label>
              <input
                type="number"
                value={moves}
                onChange={(e) => setMoves(e.target.value)}
                placeholder="Enter number of moves"
                className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 ${inputSize}`}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#ffd700] text-sm font-semibold mb-2">
                Hint
              </label>
              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Enter puzzle hint"
                className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 ${inputSize}`}
              />
            </div>
          </div>

          {/* Puzzle Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Puzzle Input */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#ffd700]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700]">
                  Puzzle Equation
                </h3>
                <div className="w-8 h-8 bg-[#ffd700]/20 rounded-lg flex items-center justify-center border border-[#ffd700]/30">
                  <svg className="w-4 h-4 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-[#ffd700]/80 text-sm mb-2">
                  Enter the initial equation (e.g., "3+5=8")
                </label>
                <input
                  type="text"
                  value={game}
                  onChange={(e) => {
                    setGame(e.target.value);
                    setGameBackenddata([]);
                  }}
                  placeholder="Example: 3+5=8"
                  className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 ${inputSize}`}
                />
                <p className="text-xs text-[#ffd700]/60">
                  Use numbers (0-9), operators (+, -), and equals (=) only
                </p>
              </div>
            </div>

            {/* Result Input */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#ffd700]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700]">
                  Solution Equation
                </h3>
                <div className="w-8 h-8 bg-[#ffd700]/20 rounded-lg flex items-center justify-center border border-[#ffd700]/30">
                  <svg className="w-4 h-4 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-[#ffd700]/80 text-sm mb-2">
                  Enter the solved equation (e.g., "9-5=4")
                </label>
                <input
                  type="text"
                  value={result}
                  onChange={(e) => {
                    setResult(e.target.value);
                    setResultBackenddata([]);
                  }}
                  placeholder="Example: 9-5=4"
                  className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 ${inputSize}`}
                />
                <p className="text-xs text-[#ffd700]/60">
                  This should be the correct solution after moving matchsticks
                </p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {(game || result) && (
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#ffd700]/10 mb-8">
              <h3 className="text-lg font-semibold text-[#ffd700] mb-4">Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {game && (
                  <div className="text-center">
                    <p className="text-[#ffd700]/60 text-sm mb-2">Puzzle</p>
                    <div className="bg-[#111] rounded-xl p-4 border border-[#ffd700]/20">
                      <p className="text-2xl sm:text-3xl font-mono text-[#ffd700]">{game}</p>
                    </div>
                  </div>
                )}
                {result && (
                  <div className="text-center">
                    <p className="text-[#ffd700]/60 text-sm mb-2">Solution</p>
                    <div className="bg-[#111] rounded-xl p-4 border border-[#ffd700]/20">
                      <p className="text-2xl sm:text-3xl font-mono text-[#ffd700]">{result}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={UpdateHandler}
              disabled={isLoading}
              className={`
                bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:from-[#ffed4e] hover:to-[#ffd700] 
                text-[#111] font-bold rounded-xl shadow-2xl shadow-[#ffd700]/30 transform transition-all duration-300 
                hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                border border-[#ffd700]/50
                ${buttonSize} flex-1
              `}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2 justify-center">
                  <div className="w-5 h-5 border-2 border-[#111] border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Puzzle...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 justify-center">
                  <svg className="w-5 h-5 text-[#111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Update Puzzle</span>
                </div>
              )}
            </button>
            
           
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#111]/90 backdrop-blur-xl rounded-2xl border border-[#ffd700]/20 shadow-2xl shadow-[#ffd700]/10 p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700] mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Editing Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#ffd700]/80">
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Modify any field to update the puzzle
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Equations must remain mathematically valid
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Ensure solution is achievable within moves
              </li>
            </ul>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Level number affects difficulty ordering
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Update hint to reflect any changes
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                All fields are required for update
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}