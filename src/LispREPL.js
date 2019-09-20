import React, { useState, useEffect } from 'react';
import './LispREPL.css';
import {tokenize, parse, interpret} from './lisp.js'
import {match} from 'egna';

function LispREPL() {
  
  const [historyNavIndex, setHistoryNavIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {

    const sampleExpressions = [
      "(set 'pow2 (lambda (x) (* x x)))",
      "(pow2 5)",
      "(if (eq? (+ (* 10 2) 20) 400) 'apple 'orange)",
      "(let (k 3) (+ k 6))",
      "(cdr (assoc 'a (list (list 'a 5))))",
    ];

    async function sampleInter() {
      const interpreted = [];
      for (let i = 0; i < sampleExpressions.length; i++) {
        const command = sampleExpressions[i];
        const output = (await interpret(parse(tokenize(command)), {}))[0];
        interpreted.push({command, output: typeof output === "function" ? {}.toString.call(output) : output.toString()});
      }
      return interpreted;
    } 

    sampleInter().then( h => {
      setHistory(h);
    });
  }, []);
  
  
  let historyList = history.map( ({command, output}, i) => {
    return <span key={i}>
      <p className="replHistoryItem">{"> " + command}</p>
      <p style={ {color: 'green' } } className="replHistoryItem">{output}</p>
    </span>
  });

  const onCurrentLineChange = e => {
    setCurrentLine(e.target.value);
  };

  const run = async () => {
    if (currentLine.length === 0)
      return;
    
    let result;
    try {
      result = (await interpret(parse(tokenize(currentLine)), {}))[0];
      result = typeof result === "function" ? {}.toString.call(result) : result.toString();
    } catch (e) {
      result = e.message;
    }
    setHistory([...history, {command: currentLine, output: result}]);
    setCurrentLine("");
    setHistoryNavIndex(0);
  };

  const onCurrentLineKeyDown = e => {
    const navDelta = match(
      'ArrowUp', 1,
      'ArrowDown', -1,
      0
    )(e.key);

    if (navDelta !== 0)
      e.preventDefault();

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

    return false;
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
      <input className="replInput" value={currentLine} onChange={onCurrentLineChange} onKeyPress={onCurrentLineKeyPress} onKeyDown={onCurrentLineKeyDown} />
        </div>
        { historyList.reverse() }
      </div>
    </div>
  );
}

export default LispREPL;