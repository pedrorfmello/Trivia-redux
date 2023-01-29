import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './App.css';
import Configuracao from './pages/Configuracao';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogo" component={ Jogo } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/configuracao" component={ Configuracao } />
    </Switch>
  );
}
