import React, { Component } from "react";

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min,
      max: props.max,
      currentVal: props.max / 4
    };
  }

  changeValue(e) {
    let val = e.target.value;
    this.setState({ currentVal: val });
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
        following is from props: <br />
        {this.props.question.question}
        <div className="range-slider">
          {sliderBullet}
          {sliderLine}
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
