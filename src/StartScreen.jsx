import React from 'react';

export default function StartScreen(props) {
  return (
    <div>
        <h2>Ultimate Movie Challenge</h2>
        <div>Here will be an infomationBox</div>
        
        <button onClick={()=>props.history.push("/selectgame")} >this is a Knapp</button>
        
    </div>
  )
}
