import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import GameView from './Game';
import WorldsView from './World';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:worldId">
            <GameView />
          </Route>
          <Route path="/">
            <WorldsView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
