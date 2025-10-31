import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context_holder';

export default function MatchstickMathPuzzleAdd() {
  const { adminToken, notify, MatchistickCounts, MatchistickPuzzletotalcountFetch } = useContext(Context);
  const [game, setGame] = useState("");
  const [result, setResult] = useState("");
  const [hint, setHint] = useState("");
 
 
  const [moves, setMoves] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    MatchistickPuzzletotalcountFetch()
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const SaveHandler = async () => {
    if (!game || !result || !hint || !MatchistickCounts || !moves) {
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
      level: parseInt(MatchistickCounts + 1),
      move: parseInt(moves),
      hint: hint,
      result: tempResultData,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_MATCHSTICKPUZZLE_URL}add`,
        data,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );

      notify(response.data.msg, response.data.status);
      if (response.data.status === 1) {
        setGame("");
        setResult("");
        setHint("");
        setMoves("");
      
      
         MatchistickPuzzletotalcountFetch()
      }
    } catch (error) {
      notify(error.message, 0);
    } finally {
      setIsLoading(false);
    }
  };

  const inputSize = getInputSize();
  const buttonSize = getButtonSize();
  const gridLayout = getGridLayout();

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
                  Create Matchstick Puzzle
                </h1>
                <p className="text-[#ffd700]/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                  Design challenging mathematical puzzles with matchstick interactions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-[#111]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#ffd700]/20 shadow-2xl shadow-[#ffd700]/10 p-6 sm:p-8 md:p-10 mb-8">
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

          {/* Hint and Moves Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Hint Input */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#ffd700]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700]">
                  Puzzle Hint
                </h3>
                <div className="w-8 h-8 bg-[#ffd700]/20 rounded-lg flex items-center justify-center border border-[#ffd700]/30">
                  <svg className="w-4 h-4 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-[#ffd700]/80 text-sm mb-2">
                  Provide a helpful hint for solving the puzzle
                </label>
                <textarea
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  placeholder="Example: Try moving one matchstick from the first number to make a different number..."
                  rows="3"
                  className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 resize-none ${inputSize}`}
                />
                <p className="text-xs text-[#ffd700]/60">
                  Give players a clue without revealing the solution
                </p>
              </div>
            </div>

            {/* Moves Input */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#ffd700]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700]">
                  Maximum Moves
                </h3>
                <div className="w-8 h-8 bg-[#ffd700]/20 rounded-lg flex items-center justify-center border border-[#ffd700]/30">
                  <svg className="w-4 h-4 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-[#ffd700]/80 text-sm mb-2">
                  Number of matchstick moves allowed
                </label>
                <input
                  type="number"
                  value={moves}
                  onChange={(e) => setMoves(e.target.value)}
                  placeholder="Example: 1"
                  min="1"
                  max="10"
                  className={`w-full bg-[#1a1a1a] border border-[#ffd700]/30 rounded-xl text-white placeholder-[#ffd700]/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent transition-all duration-300 ${inputSize}`}
                />
                <p className="text-xs text-[#ffd700]/60">
                  Typically 1-3 moves for challenging puzzles
                </p>
              </div>
            </div>
          </div>

          {/* Level Information */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#ffd700]/20 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700]">
                Level Information
              </h3>
              <div className="w-8 h-8 bg-[#ffd700]/20 rounded-lg flex items-center justify-center border border-[#ffd700]/30">
                <svg className="w-4 h-4 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[#ffd700]/60 text-sm mb-1">Current Level</p>
                <div className="bg-[#111] rounded-xl p-3 border border-[#ffd700]/20">
                  <p className="text-2xl font-bold text-[#ffd700]">{MatchistickCounts + 1}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[#ffd700]/60 text-sm mb-1">Total Puzzles</p>
                <div className="bg-[#111] rounded-xl p-3 border border-[#ffd700]/20">
                  <p className="text-2xl font-bold text-[#ffd700]">{MatchistickCounts}</p>
                </div>
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
              {(hint || moves) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {hint && (
                    <div className="text-center">
                      <p className="text-[#ffd700]/60 text-sm mb-2">Hint Preview</p>
                      <div className="bg-[#111] rounded-xl p-4 border border-[#ffd700]/20">
                        <p className="text-sm text-[#ffd700]/80">{hint}</p>
                      </div>
                    </div>
                  )}
                  {moves && (
                    <div className="text-center">
                      <p className="text-[#ffd700]/60 text-sm mb-2">Moves Allowed</p>
                      <div className="bg-[#111] rounded-xl p-4 border border-[#ffd700]/20">
                        <p className="text-2xl font-bold text-[#ffd700]">{moves}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={SaveHandler}
              disabled={isLoading}
              className={`
                bg-gradient-to-r from-[#ffd700] to-[#ffed4e] hover:from-[#ffed4e] hover:to-[#ffd700] 
                text-[#111] font-bold rounded-xl shadow-2xl shadow-[#ffd700]/30 transform transition-all duration-300 
                hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                border border-[#ffd700]/50
                ${buttonSize}
              `}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-[#111] border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Puzzle...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Create Matchstick Puzzle</span>
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
            Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#ffd700]/80">
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Use numbers 0-9, operators + - = only
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Equations must be mathematically valid
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Solution should be achievable within moves
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Provide clear but not obvious hints
              </li>
            </ul>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Level number determines difficulty order
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Moves should challenge but be solvable
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Hint should guide without giving away solution
              </li>
              <li className="flex items-start">
                <span className="text-[#ffd700] mr-2">•</span>
                Test puzzles before publishing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}