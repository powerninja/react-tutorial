import React, { useState } from 'react';
import './App.css';

type numValue = {
  value: string;
};

//<Square value="1" />で関数を呼び出すとprops.valueとして値が渡される
//そのため、{value}と記載し分割代入をおこなっている
const Square = () => {
  const [state, setState] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [checkPlayer, setcheckPlayer] = useState<boolean>(false);

  const handleClick = () => {
    setValue('❌');
    if (checkPlayer) {
      setState('⭕️');
      setPlayerFlag(false);
    } else {
      setState('❌');
      setPlayerFlag(true);
    }
  };

  const setPlayerFlag = (flag: boolean) => {
    console.log(flag);
    setcheckPlayer(flag);
  };

  return (
    <button className="square" onClick={() => handleClick()}>
      {value}
    </button>
  );
};

export const Board = () => {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
};
