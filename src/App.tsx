
import { use, useState } from 'react'

const App = () => {

  let [data, setData] = useState([
    { id: 1, name: "Ali", age: 20,status:true },
    { id: 2, name: "Vali", age: 21,status:false }
  ])

  let [addModal, setaddModal] = useState(false)
  let [editModal, seteditModal] = useState(false)
  let [inpName, setInpName] = useState("")
  let [inpAge, setInpAge] = useState("")
  let [idx, setidx] = useState(null)
  let [search,setSearch]=useState('')

  let [status,setStatus]=useState<string>('all')

  let deletedUser = (id) => {
    setData(data.filter((e) => e.id != id))
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    let newUser = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
      status:true
    }
    setData([...data, newUser])
    setaddModal(false)
  }

  let handleEditSubmit = (e) => {
    e.preventDefault()
    let editUser = {
      id: idx,
      name: e.target.name.value,
      age: e.target.age.value
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

  
    let filteredUsers=data.filter((user)=>{

      let res=user.name.toLowerCase().includes(search.toLowerCase())

      let resStat=status=='all' || user.status == JSON.parse(status)

      return res && resStat
    })
  
  return (
    <div>

      <button onClick={() => setaddModal(true)} className='bg-[#0095ff] text-[white] rounded-[5px] px-2.5 py-20px'>add</button>
      <input type="text" placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)} />
      <select value={status} onChange={(e)=>setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      {
        addModal ?
          <div style={{ background: "rgba(214,214,215,0.5)", height: "100vh", position: "absolute", top: "0", width: "100%" }}>
            <div style={{ width: "350px", background: "white", borderRadius: "10px", margin: "auto", marginTop: "200px" }}>

              <form onSubmit={handleSubmit} action="" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20, gap: "15px" }}>

                <input name='name' style={{ width: "90%", padding: "10px", border: "1px solid black", borderRadius: "5px", outline: "none" }} type="text" placeholder='Name' />
                <input name='age' style={{ width: "90%", padding: "10px", border: "1px solid black", borderRadius: "5px", outline: "none" }} type="text" placeholder='Age' />

                <div style={{ width: "90%", display: "flex", justifyContent: "end", gap: "20px" }}>
                  <button style={{ cursor: "pointer", padding: "10px 20px", border: "1px solid navy", borderRadius: "5px", outline: "none", background: "green", color: "white" }}>add</button>
                  <button onClick={() => setaddModal(false)} style={{ cursor: "pointer", padding: "10px 20px", border: "1px solid red", borderRadius: "5px", outline: "none", background: "red", color: "white" }}>cancel</button>
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
                  <button style={{ cursor: "pointer", padding: "10px 20px", border: "1px solid navy", borderRadius: "5px", outline: "none", background: "green", color: "white" }}>edit</button>
                  <button onClick={() => seteditModal(false)} style={{ cursor: "pointer", padding: "10px 20px", border: "1px solid red", borderRadius: "5px", outline: "none", background: "red", color: "white" }}>cancel</button>
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
                <p>{e.status?"Active":"Inactive"}</p>
                <div className='flex gap-5'>
                  <button onClick={() => deletedUser(e.id)} className='bg-[red] text-[white] rounded-[5px] px-5 py-1'>Delete</button>
                  <button onClick={() => openEditModal(e)} className='bg-[blue] text-[white] rounded-[5px] px-5 py-1'>Edit</button>
                  <button className='bg-[white] text-[black] border rounded-[5px] px-5 py-1'>Info</button>
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
