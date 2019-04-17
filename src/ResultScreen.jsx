import React, { Component } from "react";
import "./resultscreen.scss";
export class ResultScreen extends Component {

  createRow(rowData,index){
    console.log(rowData)
    let check = (rowData.answer==rowData.correct)?'correct':'wrong';
    
    if(rowData.type==='SEARCH'){
      let a = rowData.correct.filter(a => a==='correct').length
       let nCorrect = rowData.correct.filter(a => a==='correct').length
       if (nCorrect===3){
         check = 'correct';
       }else if (nCorrect===0){
         check = 'wrong';
       }else{
         check = 'almost'
       }
    }
    return(
      <div key={index} className={`result-row ${check}`}>
        Question {index+1}: {rowData.question} <br/>
        You Guessed: {rowData.answer} <br/>
        Correct was: {rowData.correct} <br/>
    </div>)
  }

  renderTable() {
    let answers = this.props.getAnswers()
    console.log(answers[0])
    //{answer: "Thor: Ragnarok", type: "CARD", correct: "Logan", question: "which movie was released first"}
    let test = answers.map((row,index) => this.createRow(row,index));
    return test;
    let table = (
      <table>
        <tbody>
          <tr>
            <td>Question Index</td>
            <td>Type</td>
            <td>Question</td>
            <td>Your Answer</td>
            <td>Correct</td>
          </tr>
          {answers.map((row, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{row.type}</td>
              <td>{row.question}</td>
              <td>{row.answer}</td>
              <td>{row.correct}</td>
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
