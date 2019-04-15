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
      question:question
      };
  }

  getCredits = movieID =>{
    MBD_API.getCredits(movieID)
    .then(data => data.cast.filter(actor => actor.id === this.state.actorID))
    .then(check => {
      if(check.length<1){
        console.log('wrong')
      }else{
        console.log('right')
      }

    });
  }

  checkAnswer(data){
    const actors = data.cast.map(actor =>{ return({
      id:actor.id,
      name:actor.name
    })})
  console.log(actors)
  }

  render() {
    let actor = "Tom Hanks"
    const {question} = this.state;
    return (
      <div>
        <em>{question}</em>
        <TextSearch searchFunction={MBD_API.searchMovie} callback={this.getCredits}/>      
      </div>
    )
  }
}

export default ActorQuestion
