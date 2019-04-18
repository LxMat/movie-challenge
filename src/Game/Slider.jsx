import React, { Component } from "react";
import KeyHandler, { KEYPRESS, KEYDOWN } from 'react-key-handler';
import StepSlider from "./StepSlider";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*1.0 * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

const genRand = () => Math.random()* Math.pow(10,getRandomIntInclusive(6,11));

export default class Slider extends Component {
  constructor(props) {
    super(props);

    //For keeping track of slider index and updating value
    this.myRef = React.createRef();
    this.changeValue = this.changeValue.bind(this);

    //Build random numbers on magnitude of answer
    let correct = props.question.correct.toPrecision(2);
    this.values = [];
    for (let index = 0; index < 3; index++) {
      //this.values.push((Math.random()*correct*2).toPrecision(2)/1);  
      this.values.push(genRand().toPrecision(2)/1);  
    }

    //Add answer and sort
    this.values.push(correct/1);
    this.values = this.values.sort((a,b)=>a-b);

    //Keep track of slider index
    this.state = {
      min: 0,
      max: this.values.length-1,
      currentVal: Math.floor((this.values.length-1)/2)
    };
  }

  changeValue(e,value) {
    this.setState({ currentVal: value });
  }

  submit() {
    this.props.update({type:"SLIDER",answer:this.values[this.state.currentVal]});
  }
  render() {
    return (
      <div className="slider">
        <span className="question-text"><p>{this.props.question.question}</p></span>
        <span className="question-text"><p>{this.values[this.state.currentVal]}</p></span>
        <div className="range-slider">

          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue="ArrowLeft"
            onKeyHandle={()=>this.setState({ currentVal: this.state.currentVal-1 <0 ? this.state.max :  this.state.currentVal-1 })}
          />
          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue="ArrowRight"
            onKeyHandle={()=>this.setState({ currentVal: (this.state.currentVal+1)%(this.state.max+1) })}
          />
          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue="Enter"
            onKeyHandle={() => this.submit()}
          />
          <StepSlider ref={this.myRef}
            value={this.state.currentVal}
            max={this.state.max}
            min ={this.state.min}
            onchange={this.changeValue}
            steps = {this.state.max}
              />
        </div>
        <button onClick={() => this.submit()}>Submit</button>
      </div>
    );
  }
}
