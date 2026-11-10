import React from 'react'

const Table = ({data,DeleteData}) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((e)=>{
            return <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.age}</td>
              <td>
                <button onClick={()=>DeleteData(e.id)}>Delete</button>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default Table
