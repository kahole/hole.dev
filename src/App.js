import React from 'react';
import './App.css';
import LispREPL from './LispREPL.js';

function App() {
  return (
    <div className="App">
      <article>
        <h1><small>(developer </small>
          Kristian Hole)</h1>
        <h2>Consultant at Netlight ☔</h2>
        <nav>
          <ul>
            <li><a className="navLinks" href="#projects">Projects</a></li>
            {/*<li><a className="navLinks" href="#articles">Articles</a></li>*/}
            <li><a className="navLinks" href="#lisp">Lisp interpreter</a></li>
            {/*<li><a className="navLinks" href="ppp_webgl">Tiny Planet</a></li>*/}
            {/*<li><a className="navLinks" href="https://github.com/kahole">Github</a></li>*/}
            <li><a className="navLinks" href="#contact">Contact</a></li>
          </ul>
        </nav>
      </article>
      <article>
        <h1 className="articleHeader" id="projects">Projects</h1>
        <ul>
          <li>Egna - Javascript Pattern Matching (<a href="https://www.npmjs.com/package/egna">NPM</a>)</li>
          <li>Lisp and Reflective Tower in JS (<a href="https://github.com/kahole/lisp_in_js">Github</a>)</li>
          <li><a href="ppp_webgl">Tiny Planet</a></li>
        </ul>
      </article>
      {/*<article>
        <h1 className="articleHeader" id="articles">Articles</h1>
          Thesis<br/>
          <a href="https://ntnuopen.ntnu.no/ntnu-xmlui/?locale-attribute=en">An evaluation of join-strategies in a distributed MySQL plugin architecture</a>
      </article>*/}
      <article>
        <h1 className="articleHeader" id="lisp">Lisp interpreter</h1>
        <LispREPL />
        <br/>
        <p>See full list of built-in funtions <a href="https://github.com/kahole/lisp_in_js#builtins">here.</a></p>
      </article>
      <article>
        <h1 className="articleHeader" id="contact">Contact</h1>
        <ul>
          <li><a href="https://www.linkedin.com/in/kristian-andersen-hole-513421bb">LinkedIn</a></li>
          <li><a href="https://github.com/kahole">Github</a></li>
        </ul>
      </article>
      {/*<article>
        <h1 className="articleHeader" id="webgl">Tiny Planet</h1>
        <div className="webglFrameWrapper">
        <iframe className="webglFrame" src="ppp_webgl/index.html"/>
        </div>
      </article>*/}
      <footer>
        <p>Updated 2019/09/20</p>
      </footer>
    </div>
  );
}

export default App;
