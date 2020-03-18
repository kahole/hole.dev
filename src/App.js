import React from 'react';
import './App.css';
import LispREPL from './LispREPL.js';

function App() {
  return (
    <div className="App">
      <h1>Kristian Andersen Hole <span className="emoji" role="img" aria-label="umbrella">☔</span></h1>
      <article>
        <h2>Consultant @ <a href="https://www.netlight.com/">Netlight</a></h2>
      </article>
      {/* <nav>
        <ul>
          <li><a className="navLinks" href="#projects">Projects</a></li>
          <li><a className="navLinks" href="#articles">Articles</a></li>
          <li><a className="navLinks" href="#contact">Contact</a></li>
        </ul>
      </nav> */}
      <article>
        <h2 id="projects">Projects</h2>
        <ul>
          <li>Magit for VSCode (<a href="https://marketplace.visualstudio.com/items?itemName=kahole.magit">VS Marketplace</a>)</li>
          <li>Egna - Javascript Pattern Matching (<a href="https://www.npmjs.com/package/egna">NPM</a>)</li>
          <li>Lisp and Reflective Tower in JS (<a href="https://github.com/kahole/lisp_in_js">Github</a>)</li>
          <li><a href="ppp_webgl">WebGL demo</a></li>
        </ul>
      </article>
      <article>
        <h2 id="articles">Articles</h2>
        <ul>
          <li>Thesis</li>
          <small><a href="http://hdl.handle.net/11250/2625818">An evaluation of join-strategies in a distributed MySQL plugin architecture</a></small>
        </ul>
      </article>
      <article>
        <h2 id="lisp">Lisp interpreter</h2>
        <br/>
        <LispREPL />
        <br/>
        <p>See full list of built-in funtions <a href="https://github.com/kahole/lisp_in_js/blob/master/builtins.md">here.</a></p>
      </article>
      <article>
        <h2 id="contact">Contact</h2>
        <ul>
          <li><a href="https://www.linkedin.com/in/kristian-andersen-hole-513421bb">LinkedIn</a></li>
          <li><a href="https://github.com/kahole">Github</a></li>
        </ul>
      </article>
      {/*<article>
        <h2 id="webgl">Tiny Planet</h2>
        <div className="webglFrameWrapper">
        <iframe className="webglFrame" src="ppp_webgl/index.html"/>
        </div>
      </article>*/}
      {/* <footer>
        <p>Updated 2020/03/16</p>
      </footer> */}
    </div>
  );
}

export default App;