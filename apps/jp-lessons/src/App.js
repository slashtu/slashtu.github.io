import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter,
} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Content from './Content';
import './App.css';

const URL = '/apps/jp-lessons/';

function App() {
  return (
    <HashRouter>
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
              '普通形を使った表現1',
              '普通形を使った表現2',
              '普通形を使った表現3',
              '普通形を使った表現4',
              '普通形を使った表現5',
              '可能形',
              '可能形2',
              '条件形',
              '授受表現1',
              '授受表現2',
              '意向形1',
              '意向形2',
              '命令形&禁止形1',
              '命令形&禁止形2',
              '受身形1',
              '受身形2',
              '使役形1',
              '使役形2',
              '理由・原因の表現',
              '目的の表現',
            ].map((text, i) => (
              <Link to={`lesson${i + 1}`}>
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
              <Redirect to={`lesson1`} />
            </Route>
            <Route path={`/:lessons`}>
              <Content />
            </Route>
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
