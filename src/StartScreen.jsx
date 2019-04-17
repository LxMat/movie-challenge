import React from "react";
import { MovieImage } from './MovieImage';
import NameList, {NameBox} from "./NameList";
import FirestoreInterface from "./data/FirestoreInterface"

export default function StartScreen(props) {

  const myref = React.createRef();
  

  return (
    <div className="center-me fit-width">
      <h2>Ultimate Movie Challenge</h2>
      <div>Here will be an infomationBox</div>
      <div className="center-me fit-width">
        <button onClick={() => props.history.push("/selectgame")}>
          this is a Knapp
        </button>
      </div>
      <MovieImage searchText="lord of the rings wallpaper"/>
      <NameList />
      <NameBox />
    </div>
  );
}
