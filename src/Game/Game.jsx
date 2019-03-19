import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group"; // will be used for component transitions
import QuestionManager from "./QuestionManager";
import MDB_API from "../data/movieDBAPI";
import QuestionGenerator from "./QuestionGenerator";
import gameInstance from "../data/GameModel";
import "./game.scss";

export class Game extends Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;

  
    this.movies = [];
    this.state = {
      id: id,
      status: "LOADING",
      currentQuestion: 0,
      score: [],
      movies: this.movies
    };
    this.updateScore = this.updateScore.bind(this);
    this.questionList = [];
  }

  //loadFromAPI fetches the data and returns the important results as a list of Promises
  //TODO: ids should not be inside the method
  loadFromAPI() {
    let ids = [263115, 284053];
    return Promise.all(
      ids.map(id => {
        return MDB_API.getMovie(id).then(movie => ({
          id: movie.id,
          poster: movie.poster_path,
          title: movie.title,
          release_date: movie.release_date,
          budget: movie.budget,
          revenue: movie.revenue
        }));
      })
    );
  }

  componentDidMount() {
    this.loadFromAPI().then(movie => {
      this.setState({
        movies: movie,
        status: "LOADED"
      });
    });
    this.questionList = gameInstance.generateQuestions(this.state.id);
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
    let movie = null;

    if (this.state.status === "LOADED") {
      console.log(this.state.movies);
      let qGen = new QuestionGenerator();
      this.questionList = qGen.generateQuestions(this.state.movies);
      movie = (
        <QuestionManager
          questionList={this.questionList}
          currentQuestion={this.state.currentQuestion}
          update={this.updateScore}
          history={this.props.history}
        />
      );
    } else {
      movie = (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
    return (
        <div className="questionContainer">
            {movie}    
        </div>
    );
  }
}

export default Game;
