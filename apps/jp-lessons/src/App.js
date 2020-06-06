import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Content from './Content';
import './App.css';

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="page">
        <div className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lesson1">Lesson 1 自己紹介</Link>
            </li>
            <li>
              <Link to="/lesson2">Lesson 2 </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:lesson">
              <Content />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
