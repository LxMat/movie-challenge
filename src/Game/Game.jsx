import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import QuestionManager from "./QuestionManager";
import gameInstance from "../data/GameModel";
import "./game.scss";

export class Game extends Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    this.state = {
      id: id,
      status: "LOADING",
      currentQuestion: 0,
      score: []
    };
    this.updateScore = this.updateScore.bind(this);
    this.questionList = gameInstance.generateQuestions(this.state.id);
  }

  componentDidMount() {
    this.questionList = gameInstance.generateQuestions(this.state.id);
    this.setState({
      status: "LOADED"
    });
  }

  updateScore(data) {
    let score = this.state.score;
    score.push({
      answer: data
    });
    this.setState({
      score: score
    });
    console.log(this.state.score);
  }
  render() {
    return (
      <div>
        <div className="questionContainer">
          <TransitionGroup>
            <CSSTransition
              key={this.state.currentQuestion}
              classNames="example"
              timeout={{ enter: 1000, exit: 1000 }}
            >
              <QuestionManager
                questionList={this.questionList}
                currentQuestion={this.state.currentQuestion}
                update={this.updateScore}
                history = {this.props.history}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default Game;
