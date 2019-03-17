import React, { Component } from "react";
import { Route } from "react-router-dom";
import StartScreen from "./StartScreen";
import SelectGame from "./SelectGame";
import Game from "./Game/Game";
import ResultScreen from "./ResultScreen";
import "./App.scss";
import MDB_API from "./data/movieDBAPI";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "start"
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={StartScreen} />
          <Route path="/selectgame" component={SelectGame} />
          <Route path="/play:id" component={Game} />
          <Route path="/results" component={ResultScreen} />
        </header>
      </div>
    );
  }
}

export default App;
