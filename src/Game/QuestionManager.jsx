import React, { Component } from "react";
import Slider from "./Slider";
import CardSelection from "./CardSelection";

import ActorQuestion from "./ActorQuestion"
import {MovieImage} from "../MovieImage";
import GuessMovieImage from "./GuessMovieImage";
//QuestionManager renders different questionComponents depending on question type
//at the moment there are slider and card-type questionsComponents

export class QuestionManager extends Component {
  constructor(props) {
    super(props);
    this.questionList = props.questionList;

    this.state = {
      currentQuestion: props.currentQuestion
    };
  }

  componentWillMount() {
    this.questionList = this.props.questionList;
  }
  getQuestion(i) {
    const q = this.questionList[i];
    switch (q.type) {
      case "CARD":
        return <CardSelection question={q} update={this.props.update} />;
      case "SLIDER":
        return (
          <Slider
            min={q.min}
            max={q.max}
            question={q}
            update={this.props.update}
          />
        );
      case "SEARCH":
        return(
          <ActorQuestion question={q} update={this.props.update}/>
        );
          
      case "GuessMovieImage":      
            return (
              <GuessMovieImage question={q} update={this.props.update}/>
            );

      default:
        return <p>failed to load the question</p>;
    }
  }

  render() {
    let question = this.getQuestion(this.state.currentQuestion);
    return (
      <div>
        {question}
      </div>
    );
  }
}

export default QuestionManager;
