import React, { Component } from "react";
import Slider from "./Slider";
import CardSelection from "./CardSelection";
import ActorQuestion from "./ActorQuestion"
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

  nextQuestion() {
    let nextIndex = this.state.currentQuestion + 1;

    //check if there are more questions avilable
    if (nextIndex >= this.questionList.length) {
      this.props.history.push("/results");
    }
    this.setState({
      currentQuestion: nextIndex
    });
  }
  previousQuestion() {
    let prevIndex = this.state.currentQuestion - 1;

    //check if there are more questions avilable
    if (prevIndex < 0) {
      this.props.history.push("/selectgame");
    }
    this.setState({
      currentQuestion: prevIndex
    });
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
            <ActorQuestion question={q}/>
          )
          
      default:
        return <p>failed to load the question</p>;
    }
  }

  render() {
    let question = this.getQuestion(this.state.currentQuestion);
    return (
      <div>
        {question}
        <div className="navigation">
          <button onClick={() => this.previousQuestion()}>back</button>
          <button onClick={() => this.nextQuestion()}>next</button>
        </div>
      </div>
    );
  }
}

export default QuestionManager;
