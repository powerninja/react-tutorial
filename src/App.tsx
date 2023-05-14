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

//ランダムな数字を返却する関数
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

// マス目の描写
// 順番にまるばつを置く
// プレイヤーの判定
export const Board = () => {
  //ターンを管理
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  //マス目の管理
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  //
  const [squareNum, setSquareNum] = useState<(number | null)[]>([]);

  //押下したマス目に⭕️や❌を反映させ、プレイヤーを入れ替える
  const handleClick = (num: number) => {
    if (squares[num] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    if (xIsNext) {
      nextSquares[num] = '❌';
      squareNum.push(num);
      setSquareNum([...squareNum]);
      // console.log(squareNum);

      let randomNum = getRandomInt(9);
      console.log(randomNum);
      let indices = squares.map((item, index) => (item !== null ? index : null)).filter((index) => index !== null);
      indices.push(num);
      console.log(indices);
      for (let i = 0; i < 20; i++) {
        if (indices[i] !== randomNum) {
          //TODO: 今は上から検索し、一致した時点で終了しているが全て検索する必要がある
          //ランダム値出す
          //indices配列全体に重複する値がないことを確認する
          //squareNumに0~8の配列を入れておく
          //indicesに入っている値をunpushする
          console.log(indices[i]);
          break;
        } else {
          randomNum = getRandomInt(9);
        }
      }

      if (!calculateWinner(squares)) {
        setTimeout(() => {
          nextSquares[randomNum] = '⭕️';
          setSquares(nextSquares);
        }, 100);
        // nextSquares[randomNum] = '⭕️';
      }
    } else {
      // nextSquares[num] = '⭕️';
      //TODO: ⭕️を自動で入力されるようにする
    }

    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
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
