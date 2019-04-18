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
    let cardStyle = "cardItem "
    if(window.innerWidth<700){
      cardStyle += "mob-card col "
    }
    // console.log(cardStyle)
    for (let i = 0; i < n; i++) {
      cardList.push(
        <Card
          key={i}
          toggle={this.state.cards[i].selected}
          onClick={() => this.toggleSelected(i)}
          title={this.state.title[i]}
          image={"https://image.tmdb.org/t/p/w300/" + this.state.poster[i]}
          cardStyle = {cardStyle}
        />
      );
    }
    return cardList;
  }

  
  //filters selected cards and updates.
  buttonClicked() {
    let answer = this.state.cards
      .filter(c => c.selected)
      .map(card => this.state.title[card.index]);
    this.props.update({
      type:"CARD",
      answer:answer.pop()
    });
  }
  
  render() {
      return (
      <div className="center-me fit-width">
        <span className="question-text">{this.props.question.question}</span>
        <div className="CardSelect  wrap">{this.renderCards()}</div>
        <span className="flex-center"><button className="card-submit-btn" onClick={() => this.buttonClicked()}>submit</button></span>
      </div>
    );
  }
}

export default CardQuestion;
