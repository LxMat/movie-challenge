import React from "react";
import { MovieImage } from './MovieImage';

export default function StartScreen(props) {
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
    </div>
  );
}
