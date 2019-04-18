import React, { Component } from "react";
import "./selectgame.scss";
import KeyHandler, { KEYPRESS, KEYDOWN } from 'react-key-handler';


export class SelectGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHover: 0,
      itemSelected: 0
    };
    this.modedescriptions = [
      "I'm Batman",
      "May the Force be with you.",
      "Hasta La Vista, Baby" 
    ];
  }

  itemHover(id) {
    this.setState({
      itemHover: id
    });
  }

  generateGameModeItem() {
    let setNames = ["Superhero Movies","70s Movies","90s Movies"]
    let descItems = [];
    let cName;
    for (let i = 0; i < 3; i++) {
      cName =
        this.state.itemSelected !== i
          ? "modeItem center-me"
          : "modeItem center-me itemClicked";

      descItems.push(
        <div
          key={i}
          onClick={() => this.itemClicked(i)}
          onMouseOver={e => this.itemHover(i)}
          className={cName}
        >
          {//Question set {i}
          }
          {setNames[i]}
        </div>
      );
    }
    return descItems;
  }
  itemClicked(id) {
    this.setState({
      itemSelected: id
    });
  }
  render() {
    const gameDescriptions = [
      {
        id: 0,
        title: "gameDescription 0",
        description: "description about gamemode 0"
      },
      {
        id: 1,
        title: "gameDescription 1",
        description: "description about gamemode 1"
      },
      {
        id: 2,
        title: "gameDescription 2",
        description: "description about gamemode 2"
      }
    ];

    return (
      <div>
        {this.keyHandler()}
        <div id="gameModeBox" className="center-me">
          Select a Question Set
          {this.generateGameModeItem()}
        </div>
        <div id="modeDescription" className="center-me">
          {/*"Question Set Description"*/}
          <div className="descriptionItem">
            {" "}
            {this.modedescriptions[this.state.itemHover]}
          </div>
        </div>
        <div className="center-me fit-width">
          <button style={{marginTop:'30px'}}
            onClick={() =>{
              this.props.history.push(`/play/${this.state.itemSelected}`)
            }}
          >
            Start!
          </button>
        </div>
      </div>
    );
  }

  keyHandler(){return(<>
    <KeyHandler
        keyEventName={KEYDOWN}
        keyValue="ArrowUp"
        onKeyHandle={()=> this.state.itemSelected == 0 ? 
          this.setState({itemSelected:2,itemHover:2}) :  
          this.setState({itemSelected:this.state.itemSelected-1,itemHover:this.state.itemHover-1}) }
      />
      <KeyHandler
        keyEventName={KEYDOWN}
        keyValue="ArrowDown"
        onKeyHandle={()=> this.state.itemSelected == 2 ? 
          this.setState({itemSelected:0,itemHover:0}) :  
          this.setState({itemSelected:this.state.itemSelected+1,itemHover:this.state.itemHover+1}) }      />
      <KeyHandler
        keyEventName={KEYDOWN}
        keyValue="Enter"
        onKeyHandle={() =>{
          this.props.history.push(`/play/${this.state.itemSelected}`)
        }}
      />
    </>
)
}
}

export default SelectGame;
