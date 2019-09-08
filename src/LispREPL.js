import React, { useState } from 'react';
import './LispREPL.css';

function LispREPL() {

  const [history, setHistory] = useState([]);
  
  return (
    <div className="LispREPL">
      <code>
      {
        history.map( h => {
          return <p>h</p>;
        })
      }
    </code>
      <button onClick={() => setHistory([...history, 5])}>
        Click me
    </button>
    </div>
  );
}

export default LispREPL;