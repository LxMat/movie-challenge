import React, { Component } from "react";
import MDB_API from "../data/movieDBAPI";
import './textsearch.scss';



//https://alligator.io/react/react-autocomplete/
class TextSearch extends Component {
  
  constructor(props) {
    super(props);
    this.suggestions = [];
    this.pause = 1500; //debounce pause timer
    MDB_API.fetchFromServer().then(res => console.info(res))
    this.state = {
      suggestions: [],
      movieIDs:[],
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      showSuggestions: true,
      loading:false
      // What the user has entered
    };  
    this.debouncedOnChange = this.debounce(200,this.debouncedOnChange)
  }
  
  onKeyDown = e => {
    // MDB_API.testcall().then(console.log)
    const {activeSuggestion,filteredSuggestions,suggestions} = this.state
     // User pressed the enter key, update the input and close the suggestions
    if (e.keyCode === 13) {

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: suggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === suggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: (activeSuggestion + 1)%suggestions.length });
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



  //used for debugging...
  printResponse(res){
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
          ))
  }



  onChange = e => {
    // e.persist(); //stop react from disposing the event

    if(typeof e.currentTarget.value ==='undefined') return;
    const userInput = e.currentTarget.value;
    this.setState({userInput:userInput})
    this.debouncedOnChange(e.target.value);
  }

debouncedOnChange = (eventVal) => {
  if(!eventVal) return;
  this.setState({loading:true});
  MDB_API.searchMovie(eventVal)
  .then(res => 
    {      
      this.setState({
        movieIDs:res.results.map(data => data.id),
        suggestions:res.results.map(data=>data.title),
        loading:false,
        showSuggestions:true
      });
      console.log(this.state.suggestions)
        }
          )
    .catch(console.error)
  this.setState(
    {
    activeSuggestion: 0,
    });
  }

  renderSuggestions(){
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        suggestions
      }
    } = this;

    let suggestionsListComponent;

    if( this.state.loading ){
      suggestionsListComponent = (
        <div className="loading">
          <em>Searching...</em>
        </div>
      );
      
    }else if (showSuggestions && userInput) {
      if (suggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions" onKeyUp={console.log('ul')}>
            {suggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              if(suggestions[index]===''){
                return('');
              }
              return (
                <li
                  className={className}
                  key={index}
                  onClick={() => onClick(index)}
                >
                  {suggestions[index]}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }
    return suggestionsListComponent;

    
  }
  onClick = index => {
    const {movieIDs} = this.state;
    // console.log(this.state.suggestions[index])
    this.setState({activeSuggestion:index})
  
    if(this.props.callback) this.props.callback(movieIDs[index]); //if callback exists run it.
  }
  render() {
    // console.log(this.state.suggestions)
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    return (
      <div onChange={onChange}>
        <input type="text" onChange={this.onChange} onKeyUp={onKeyDown} value={userInput}/>
        {/* <em>{this.state.suggestions}</em> */}
        {this.renderSuggestions()}
      </div>
    );
  }
}
export default TextSearch;