import React, { Component } from "react";
import Card from "./Card";
import "./cardSelection.scss";

//dummy variable for incoming data...
const movies = [
  {
    id: 263115,
    title: "Logan",
    poster: "/gGBu0hKw9BGddG8RkRAMX7B6NDB.jpg"
  },
  {
    id: 284053,
    title: "Thor: Ragnarok",
    poster: "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
  }
];


//card selection generates cards and keeps track on which cards have been clicked.
export class CardQuestion extends Component {
  constructor(props) {
    super(props);

    let nCards = props.question.cards.length;

    let cardState = this.generateCardState(nCards);
    this.state = {
      nCards: nCards,
      cards: cardState,
      id: 0,
      title: "",
      poster: ""
    };
  }
  generateCardState(n) {
    let cards = [];
    for (let i = 0; i < n; i++) {
      cards.push({ index: i, selected: false });
    }
    return cards;
  }
  toggleSelected(i) {
    let cards = this.state.cards;
    cards[i].selected = !cards[i].selected;
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
          title={movies[i].title}
          image={"https://image.tmdb.org/t/p/w300/" + movies[i].poster}
        />
      );
    }
    return cardList;
  }
  buttonClicked() {
    let answer = this.state.cards
      .filter(c => c.selected)
      .map(card => card.index);
    this.props.update(answer);
  }

  render() {
    return (
      <div>
        <p>{this.props.question.question}</p>
        <div className="CardSelect">{this.renderCards()}</div>
        <button onClick={() => this.buttonClicked()}>submit</button>
      </div>
    );
  }
}

export default CardQuestion;
