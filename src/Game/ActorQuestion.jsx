import React, { Component } from 'react'
import TextSearch from './TextSearch'
import MBD_API from '../data/movieDBAPI'
export class ActorQuestion extends Component {
  constructor(props){
    super(props);
    const {question,name,id} = props.question
    // console.log(props.question);
    this.state = {
      actorID: id,
      actor:name,
      question:question,
      selectedMovies:[],
      movieIDs:[]
      };
  }

  addSelectedMovie = movie => {
    let updatedSelection = this.state.selectedMovies;
    updatedSelection.push(movie)
    this.setState({
      selectedMovies:updatedSelection
    })
  }
  SelectedMovies = () =>{
    const {selectedMovies} = this.state
    if(!selectedMovies[0]){
      return(<div>Select your movies</div>)
    }
    let button;
    if (selectedMovies.length===3){
      button = <button onClick={ () => this.buttonClicked() }>Submit</button>
    }
    // this.props.update( {type:"SEARCH", answer:selectedMovies}
    return (
    <div>
      movies:
      <ul>{selectedMovies.map(( { title }, index ) => {
        return (
          <li key ={index}>{title}</li>
        )
      })}
      </ul>
      {button}
    </div>)
  }

  buttonClicked = ()=>{
    const {actorID,selectedMovies} = this.state;
    Promise.all(selectedMovies.map(movie =>
       MBD_API.getCredits(movie.id)
        .then(credits => {
          return credits.cast.filter( cast => cast.id===actorID )
        })))
      .then(result => //result hase length 1 if correct, 0 if wrong
        result.map( res => 
          (res.length>0)?'correct':'wrong'))
      .then(correctAnswer => 
        this.props.update({
                type:"SEARCH",
                answer:selectedMovies.map(movie=>movie.title),
                correct:correctAnswer}))
    
  }

  checkActorSearchQuestion(ids,actorID){
    
    // return Promise.all(
    //   ids.map(id => 
    //     MDB_API.getCredits(id)
    //       .then(data => 
    //         data.cast.filter(actor => 
    //           (actor.id === actorID)
    //           )
    //         )
    //       ));
  }

  getCredits = ({id,title}) =>{
    // MBD_API.getCredits(id)
    // .then(data => data.cast.filter(actor => actor.id === this.state.actorID))
    // .then(check => {
    //   if(check.length<1){
    //     // console.log('wrong ',title)
    //   }else{
    //     // console.log('right ',title)
    //   }
    // });
   this.addSelectedMovie({title:title,id:id});
  }
  itemSubmitted = ({id,title}) => this.addSelectedMovie({title:title,id:id})
  checkAnswer(data){
    const actors = data.cast.map(actor =>{ return({
      id:actor.id,
      name:actor.name
    })})
  }
  render() {
    let actor = "Tom Hanks"
    const {
      SelectedMovies,
      state:{
        question
      }} = this
    return (
      <div>
        <em>{question}</em>
        <TextSearch searchFunction={MBD_API.searchMovie} callback={this.itemSubmitted}/>  
        <SelectedMovies/>    
      </div>
    )
  }
}

export default ActorQuestion
