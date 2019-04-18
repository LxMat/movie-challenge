//question generateor creates a list of questionObjects that will be passed to the components
//TODO:generateCardQuestion can only create  2-card questions. it should be more general
export default class QuestionGenerator {
  constructor(set) {
    this.index = 0;
    this.questions = [];
    this.set = set;
  }

  generateQuestions(movies,actors) {
    this.movies = movies;
    let ids = movies.map(movie => movie.id)
    // this.questions.push(this.generateSearchQuestion(actors[this.set]));
    this.questions.push(this.generateCardQuestion(ids))
    // this.questions.push(this.generateSliderQuestion(this.movies[1]))
    // this.questions.push(this.generateGuessMovieImageQuestion(this.movies[3]))
    return this.questions;
  }

  generateSearchQuestion( {id,name} ){
    const question = {
      id: id,
      type:"SEARCH",
      name:name,
      question:`Name three movies that ${name} has appeared in`,
      correct:id
    }
    return question
  }  
  generateCardQuestion(ids) {
    const dates = this.movies.map(movie => movie.release_date)
    for(let i = 0;i<dates.length;i++){
    }
    const question = {
      index: this.index,
      type: "CARD",
      cards: ids,
      title:this.movies.map(movie => movie.title),
      poster:this.movies.map(movie => movie.poster),
      question: "which movie was released first",
      correct: this.movies[this.getEarliestDateIndex(dates)].title //we can either use the cardIndex or the cardID:263115
    }
    this.index++;
    return question;
  }
  getEarliestDateIndex(dates){
    let smallest = 0;
    for(let i=0;i<dates.length;i++){
      if(Date.parse(dates[i])<Date.parse(dates[smallest])){ smallest = i;}
    }
    return smallest;

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

  generateGuessMovieImageQuestion(movie) {
    //const dates = this.movies.map(movie => movie.release_date)
    
    const title  = movie.title;
    const question = {
      index: this.index,
      type: "GuessMovieImage",
      movieID: movie.id,
      correct: title,
      path:movie.backdrop_path,
      question: `What's the name of the movie in the image?`
    }
    this.index++;
    return question;
  }
}

