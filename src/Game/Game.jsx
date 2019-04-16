import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group"; // will be used for component transitions
import QuestionManager from "./QuestionManager";
import MDB_API from "../data/movieDBAPI";
import QuestionGenerator from "./QuestionGenerator";
import gameInstance from "../data/GameModel";
import "./game.scss";
import storedIDs from "../data/movieIDs.json"
import TextSearch from "./TextSearch";
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
    this.updateAnswers = this.updateAnswers.bind(this);
    this.questionList = [];
  }

  //loadFromAPI fetches the data and returns the important results as a list of Promises
  //TODO: ids should not be inside the method but retrieved from somewhere else
  loadFromAPI() {
    return Promise.all(
      storedIDs.ids.map(id => {
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
  loadActorfromAPI(){
   return Promise.all(
     storedIDs.actorIds.map(id =>{
       return MDB_API.getActor(id).then(actor =>{
         return({         
          id:actor.id,
          name:actor.name
          })
       });
     })
   ) 
  }

  componentDidMount() {
    this.loadFromAPI()
    .then(movies => {
      this.setState({
        movies: movies,
      });
    })
    .then(this.loadActorfromAPI)
    .then(actors => {
      this.setState(
      {
        actors:actors,
        status:"LOADED"
      })})
    .catch(e => console.error("failed loding from API :",e));
  }

  updateAnswers(data) {
    const { questionList,
          state: {
            currentQuestion,
            }
          } = this

    this.props.update({
      user: data,
      correct: questionList[currentQuestion].correct
    });
    this.setState({
      currentQuestion: currentQuestion + 1
    });
    if (currentQuestion === questionList.length - 1) {
      this.props.history.push("/results");
    }
  }

  render() {
    let movie = null;

    if (this.state.status === "LOADED") {
      let qGen = new QuestionGenerator();
      this.questionList = qGen.generateQuestions(this.state.movies,this.state.actors);

      movie = (
        <QuestionManager
          key={this.state.currentQuestion}
          questionList={this.questionList}
          currentQuestion={this.state.currentQuestion}
          update={this.updateAnswers}
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
      <div className="questionContainer center-me fit-width">
        <TransitionGroup>
          <CSSTransition
            key={this.state.currentQuestion}
            classNames="fade"
            timeout={{ enter: 500, exit: 300 }}
          >
            {movie}
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default Game;
