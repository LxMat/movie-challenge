import ObservableModel from './ObservableModel';

class GameModel extends ObservableModel {
  constructor() {
    super();
    this.dummyQuestions = [{
        index: 0,
        type: "CARD",
        cards: [263115, 284053],
        question: "which movie were released first",
        correct: [0] //we can either use the cardIndex or the cardID 263115
      },
      {
        index: 1,
        type: "SLIDER",
        min: 0,
        max: 210,
        correct: 74,
        question: "give me a number bigger than 74 :-)"
      }
    ]
  }
  generateQuestions(mode = 1) {
    return this.dummyQuestions;
  }
}
const gameInstance = new GameModel();
export default gameInstance;