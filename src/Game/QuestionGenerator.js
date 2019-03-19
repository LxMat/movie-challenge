//question generateor creates a list of questionObjects that will be passed to the components
//TODO:generateCardQuestion can only create a 2-card question. it should be more general
export default class QuestionGenerator {
  constructor() {
    this.index = 0;
    this.questions = [];
  }

  generateQuestions(movies) {
    console.log(movies)
    this.movies = movies;
    let ids = movies.map(movie => movie.id)
    this.questions.push(this.generateCardQuestion(ids))
    this.questions.push(this.generateSliderQuestion(this.movies[1]))
    return this.questions;
  }

  
  generateCardQuestion(ids) {
    const dates = this.movies.map(movie => movie.release_date)
    const question = {
      index: this.index,
      type: "CARD",
      cards: ids,
      question: "which movie was released first",
      correct: this.getEarlierDate(dates) //we can either use the cardIndex or the cardID:263115
    }
    this.index++;
    return question;
  }
  //TODO: make max min a random range
  generateSliderQuestion(movie) {
    let revenue = movie.revenue;
    let min = Math.round(Math.random()*0.5*revenue) //min is between 0-0.5 of revenue
    let max = Math.round((Math.random()*(1.5-1.1)+1.1)*revenue)  //max is between 1.1-1.4 of revenue
    const question = {
      index: this.index,
      type: "SLIDER",
      movieID: movie.id,
      min: min,
      max: max,
      correct: revenue,
      question: `How much did ${movie.title} earn in revenue`
    }
    this.index++;
    return question;
  }


  //compares a list of two release_dates and returns the index of earlier date
  getEarlierDate(dates) {
    if (Date.parse(dates[0]) < Date.parse(dates[1])) {
      return 0
    } else {
      return 1
    }
  }
}

