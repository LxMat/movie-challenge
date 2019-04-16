import React, { Component } from "react";
import KeyHandler, { KEYPRESS, KEYDOWN } from 'react-key-handler';
import StepSlider from "./StepSlider";

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
      this.values.push((Math.random()*correct*2).toPrecision(2));  
    }

    //Add answer and sort
    this.values.push(correct);
    this.values = this.values.sort((a,b)=>a-b);

    //Keep track of slider index
    this.state = {
      min: 0,
      max: this.values.length-1,
      currentVal: Math.floor((this.values.length-1)/2)
    };
  }

  changeValue(e,value) {
    //let val = e.target.value;
    console.log(e);
    this.setState({ currentVal: value });
  }

  submit() {

    this.props.update({type:"SLIDER",answer:this.values[this.state.currentVal]});
  }
  render() {
    let bulletLeft = `${(this.state.currentVal / this.state.max) * 578}px`;
    let sliderBullet = (
      <span id="rs-bullet" className="rs-label" style={{ left: bulletLeft }}>
        {this.values[this.state.currentVal]}
      </span>
    );
    let sliderLine = (
      <input
        id="rs-line"
        className="rs-range"
        type="range"
        onInput={e => this.changeValue(e)}
        min={this.state.min}
        max={this.state.max}
      />
    );

    return (
      <div className="slider">
        {this.props.question.question}
        <div className="range-slider">
          {sliderBullet}
          {/*{sliderLine}*/}
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
          <div className="MinMax">
            <span>{this.state.min}</span>
            <span>{this.state.max}</span>
          </div>
        </div>
        <button onClick={() => this.submit()}>Submit</button>
      </div>
    );
  }
}
