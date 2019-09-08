import React, { useState } from 'react';
import './LispREPL.css';
import {tokenize, parse, interpret} from './lisp.js'

function LispREPL() {

  const sampleHistory = [
    // "> (+ 2 3)",
    // "5",
    "> (set 'myFruit 'apple)",
    "apple",
    "> (if (not (eq? (+ (* 10 2) 20) 400)) myFruit 'orange)",
    "apple",
    "> (set 'pow2 (lambda (x) (* x x)))",
    "[Function]",
    "> (pow2 5)",
    "25",
    "> (let (k 3) (+ k 6))",
    "9",
    // "> (set 'x (list (list 'a 5)))",
    // "[ [ 'a', 5 ] ]",
    "> (cdr (assoc 'a (list (list 'a 5))))",
    "5"
  ];

  // TODO: make it run them and then store the result in history, properly execute them
  sampleHistory.forEach( (h, i) => {
    if (i % 2 == 0)  {
      interpret(parse(tokenize(h.substring(2))), {});
    }
  });
  
  const [history, setHistory] = useState(sampleHistory);
  const [currentLine, setCurrentLine] = useState("");
  

  let historyList = history.map( (h,i) => {
    return <p style={ i % 2 == 1 ? {color: 'green' } : {}} className="replHistoryItem">{h}</p>;
  });


  const onCurrentLineChange = e => {
    setCurrentLine(e.target.value);
  };

  const run = () => {
    let result;
    try {
      result = interpret(parse(tokenize(currentLine)), {})[0].toString();
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