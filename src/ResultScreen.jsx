import React, { Component } from "react";
import "./resultscreen.scss";
export class ResultScreen extends Component {
  render() {
    return (
      <div id="result" className="center-me">
        this is the result screen:
        <br />
        You won!
        <br />
        <button onClick={() => this.props.history.push("/selectgame")}>
          Play again!
        </button>
      </div>
    );
  }
}

export default ResultScreen;
