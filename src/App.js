import React from 'react';
import './App.css';
import LispREPL from './LispREPL.js';

function App() {
  return (
    <div className="App">
      <article>
        <h1><small>(developer</small>
          Kristian Hole)</h1>
        <h2>Under construction... ☔</h2>
        <nav>
          <ul>
            <li><a class="navLinks" href="#projects">Projects</a></li>
            <li><a class="navLinks" href="#articles">Articles</a></li>
            <li><a class="navLinks" href="#lisp">Lisp interpreter</a></li>
            <li><a class="navLinks" href="https://github.com/kahole">Github</a></li>
          </ul>
        </nav>
      </article>
      <article>
        <h1 class="articleHeader" id="projects">Projects</h1>
        <ul>
          <li>Egna - Javascript Pattern Matching (<a href="https://www.npmjs.com/package/egna">on NPM</a>)</li>
        </ul>
      </article>
      <article>
        <h1 class="articleHeader" id="lisp">Lisp interpreter</h1>
      <LispREPL />
      <br/>
        <p>See full list of built-in funtions <a href="https://github.com/kahole/lisp_in_js">here.</a></p>
      </article>
      <footer>
        <p>Updated 2019/09/08</p>
      </footer>
    </div>
  );
}

export default App;
