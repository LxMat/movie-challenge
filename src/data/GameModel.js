import ObservableModel from './ObservableModel';
import MDB_API from './movieDBAPI';
class GameModel extends ObservableModel {
  constructor() {
    super();
    this.questions = {};
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
  loadFromAPI() {
    let id = 263115
    return MDB_API.getMovie(id).then((movie) => ({
      id:movie.id,
      poster:movie.poster_path,
      title: movie.title,
      release_date:movie.release_date,
      budget:movie.budget,
      revenue:movie.revenue
    }))
  }
  handleAPIresponse(data) {

  }
}
const gameInstance = new GameModel();
export default gameInstance;