"use client";
import { useState, useEffect } from "react";

const PomodoroCounter: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      setShowCongratulations(true);
      setTimerActive(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, timeRemaining]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const resetTimer = () => {
    setTimeRemaining(25 * 60);
    setTimerActive(false);
    setShowCongratulations(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {showCongratulations ? (
        <h1 className="text-3xl font-bold mb-4">¡🥳🥳🥳!</h1>
      ) : (
        <h1 className="text-3xl font-bold mb-4">{formatTime(timeRemaining)}</h1>
      )}
      <div className="flex space-x-4">
        <button
          onClick={startTimer}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none"
          disabled={showCongratulations}
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroCounter;
