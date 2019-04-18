import React, { Component } from "react";
import "./selectgame.scss";

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
          <button
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
}

export default SelectGame;
