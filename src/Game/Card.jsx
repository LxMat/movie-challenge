import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.poster = props.image;
    this.state = {
      wasClicked: props.toggle
    };
  }
  toggleCard() {
    this.setState({
      wasClicked: !this.state.wasClicked
    });
    this.props.onClick();
  }
  render() {
    return (
      <div
        className={`cardItem ${
          this.state.wasClicked ? "selected" : "unselected"
        }`}
        onClick={() => this.toggleCard()}
        style={{ backgroundImage: `url(${this.poster})` }}
      >
        this is a card click me!
      </div>
    );
  }
}
