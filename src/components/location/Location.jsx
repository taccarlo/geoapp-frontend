import React from 'react'

// TODO implement location popup
const Location = ({ location }) => {
  return (
    <div>
      <h3>{"Nome: "+location.circoscriz}</h3>  
      <h3>{"Residenti: "+location.residenti}</h3>   
    </div>
  )
}

export default Location
