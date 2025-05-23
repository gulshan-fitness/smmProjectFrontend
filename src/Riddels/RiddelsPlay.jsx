import React, { useState } from 'react';

const riddlesData = [
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "An echo",
    category: "Wordplay",
    trait: "Openness"
  },
  {
    question: "A farmer has 17 sheep and all but 9 run away. How many are left?",
    answer: "9",
    category: "Logic",
    trait: "Conscientiousness"
  },
  {
    question: "If you have me, you want to share me. If you share me, you haven’t got me. What am I?",
    answer: "A secret",
    category: "Social",
    trait: "Extraversion"
  },
  {
    question: "A homeless man is given $100. He spends $90 on food and donates $10 to another person in need. What did he just demonstrate?",
    answer: "Empathy",
    category: "Empathy",
    trait: "Agreeableness"
  },
  {
    question: "You’re in a dark room with a candle, a wood stove, and a gas lamp. You only have one match. What do you light first?",
    answer: "The match",
    category: "Stress-Relief",
    trait: "Neuroticism"
  }
];

export default function RiddleQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const currentRiddle = riddlesData[currentIndex];

  const checkAnswer = () => {
    setShowResult(true);
  };

  const nextRiddle = () => {
    setCurrentIndex((prev) => (prev + 1) % riddlesData.length);
    setUserAnswer('');
    setShowResult(false);
  };

  const isCorrect = () => {
    return userAnswer.trim().toLowerCase() === currentRiddle.answer.toLowerCase();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Riddle Quiz</h1>

      <div className="mb-4">
        <p className="text-lg font-semibold">Category: <span className="italic">{currentRiddle.category}</span></p>
        <p className="text-lg font-semibold">Trait: <span className="italic">{currentRiddle.trait}</span></p>
      </div>

      <div className="mb-4">
        <p className="text-xl">{currentRiddle.question}</p>
      </div>

      {!showResult ? (
        <>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className={`w-full py-2 rounded text-white font-semibold ${userAnswer.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Submit Answer
          </button>
        </>
      ) : (
        <div className="text-center">
          {isCorrect() ? (
            <p className="text-green-600 font-bold text-lg mb-2">Correct! 🎉</p>
          ) : (
            <>
              <p className="text-red-600 font-bold text-lg mb-2">Oops, that's not correct.</p>
              <p className="text-gray-700 mb-4"><strong>Answer:</strong> {currentRiddle.answer}</p>
            </>
          )}
          <button
            onClick={nextRiddle}
            className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
          >
            Next Riddle
          </button>
        </div>
      )}
    </div>
  );
}
