import React from "react";
import { MovieImage } from './MovieImage';
import UserList, {NameBox} from "./UserList";
import FirestoreInterface from "./data/FirestoreInterface"


const Footer = () => <div style={{position:'absolute', bottom:'0'}}>@ Made by Adel Bavey and Alexander Heikinaho</div>

export default function StartScreen(props) {

  const myref = React.createRef();
  

  return (<>
    <div className="center-me fit-width">
      <h2>Ultimate Movie Challenge</h2>
      <div></div>
      <div className="center-me fit-width">
        <button onClick={() => props.history.push("/selectgame")}>
          Begin !
        </button>
      </div>
      
      <span className="start-poster"><MovieImage searchText="lord of the rings wallpaper"/></span>
      <UserList set="1"/>
      <NameBox set="1" score={1}/>
    </div>
    <Footer />
    </>
  );
}
