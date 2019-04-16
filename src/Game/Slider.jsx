import React, { Component } from "react";
import StepSlider from "./StepSlider";

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
    this.changeValue = this.changeValue.bind(this);

    let correct = props.question.correct;
    this.stepsize = correct/10;
    this.left = 1;
    this.right = 2;
    let min = correct-this.stepsize*this.left;
    let max = correct+this.stepsize*this.right;

    this.state = {
      min: min,//props.min,
      max: max,
      currentVal: min
    };
  }

  changeValue(e,value) {
    //let val = e.target.value;
    this.setState({ currentVal: value });
  }

  submit() {
    this.props.update(this.state.currentVal);
  }
  render() {
    let bulletLeft = `${(this.state.currentVal / this.state.max) * 578}px`;
    let sliderBullet = (
      <span id="rs-bullet" className="rs-label" style={{ left: bulletLeft }}>
        {this.state.currentVal}
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
          <StepSlider ref={this.myRef}
            value={this.state.currentVal}
            max={this.state.max}
            min ={this.state.min}
            onchange={this.changeValue}
            steps = {(this.left+this.right)*1.0}
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
