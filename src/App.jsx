import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/die';
import StyleStudyCard from './components/style.study.card';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { Clock, Repeat } from 'lucide-react';

function App() {
  const [dice, setDice] = useState(generateNumbers());
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [successTime, setSuccessTime] = useState(null);
  const [previousTimes, setPreviousTimes] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    let interval;
    if (isTiming && !gameWon) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTiming]);

  const gameWon =
    dice.every((die) => die.isHeld) && dice.every((die) => die.value === dice[0].value);

  function generateNumbers() {
    return new Array(12).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateNumbers());
      setRollCount(0);
      setTimer(0);
      setIsTiming(false);
      setShowEmoji(false);
      setShowCongrats(false);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setRollCount((prev) => prev + 1);
      if (!isTiming) {
        setIsTiming(true);
      }
    }
  }

  function toggleHold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  function handleGameWin() {
    if (gameWon) {
      setSuccessTime(timer);
      setPreviousTimes((prev) => [timer, ...prev]);
      setIsTiming(false);
      setShowEmoji(true);
      setTimeout(() => {
        setShowEmoji(false);
        setShowCongrats(true);
      }, 1500);
    }
  }

  useEffect(() => {
    handleGameWin();
  }, [gameWon, timer]);

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      toggleHold={() => toggleHold(dieObj.id)}
    />
  ));

  return (
    <>
      <StyleStudyCard />
	  <section className="p-8 ">
	  {gameWon && <Confetti width={window.innerWidth} height={window.innerHeight} />}

<h1 className="text-center text-3xl font-extrabold mt-4">🎲 Dice Roller</h1>
<p className="text-center text-gray-600 px-4">
  Roll until all dice have the same value. Click each die to freeze it at its current value
  between rolls.
</p>

<div className="grid grid-cols-4 lg:grid-cols-3 p-4 gap-4 bg-gray-300 rounded-lg text-white font-extrabold">
  {diceElements}
</div>

<div className="flex justify-center mt-4 gap-4 items-center">
  <button
	className="bg-blue-500 text-white font-extrabold py-2 px-4 rounded hover:bg-blue-600 transition flex items-center gap-2"
	onClick={rollDice}
  >
	<Repeat size={20} /> {gameWon ? 'New Game' : 'Roll'}
  </button>

  <div className="flex items-center gap-2 text-gray-700">
	<Clock size={20} /> <span>{timer}s</span>
  </div>

  <div className="text-gray-700 font-semibold">Rolls: {rollCount}</div>
</div>

{showEmoji && (
  <div className="text-center text-6xl mt-4 animate-bounce">
	🎉
  </div>
)}

{showCongrats && (
  <div className="text-center mt-4 text-xl">
	<p>Congratulations! You completed the game in {successTime} seconds!</p>
  </div>
)}

<div className="mt-4">
  <h2 className="text-center text-xl font-semibold">Previous Times</h2>
  <ul className="text-center">
	{previousTimes.map((time, index) => (
	  <li key={index} className="text-gray-700">
		{`Game ${index + 1}: ${time} seconds`}
	  </li>
	))}
  </ul>
</div>
	  </section>
      

	  <footer className="bg-gray-800 text-center text-gray-300 py-6 mt-8 px-4 sm:px-8">
  <p className="text-lg sm:text-xl font-semibold mb-2">Made with ❤️ by Lapidis</p>
  <p className="text-sm sm:text-base mb-2">Using React and Tailwind CSS</p>
  <p className="text-sm sm:text-base mb-2">Inspired by the original game</p>
  <p className="text-sm sm:text-base mb-2">
    Check out the source code on{' '}
    <a
      href="https://github.com/Lapidis2/tenzies-game-react"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-500"
    >
      GitHub
    </a>
  </p>
  <p className="text-xs sm:text-sm mb-2">© 2023 Your Jean</p>
  <p className="text-xs sm:text-sm mb-2">All rights reserved</p>
  <p className="text-xs sm:text-sm">
    <a href="/terms" className="text-blue-400 hover:text-blue-500">Terms of Service</a> |{' '}
    <a href="/privacy" className="text-blue-400 hover:text-blue-500">Privacy Policy</a>
  </p>
</footer>

    </>
  );
}

export default App;
