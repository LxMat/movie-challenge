import React from 'react'

export default function Card(props) {
  let selected = (props.toggle)?'selected':'unselected';
  return (
    <div>
      <div
        className={`cardItem ${selected}` }
        onClick={() => props.onClick()}
        style={{ backgroundImage: `url(${props.image})` }}
      />
    </div>
  )
}

