import React, { Component } from "react";
import MDB_API from "../data/movieDBAPI"



//https://alligator.io/react/react-autocomplete/
class TextSearch extends Component {
  
  static defaultProps = {
    suggestions: ['banana','kiwi','apple','pizza','aaa','aab','aaaaab']
  };

  
  
  constructor(props) {
    super(props);
    
    this.pause = 3000; //debounce pause variable

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: " "
    };
    // this.onChange.bind(this);
  }

  throttled(delay, fn) {
    let lastCall = 0;
    return function (...args) {
      const now = (new Date()).getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    }
  }

  
  debounce(delay,fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  onChange = e=> {
    e.persist(); //stop react from disposing the event
    this.debounce(this.pause, () => {
      if(this.state.userInput === e.target.value){
        return;
      }
      this.setState({userInput:e.target.value})
      console.log('value :: ', e.target.value);
      // call 
      MDB_API.fetchFromServer(e.target.value)
      .then(res => 
        console.log( res.results
        .map(data => 
          [
            data.id,
            data.title,
            data.release_date,
            data.poster_path,
            data.backdrop_path,
            data.overview
          ]
            )))
    })()
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.onChange}/>
      </div>
    );
  }
}
export default TextSearch;