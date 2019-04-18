import React, { Component } from 'react';
import './movieimage.scss';

class GuessMovieImage extends Component {
    
    constructor(props) {
        super(props);

        this.searchText = props.question.correct.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')+" wallpaper";
        this.myRef = React.createRef();
        
      }

    submitAnswer() {
    let answer = this.myRef.current.value;
    this.props.update({
        type:"GuessMovieImage",
        answer:answer});
    }
    onKeyDown = (e)=>{

        //submit on enter
        if(e.which===13){
            this.submitAnswer()
        }
    }

    render() {
        const { path, question } = this.props.question
        return (
            <div className="ImageQuestion">
                <div>{question}</div>
                <img alt="poster" src={`https://image.tmdb.org/t/p/w500${path}`}/> <br/>
                <span className="flex-center"><input type="text" autoFocus="true" ref={this.myRef} onKeyDown={this.onKeyDown}></input>
                <button onClick={() => this.submitAnswer()}>submit</button>
                </span>
            </div>
        );
    }
}

export default GuessMovieImage;