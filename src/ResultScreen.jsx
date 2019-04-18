import React, { Component } from "react";
import "./resultscreen.scss";
import UserList, {NameBox} from "./UserList";
export class ResultScreen extends Component {
  constructor(props){
    super(props);
    this.points = 0;
  }
  checkAnswer(answer,correct,type){
    let check
    check = (answer==correct)?'correct':'wrong';



    if(type==='SEARCH'){
      // let a = rowData.correct.filter(a => a==='correct').length
       let nCorrect = correct.filter(a => a==='correct').length
       if (nCorrect===3){
         check = 'correct';
       }else if (nCorrect===0){
         check = 'wrong';
       }else{
         check = 'almost'
       }
    }else if(type==='GuessMovieImage'){
      check = (answer.toLowerCase()===correct.toLowerCase())?'correct':'wrong';
    }
return check;
  }

    
  createRow(rowData,index){
    console.log(rowData)
    const {type, correct, answer, question} = rowData
    let check = this.checkAnswer(answer,correct,type)

    const a = check==='correct' ? this.points++:null;
   
    return(
      <div key={index} className={`result-row ${check}`}>
        Question {index+1}: {question} <br/>
        You Guessed: {answer} <br/>
        Correct was: {correct} <br/>
    </div>)
  }



  renderResults() {
    let answers = this.props.getAnswers()
    return(answers.map((row,index) => this.createRow(row,index)));
  }
  buttonClicked(){
    this.props.update();
    this.props.history.push("/selectgame")
  }
  componentWillUnmount(){
    this.props.update();
  }
  render() {
    return (<>
      <div id="result" className="center-me">
        Challenge complete!
        {this.renderResults()}
        <br />
        <div className="center-me fit-width">
        You won!
        <br />

        <button  onClick={() => this.buttonClicked()}>
          Play again!
        </button>
        </div>
        <div>points:{this.points}</div>
        
        <NameBox set={window.location.pathname.split('/')[2]} score={this.points}/>
      </div>
      <UserList set={window.location.pathname.split('/')[2]}/>
      </>
    );
  }
}

export default ResultScreen;
