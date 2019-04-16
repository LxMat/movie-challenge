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
      selectedMovies:[]
      };
  }

  addSelectedMovie = movie => {
    let updatedSelection = this.state.selectedMovies;
    updatedSelection.push(movie)
    console.log(updatedSelection) 
    this.setState({
      selectedMovies:updatedSelection
    })
  }
  SelectedMovies = () =>{
    const {selectedMovies} = this.state
    console.log("selMov",selectedMovies)
    if(!selectedMovies[0]){
      return(<div>Select your movies</div>)
    }
    let button;
    if (selectedMovies.length===3){
      button = <button onClick={()=>this.props.update(selectedMovies)}>Submit</button>
    }
    return (
    <div>
      movies:
      <ul>{selectedMovies.map((title,index) => {
        return (
          <li key ={index}>{title}</li>
        )
      })}
      </ul>
      {button}
    </div>)
  }

  getCredits = ({id,title}) =>{
    MBD_API.getCredits(id)
    .then(data => data.cast.filter(actor => actor.id === this.state.actorID))
    .then(check => {
      if(check.length<1){
        console.log('wrong ',title)
      }else{
        console.log('right ',title)
      }
    });
   this.addSelectedMovie(title);
  }

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
        <TextSearch searchFunction={MBD_API.searchMovie} callback={this.getCredits}/>  
        <SelectedMovies/>    
      </div>
    )
  }
}

export default ActorQuestion
