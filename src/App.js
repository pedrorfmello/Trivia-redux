import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Feedback from './pages/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogo" component={ Jogo } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
  );
}
