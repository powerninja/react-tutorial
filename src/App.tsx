import React, { useState } from 'react';
import './App.css';

type numValue = {
  value?: string;
  onSquareClick: Function;
};

//<Square value="1" />で関数を呼び出すとprops.valueとして値が渡される
//そのため、{value}と記載し分割代入をおこなっている
const Square = ({ value, onSquareClick }: numValue) => {
  return (
    <button className="square" onClick={() => onSquareClick()}>
      {value}
    </button>
  );
};

export const Board = () => {
  const [squares, setSquares] = useState<any>(Array(9).fill(null));

  const handleClick = (num: number) => {
    const nextSquares = [...squares];
    nextSquares[num] = '❌';
    setSquares(nextSquares);
  };
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};
