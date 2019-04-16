import React, { Component } from "react";
import "./resultscreen.scss";
export class ResultScreen extends Component {
  renderTable() {
    let answers = this.props.getAnswers().map((answer, i) => {
      return { question: i + 1, answer: answer };
    });
    // answers.map(row => console.log(row.answer.answer))
    console.log(answers)
    let table = (
      <table>
        <tbody>
          <tr>
            <td>Question</td>
            <td>Type</td>
            <td>Your Answer</td>
            <td>Correct</td>
          </tr>
          {answers.map((row, i) => (
            <tr key={i}>
              <td>{row.question}</td>
              <td>{row.answer.type}</td>
              <td>{row.answer.answer}</td>
              <td>{row.answer.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return table;
  }
  buttonClicked(){
    this.props.update();
    this.props.history.push("/selectgame")
  }
  render() {
    return (
      <div id="result" className="center-me">
        Challenge complete!
        {this.renderTable()}
        <br />
        <div className="center-me fit-width">
        You won!
        <br />

        <button  onClick={() => this.buttonClicked()}>
          Play again!
        </button>
        </div>
      </div>
    );
  }
}

export default ResultScreen;
