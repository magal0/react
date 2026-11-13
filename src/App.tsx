
import { Button, MenuItem, Select, TextField } from '@mui/material'
import { useState } from 'react'

const App = () => {

  let [data, setData] = useState([
    { id: 1, name: "Ali", age: 20, status: true },
    { id: 2, name: "Vali", age: 21, status: false }
  ])

  let [addModal, setaddModal] = useState(false)
  let [editModal, seteditModal] = useState(false)
  let [inpName, setInpName] = useState("")
  let [inpAge, setInpAge] = useState("")
  let [idx, setidx] = useState(null)
  let [search, setSearch] = useState('')

  let [status, setStatus] = useState<string>('all')

  let deletedUser = (id) => {
    setData(data.filter((e) => e.id != id))
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    let newUser = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
      status: true
    }
    setData([...data, newUser])
    setaddModal(false)
  }

  let handleEditSubmit = (e) => {
    e.preventDefault()
    let editUser = {
      id: idx,
      name: e.target.name.value,
      age: e.target.age.value,
      // status:e.target.status.value
    }
    setData((prev) => prev.map((e) => e.id == idx ? editUser : e))
    seteditModal(false)
  }

  let openEditModal = (e) => {
    setInpName(e.name)
    setInpAge(e.age)
    seteditModal(true)
    setidx(e.id)
  }


  let filteredUsers = data.filter((user) => {

    let res = user.name.toLowerCase().includes(search.toLowerCase())

    let resStat = status == 'all' || user.status == JSON.parse(status)

    return res && resStat
  })

  return (
    <div>

      <Button onClick={() => setaddModal(true)} variant="contained">Add User</Button>
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Search" variant="outlined" />
      <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"true"}>Active</MenuItem>
        <MenuItem value={"false"}>Inactive</MenuItem>
      </Select>
      {
        addModal ?
          <div style={{ background: "rgba(214,214,215,0.5)", height: "100vh", position: "absolute", top: "0", width: "100%" }}>
            <div style={{ width: "350px", background: "white", borderRadius: "10px", margin: "auto", marginTop: "200px" }}>

              <form onSubmit={handleSubmit} action="" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20, gap: "15px" }}>

                <input name='name' style={{ width: "90%", padding: "10px", border: "1px solid black", borderRadius: "5px", outline: "none" }} type="text" placeholder='Name' />
                <input name='age' style={{ width: "90%", padding: "10px", border: "1px solid black", borderRadius: "5px", outline: "none" }} type="text" placeholder='Age' />

                <div style={{ width: "90%", display: "flex", justifyContent: "end", gap: "20px" }}>
                  <Button type='submit' variant="contained">add</Button>
                  <Button  onClick={() => setaddModal(false)} variant="contained"  color="error">Cancel</Button>
                </div>

              </form>
            </div>
          </div> : null


      }

      {
        editModal ?
          <div style={{ background: "rgba(214,214,215,0.5)", height: "100vh", position: "absolute", top: "0", width: "100%" }}>
            <div style={{ width: "350px", background: "white", borderRadius: "10px", margin: "auto", marginTop: "200px" }}>

              <form onSubmit={handleEditSubmit} action="" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20, gap: "15px" }}>

                <input defaultValue={inpName} name='name' style={{ width: "90%", padding: "10px", border: "1px solid black", borderRadius: "5px", outline: "none" }} type="text" placeholder='Name' />
                <input defaultValue={inpAge} name='age' style={{ width: "90%", padding: "10px", border: "1px solid black", borderRadius: "5px", outline: "none" }} type="text" placeholder='Age' />

                <div style={{ width: "90%", display: "flex", justifyContent: "end", gap: "20px" }}>
                  <Button type='submit' variant="contained">submit</Button>
                  <Button  onClick={() => seteditModal(false)} variant="contained"  color="error">cancel</Button>
                </div>

              </form>
            </div>
          </div> : null
      }

      <div className='grid grid-cols-4 gap-5'>
        {
          filteredUsers.map((e) => {//ay bajoi data baroi search kor kadan mo giriftem datai filterkadagira mondem(52stroka)
            return (

              <div className='border-2 rounded-[5px] p-2.5 flex flex-col items-center gap-2.5' key={e.id}>
                <h1>{e.name}</h1>
                <p>{e.age}</p>
                <p>{e.status ? "Active" : "Inactive"}</p>
                <div className='flex gap-5'>
                  <Button  onClick={() => deletedUser(e.id)} variant="outlined"  color="error">Delete</Button>
                  <Button  onClick={() => openEditModal(e)} variant="outlined">Edit</Button>
                  <Button variant="outlined">Info</Button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
