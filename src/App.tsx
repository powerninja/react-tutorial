import { useState } from 'react';
import './App.css';

type numValue = {
  value: string | null;
  onSquareClick: Function;
};

type boardType = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: Function;
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

// マス目のチェックを行う
const calculateWinner = (squares: (string | null)[]) => {
  //勝ちパターンの記載
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

// マス目の描写
// 順番にまるばつを置く
// プレイヤーの判定
const Board = ({ xIsNext, squares, onPlay }: boardType) => {
  //押下したマス目に⭕️や❌を反映させ、プレイヤーを入れ替える
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

    onPlay(nextSquares);
  };

  //勝者を判定する
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

export const Game = () => {
  //ターンごとのマス目を配列で保存
  const [history, setHistory] = useState([Array(9).fill(null)]);
  //何ターン目かを管理する
  const [currentMove, setCurrentMove] = useState<number>(0);
  //ターンを管理
  const xIsNext = currentMove % 2 === 0;

  //(マス目押下後の)現状のマス目を取得
  //全てのターンのマス目を保存しているため、1ターンのマス目をuseStateを使用して保存する必要がない
  const currentSquares = history[currentMove];

  //過去のマス目の末尾に、最新のマス目を追加し保存する
  //プレイヤー変更を行う
  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  //html部でmovesを定義しているので、呼び出される
  //historyの要素数が1以上になった場合、Go to move #1のようなボタンを表示する、1未満の場合はGo to game startを表示する
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
