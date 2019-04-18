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
      answers: []
    };
    this.updateAnswer =this.updateAnswer.bind(this);
    this.getAnswers =this.getAnswers.bind(this);
    this.newGame = this.newGame.bind(this);
  }
  updateAnswer({answer,type,correct,question}) {
    let newAnswers = this.state.answers;
    newAnswers.push({answer,type,correct,question});
    this.setState({
      answers: newAnswers
    });
  }
  getAnswers(){
    console.log('getAnswer()',this.state.answers)
    return this.state.answers;
  }
  newGame(){
    this.setState({
      answers: []
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={StartScreen} />
          <Route path="/selectgame" component={SelectGame} />
          <Route
            path="/play/:id"
            render={props => <Game {...props} update={this.updateAnswer} />}
          />
          <Route
            path="/results/:id"
            render={props => (
              <ResultScreen {...props} getAnswers={this.getAnswers} update={this.newGame} />
            )}
          />
        </header>
      </div>
    );
  }
}

export default App;
