import React, { useState, useCallback } from 'react';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DiceGame() {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [targetNumber, setTargetNumber] = useState(50);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState<'win' | 'lose' | null>(null);

  const calculateWinChance = (isOver: boolean) => {
    return isOver ? (100 - targetNumber) : targetNumber;
  };

  const calculateMultiplier = (winChance: number) => {
    return (99 / winChance).toFixed(2);
  };

  const roll = useCallback((isOver: boolean) => {
    if (isRolling || betAmount > balance) return;

    setIsRolling(true);
    const rollResult = Math.random() * 100;
    setLastRoll(Number(rollResult.toFixed(2)));

    const didWin = isOver ? rollResult > targetNumber : rollResult < targetNumber;
    const winAmount = didWin ? betAmount * Number(calculateMultiplier(calculateWinChance(isOver))) : 0;

    setTimeout(() => {
      setBalance(prev => prev - betAmount + winAmount);
      setLastResult(didWin ? 'win' : 'lose');
      setIsRolling(false);
      toast(didWin ? '🎉 You won!' : '😢 You lost', {
        icon: didWin ? '🎉' : '😢',
      });
    }, 1000);
  }, [betAmount, balance, targetNumber, isRolling]);

  const adjustBet = (factor: number) => {
    const newBet = betAmount * factor;
    if (newBet >= 1 && newBet <= balance) {
      setBetAmount(Number(newBet.toFixed(2)));
    }
  };

  const setMaxBet = () => {
    setBetAmount(balance);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dice Game</h1>
        <div className="text-xl font-semibold text-white">
          Balance: ${balance.toFixed(2)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-2 text-white">
              Bet Amount
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="flex-1 bg-gray-600 rounded px-3 py-2 text-white"
                min="1"
                max={balance}
              />
              <button
                onClick={() => adjustBet(0.5)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                ÷2
              </button>
              <button
                onClick={() => adjustBet(2)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                ×2
              </button>
              <button
                onClick={setMaxBet}
                className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-white"
              >
                Max
              </button>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <label className="block text-sm font-medium mb-2 text-white">
              Target Number (1-99)
            </label>
            <input
              type="number"
              value={targetNumber}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1 && value <= 99) {
                  setTargetNumber(value);
                }
              }}
              className="w-full bg-gray-600 rounded px-3 py-2 text-white"
              min="1"
              max="99"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="text-center mb-4">
            {lastRoll !== null && (
              <div className={`text-6xl font-bold mb-4 ${
                lastResult === 'win' ? 'text-green-500' : 
                lastResult === 'lose' ? 'text-red-500' : ''
              }`}>
                {lastRoll.toFixed(2)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => roll(false)}
              disabled={isRolling || betAmount > balance}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg text-lg font-bold text-white ${
                isRolling ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <ArrowBigDown className="w-6 h-6" />
              Roll Under {targetNumber}
            </button>
            <button
              onClick={() => roll(true)}
              disabled={isRolling || betAmount > balance}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg text-lg font-bold text-white ${
                isRolling ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <ArrowBigUp className="w-6 h-6" />
              Roll Over {targetNumber}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center bg-gray-700 p-4 rounded-lg">
        <div>
          <div className="text-sm text-gray-400">Win Chance</div>
          <div className="text-xl font-bold text-white">
            {calculateWinChance(true)}% Over | {calculateWinChance(false)}% Under
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Fair Multiplier</div>
          <div className="text-xl font-bold text-white">
            {calculateMultiplier(calculateWinChance(true))}x
          </div>
        </div>
      </div>
    </div>
  );
}