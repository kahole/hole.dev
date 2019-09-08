import React, { useState } from 'react';
import './LispREPL.css';
import {tokenize, parse, interpret} from './lisp.js'

function LispREPL() {

  const [history, setHistory] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  

  let historyList = history.map( h => {
    return <p className="replHistoryItem">{h}</p>;
  });


  const onCurrentLineChange = e => {
    setCurrentLine(e.target.value);
  };

  const run = () => {
    let result;
    try {
      result = JSON.stringify(interpret(parse(tokenize(currentLine)), {})[0]);
    } catch (e) {
      result = e.message;
    }
    setHistory([...history, "> " + currentLine, result]);
    setCurrentLine("");
  };

  const onCurrentLineKeyPress = e => {
    if (e.key === 'Enter')
      run();
  };

  return (
    <div className="LispREPL">
      <div className="repl">
        <input className="replInput" value={currentLine} onChange={onCurrentLineChange} onKeyPress={onCurrentLineKeyPress} />
      { historyList.reverse() }
      </div>
    </div>
  );
}

export default LispREPL;