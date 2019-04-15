import React, { Component } from 'react';
import {MovieImage} from '../MovieImage';

class GuessMovieImage extends Component {
    
    constructor(props) {
        super(props);

        this.searchText = props.question.correct.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')+" wallpaper";
        this.myRef = React.createRef();
      }

    buttonClicked() {
    console.log(this.myRef.current);
    let answer = this.myRef.current.value;
    this.props.update(answer);
    }

    render() {
        return (
            <>
                <MovieImage searchText={this.searchText}/>
                <input type="text" ref={this.myRef}></input>
                <button onClick={() => this.buttonClicked()}>submit</button>
            </>
        );
    }
}

export default GuessMovieImage;