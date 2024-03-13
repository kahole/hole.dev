import React from 'react';
import './App.css';
import LispREPL from './LispREPL.js';

function App() {
  return (
    <div className="App">
      <h1>Kristian Andersen Hole <span className="emoji" role="img" aria-label="umbrella">☔</span></h1>
      <article>
        <h2>Co-founder of <a href="https://www.catchwise.no/">Catchwise</a></h2>
      </article>
      <br />
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
          <li>edamagit - Magit for VSCode (<a href="https://marketplace.visualstudio.com/items?itemName=kahole.magit">VS Marketplace</a>|<a href="https://github.com/kahole/edamagit">Github</a>)</li>
          <li>gnistfanger - 3d art (<a href="/articles/gnistfanger">Gallery</a>)</li>
          <li>Lisp and Reflective Tower in JS (<a href="https://github.com/kahole/lisp_in_js">Github</a>)</li>
          <li>Egna - Javascript Pattern Matching (<a href="https://www.npmjs.com/package/egna">NPM</a>|<a href="https://github.com/kahole/egna">Github</a>)</li>
          <li>*scratch*.js - Interactive JS scratchpad (<a href="scratch">*scratch*</a>|<a href="https://gist.github.com/kahole/651990b888c19b84d5700422daa961de">Gist</a>)</li>
          {/* <li><a href="ppp_webgl">WebGL demo</a></li> */}
        </ul>
      </article>
      <br />
      <article>
        <h2 id="articles">Articles</h2>
        <ul>
          <li><a href="articles/edamagit-introduction/">Edamagit introduction</a></li>
          <li><a href="https://www.nora.ai/news-and-events/news/meet-the-winners-of-fishai.html" rel="noopener">Winners of NORA's FishAI: Sustainable Commercial Fishing competition</a></li>
          <br />
          <li>Thesis</li>
          <small><a href="http://hdl.handle.net/11250/2625818">An evaluation of join-strategies in a distributed MySQL plugin architecture</a></small>
        </ul>
      </article>
      <br />
      <article>
        <h2 id="lisp">Lisp interpreter</h2>
        <br />
        <LispREPL />
        <br />
        <p>List of built-in funtions <a href="https://github.com/kahole/lisp_in_js/blob/master/builtins.md">here</a></p>
      </article>
      <br />
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
      <footer>
        {/* <p>Updated 2020/03/16</p> */}
        <br />
      </footer>
    </div>
  );
}

export default App;
