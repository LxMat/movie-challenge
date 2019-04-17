import React, { Component } from 'react'
import TextSearch from './TextSearch'
import MBD_API from '../data/movieDBAPI'
export class ActorQuestion extends Component {
  constructor(props){
    super(props);
    const {question,name,id} = props.question
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
  removeSelectedMovie(index){
    let updatedSelection = this.state.selectedMovies;
    if(updatedSelection.length===1){
      updatedSelection.pop();
    }else{
      updatedSelection.splice(index,1);
    }
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
          // <i class="fas fa-times"></i>


          <li key ={index}>{title} <span className="fas fa-times" onClick={() => this.removeSelectedMovie(index)}/></li>
        )
      })}
      </ul>
      {button}
    </div>)
  }

  buttonClicked = ()=>{
    const {actorID,selectedMovies} = this.state;
    Promise.all(selectedMovies.map(movie =>                           
       MBD_API.getCredits(movie.id)                                       //get all credeits for each id
        .then(credits => {    
          return credits.cast.filter( cast => cast.id===actorID )         //filter the cast with corrrect actorID
        })))
      .then(result =>                                                     //result has length 1 if correct, 0 if wrong
        result.map( res =>                      
          (res.length>0)?'correct':'wrong'))                              //change '1' to correct  '0' to wrong
      .then(correctAnswer =>                                              //update the answer to props
        this.props.update({
                type:"SEARCH",
                answer:selectedMovies.map(movie=>movie.title),
                correct:correctAnswer}))
    
  }

  
  itemSubmitted = ({id,title}) => this.addSelectedMovie({title:title,id:id})

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
