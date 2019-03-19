import ObservableModel from './ObservableModel';
import MDB_API from './movieDBAPI';
class GameModel extends ObservableModel {
  constructor() {
    super();
    this.questions = [];

    
  }
  generateQuestions(mode = 1) {

    return this.dummyQuestions;
  }
  loadFromAPI() {
    let id = 263115
    return MDB_API.getMovie(id).then((movie) => ({
      id: movie.id,
      poster: movie.poster_path,
      title: movie.title,
      release_date: movie.release_date,
      budget: movie.budget,
      revenue: movie.revenue
    }))
  }

}
const gameInstance = new GameModel();
export default gameInstance;