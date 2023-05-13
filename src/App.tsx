import { useState } from 'react';
import './App.css';

type numValue = {
  value: string | null;
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

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //1. aのマス目に値が入っているか確認
    //2. aとbのマス目に入力されている値が一致していることを確認
    //3. aとcのマス目に入力されている値が一致していることを確認
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //4,5,7,8は、01236のどれかが埋まっていることが確定条件なので、未チェック
      return squares[a];
    }
  }
  return null;
};

export const Board = () => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  const handleClick = (num: number) => {
    if (squares[num] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[num] = '❌';
    } else {
      nextSquares[num] = '⭕️';
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? '❌' : '⭕️'}`;
  }
  return (
    <>
      <div className="status">{status}</div>
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
