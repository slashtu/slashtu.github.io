import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Content from './Content';
import './App.css';

const URL = '/apps/jp-lessons/';

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
          <List>
            {[
              '自己紹介',
              '場所を尋ねる',
              'コンビニ・レストラン',
              '交通',
              '予定や行動',
              '形容詞①',
              '形容詞②',
              '形容詞③',
              '動詞のグループ',
              'て形を使った表現',
              'て形を使った表現②',
              'て形を使った表現③',
              'て形を使った表現④',
              'た形を使った表現',
              'た形を使った表現②',
              'ない形を使った表現',
              'ない形を使った表現②',
            ].map((text, i) => (
              <Link to={`${URL}lesson${i + 1}`}>
                <ListItem button key={i}>
                  <ListItemText primary={`Lesson ${i + 1} ${text}`} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
        <div className="content">
          <Switch>
            <Route exact path={URL}>
              <Home />
            </Route>
            <Route path={`${URL}:lessons`}>
              <Content />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
