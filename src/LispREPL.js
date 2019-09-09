import React, { useState } from 'react';
import './LispREPL.css';
import {tokenize, parse, interpret} from './lisp.js'

function LispREPL() {

  const sampleExpressions = [
    // "> (+ 2 3)",
    "(set 'myFruit 'apple)",
    "(if (not (eq? (+ (* 10 2) 20) 400)) myFruit 'orange)",
    "(set 'pow2 (lambda (x) (* x x)))",
    "(pow2 5)",
    "(let (k 3) (+ k 6))",
    // "> (set 'x (list (list 'a 5)))",
    "(cdr (assoc 'a (list (list 'a 5))))",
  ];

  const sampleHistory = [];

  sampleExpressions.forEach( h => {
    sampleHistory.push("> " + h);
    const result = interpret(parse(tokenize(h)), {})[0];
    sampleHistory.push( typeof result === "function" ? {}.toString.call(result) : result.toString());
  });
  
  const [history, setHistory] = useState(sampleHistory);
  const [currentLine, setCurrentLine] = useState("");
  
  let historyList = history.map( (h,i) => {
    return <p key={i} style={ i % 2 === 1 ? {color: 'green' } : {}} className="replHistoryItem">{h}</p>;
  });

  const onCurrentLineChange = e => {
    setCurrentLine(e.target.value);
  };

  const run = () => {
    let result;
    try {
      result = interpret(parse(tokenize(currentLine)), {})[0];
      result = typeof result === "function" ? {}.toString.call(result) : result.toString();
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
        <input className="replInput" placeholder="> " value={currentLine} onChange={onCurrentLineChange} onKeyPress={onCurrentLineKeyPress} />
        { historyList.reverse() }
      </div>
    </div>
  );
}

export default LispREPL;