import React from 'react'

export default function Card(props) {
  let selected = (props.toggle)?' selected':' unselected';
  return (
    <div>
      <div
        className={props.cardStyle + selected }
        onClick={() => props.onClick()}
        
      ><img src={props.image}  alt="poster"></img>
      </div>
    </div>
  )
}

