import React from 'react'

const App = () => {
  let status=false
  return (
    <div>
      {status?"Active":"Inactive"}
    </div>
  )
}

export default App