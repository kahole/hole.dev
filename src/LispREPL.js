import React, { useState } from 'react';
import './LispREPL.css';
import {tokenize, parse, interpret} from './lisp.js'
import {match} from 'egna';

function LispREPL() {

  const sampleExpressions = [
    "(set 'myFruit 'apple)",
    "(if (not (eq? (+ (* 10 2) 20) 400)) myFruit 'orange)",
    "(set 'pow2 (lambda (x) (* x x)))",
    "(pow2 5)",
    "(let (k 3) (+ k 6))",
    "(cdr (assoc 'a (list (list 'a 5))))",
  ];

  const sampleHistory = [];

  sampleExpressions.forEach( h => {
    const command = h;
    const output = interpret(parse(tokenize(command)), {})[0];
    sampleHistory.push({command, output: typeof output === "function" ? {}.toString.call(output) : output.toString()});
  });
  
  const [historyNavIndex, setHistoryNavIndex] = useState(0);
  const [history, setHistory] = useState(sampleHistory);
  const [currentLine, setCurrentLine] = useState("");
  
  let historyList = history.map( ({command, output}, i) => {
    return <span key={i}>
      <p className="replHistoryItem">{"> " + command}</p>
      <p style={ {color: 'green' } } className="replHistoryItem">{output}</p>
    </span>
  });

  const onCurrentLineChange = e => {
    setCurrentLine(e.target.value);
  };

  const run = () => {
    if (currentLine.length === 0)
      return;
    
    let result;
    try {
      result = interpret(parse(tokenize(currentLine)), {})[0];
      result = typeof result === "function" ? {}.toString.call(result) : result.toString();
    } catch (e) {
      result = e.message;
    }
    setHistory([...history, {command: currentLine, output: result}]);
    setCurrentLine("");
    setHistoryNavIndex(0);
  };

  const onKeyUp = e => {
    const navDelta = match(
      'ArrowUp', () => 1,
      'ArrowDown', () => -1,
      _ => 0
    )(e.key);


    if (navDelta !== 0) {
      if (historyNavIndex+navDelta > history.length)
        return;
      
      if (historyNavIndex+navDelta <= 0) {
        setHistoryNavIndex(0);
        setCurrentLine("");
        return;
      }

      setHistoryNavIndex(historyNavIndex+navDelta);
      const commandIndex = history.length - (historyNavIndex+navDelta);
      setCurrentLine(history[commandIndex].command);
    }
  };

  const onCurrentLineKeyPress = e => {
    if (e.key === 'Enter')
      run();
  };

  return (
    <div className="LispREPL">
      <div className="repl">
        <div className="replInputWrapper">
          <span className="replPrompt">&gt;</span>
      <input className="replInput" value={currentLine} onChange={onCurrentLineChange} onKeyPress={onCurrentLineKeyPress} onKeyUp={onKeyUp} />
        </div>
        { historyList.reverse() }
      </div>
    </div>
  );
}

export default LispREPL;