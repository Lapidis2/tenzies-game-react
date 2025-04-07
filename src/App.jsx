import React, { useState, useEffect } from 'react';
import './App.css';
import Die from './components/die';
import StyleStudyCard from './components/style.study.card';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import { Clock, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [dice, setDice] = useState(generateNumbers());
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);

  const gameWon = dice.every(die => die.isHeld) &&
                  dice.every(die => die.value === dice[0].value);

  useEffect(() => {
    let interval;
    if (isTiming && !gameWon) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTiming, gameWon]);

  function generateNumbers() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!isTiming) setIsTiming(true);

    if (gameWon) {
      setDice(generateNumbers());
      setRollCount(0);
      setTimer(0);
      setIsTiming(false);
    } else {
      setDice(prevDice =>
        prevDice.map(die =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setRollCount(prev => prev + 1);
    }
  }

  function toggleHold(id) {
    setDice(prevDice =>
      prevDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map(dieObj => (
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
  
	  {gameWon && (
		<>
		  <Confetti width={window.innerWidth} height={window.innerHeight} />
		  <motion.h2
			initial={{ scale: 0 }}
			animate={{ scale: 1.1 }}
			transition={{
			  type: "spring",
			  stiffness: 300,
			  damping: 10,
			}}
			className="text-center text-green-600 text-4xl font-bold mt-4"
		  >
			🎉 You Won! 🎉
		  </motion.h2>
		</>
	  )}
  
	  <h1 className="text-center text-3xl font-extrabold mt-4">🎲 Dice Roller</h1>
	  <p className="text-center text-gray-600 px-4">
		Roll until all dice have the same value. Click each die to freeze it at its current value between rolls.
	  </p>
  
	  <div className="grid grid-cols-5 p-4 gap-4 bg-gray-300 rounded-lg text-white font-extrabold">
		{diceElements}
	  </div>
  
	  <div className="flex justify-center mt-4 gap-4 items-center">
		<button
		  className="bg-blue-500 text-white font-extrabold py-2 px-4 rounded hover:bg-blue-600 transition flex items-center gap-2"
		  onClick={rollDice}
		>
		  <Repeat size={20} /> {gameWon ? "New Game" : "Roll"}
		</button>
  
		<div className="flex items-center gap-2 text-gray-700">
		  <Clock size={20} /> <span>{timer}s</span>
		</div>
  
		<div className="text-gray-700 font-semibold">
		  Rolls: {rollCount}
		</div>
	  </div>
	</>
  );
  
}

export default App;
