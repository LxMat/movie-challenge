import React, { Component } from "react";
import Card from "./Card";
import "./cardSelection.scss";



//card selection generates cards and keeps track on which cards have been clicked.
export class CardQuestion extends Component {
  constructor(props) {
    super(props);
    console.log(props.question);
    let nCards = props.question.cards.length;
    let cardState = this.generateCardState(nCards);
    this.state = {
      nCards: nCards,
      cards: cardState,
      id: 0,
      title: props.question.title,
      poster: props.question.poster
    };
  }
  //the card state is used to keep track on which cards are selected
  generateCardState(n) {
    let cards = [];
    for (let i = 0; i < n; i++) {
      cards.push({ index: i, selected: false });
    }
    return cards;
  }

  toggleSelected(i) {
    let cards = this.state.cards;
    cards.map(card => card.selected=false)
    cards[i].selected = true;
    this.setState({
      cards: cards
    });
  }

  renderCards() {
    let n = this.state.nCards;
    let cardList = [];
    for (let i = 0; i < n; i++) {
      cardList.push(
        <Card
          key={i}
          toggle={this.state.cards[i].selected}
          onClick={() => this.toggleSelected(i)}
          title={this.state.title[i]}
          image={"https://image.tmdb.org/t/p/w300/" + this.state.poster[i]}
        />
      );
    }
    return cardList;
  }
  //filters selected cards and updates.
  buttonClicked() {
    console.log(this.state.title)
    let answer = this.state.cards
      .filter(c => c.selected)
      .map(card => this.state.title[card.index]);
    this.props.update(answer);
  }

  render() {
    return (
      <div className="center-me fit-width">
        <p>{this.props.question.question}</p>
        <div className="CardSelect">{this.renderCards()}</div>
        <button onClick={() => this.buttonClicked()}>submit</button>
      </div>
    );
  }
}

export default CardQuestion;
