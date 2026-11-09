import React from 'react'

const Card = ({name,age}:{name:string;age:number}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age}</p>
    </div>
  )
}

export default Card

