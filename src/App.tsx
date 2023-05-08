import React, { useState } from 'react';
import './App.css';

type numValue = {
  value: string;
};

//<Square value="1" />で関数を呼び出すとprops.valueとして値が渡される
//そのため、{value}と記載し分割代入をおこなっている
const Square = ({ value }: numValue) => {
  const [status, setStatus] = useState<string>('');
  const [checkPlayer, setcheckPlayer] = useState<boolean>(false);

  const aaa = (num: string) => {
    if (checkPlayer) {
      setStatus('⭕️');
      setPlayerFlag(false);
    } else {
      setStatus('❌');
      setPlayerFlag(true);
    }
  };

  const setPlayerFlag = (flag: boolean) => {
    console.log(flag);
    setcheckPlayer(flag);
  };

  return (
    <button className="square" onClick={() => aaa(value)}>
      {status}
    </button>
  );
};

export const Board = () => {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
};
