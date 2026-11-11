import React, { useState } from 'react'

const App = () => {
  let [data, setData] = useState([
    {
      id: 1,
      name: "Ali",
      age: 12,
      job: "player",
      status: true
    },
    {
      id: 2,
      name: "Vali",
      age: 14,
      job: "player",
      status: false
    },
    {
      id: 3,
      name: "Sami",
      age: 18,
      job: "player",
      status: true
    },
    {
      id: 4,
      name: "Qurbon",
      age: 17,
      job: "player",
      status: false
    },
  ])
  let [addModal, setAddModal] = useState(false)
  let [editModal, setEditModal] = useState(false)

  let [inpName, setInpName] = useState("")
  let [inpAge, setInpAge] = useState("")
  let [inpJob, setInpJob] = useState("")
  let [idx, setIdx] = useState(null)

  let deletedUser = (id) => {
    setData(data.filter((e) => e.id != id))
  }
  let handleSubmit = (e) => {
    e.preventDefault()
    let newUser = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
      job: e.target.job.value,
      status: false
    }
    setData([...data, newUser])
    setAddModal(false)
  }

  let handleEditSubmit = (e) => {
    e.preventDefault()
    let editUser = {
      id: idx,
      name: e.target.name.value,
      age: e.target.age.value,
      job: e.target.job.value,
    }
    setData(data.map((e) => e.id == idx ? editUser : e))
    setEditModal(false)
  }

  let editModalOpen = (user) => {
  setInpName(user.name)
  setInpAge(user.age)
  setInpJob(user.job)
  setIdx(user.id)
  setEditModal(true)
}


  return (
    <div>
      {
        addModal ?
          <div style={{ background: "rgba(215,215,215,0.7)", width: "100%", height: "100vh", position: "absolute" }} className='w-full h-full'>
            <div className='bg-[white] w-[400px] p-5 m-auto mt-[250px] rounded-[10px]'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
                <h1>Add New User</h1>
                <input className='border p-1 rounded-[5px] outline-none' type="text" placeholder='Name' name='name' />
                <input className='border p-1 rounded-[5px] outline-none' type="text" placeholder='Age' name='age' />
                <input className='border p-1 rounded-[5px] outline-none' type="text" placeholder='Job' name='job' />
                <div className='flex justify-end gap-3'>
                  <button type='submit' className='border text-[green] py-0.8 px-4 rounded-[5px]'>submit</button>
                  <button onClick={() => setAddModal(false)} className='border text-[red] py-0.8 px-4 rounded-[5px]'>cancel</button>
                </div>
              </form>
            </div>
          </div> : null
      }

      {
        editModal ?
          <div style={{ background: "rgba(215,215,215,0.7)", width: "100%", height: "100vh", position: "absolute" }} className='w-full h-full'>
            <div className='bg-[white] w-[400px] p-5 m-auto mt-[250px] rounded-[10px]'>
              <form onSubmit={handleEditSubmit} className='flex flex-col gap-4' action="">
                <h1>Edit User</h1>
                <input defaultValue={inpName} className='border p-1 rounded-[5px] outline-none' type="text" placeholder='Name' name='name' />
                <input defaultValue={inpAge} className='border p-1 rounded-[5px] outline-none' type="text" placeholder='Age' name='age' />
                <input defaultValue={inpJob} className='border p-1 rounded-[5px] outline-none' type="text" placeholder='Job' name='job' />
                <div className='flex justify-end gap-3'>
                  <button type='submit' className='border text-[green] py-0.8 px-4 rounded-[5px]'>submit</button>
                  <button onClick={() => setEditModal(false)} className='border text-[red] py-0.8 px-4 rounded-[5px]'>cancel</button>
                </div>
              </form>
            </div>
          </div> : null
      }

      <button onClick={() => setAddModal(true)} className='border text-[blue] py-0.8 px-4 rounded-[5px]'>add</button>
      <table className='border'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Job</th>
            <th>Status</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.job}</td>
                  <td>{user.status ? "Active" : "Inactive"}</td>
                  <td>
                    <div>
                      <button onClick={() => editModalOpen(user)} className='border text-[green] py-0.8 px-4 rounded-[5px]'>Edit</button>
                      <button className='border text-[red] py-0.8 px-4 rounded-[5px]' onClick={() => deletedUser(user.id)}>Delete</button>
                      <button className='border text-[blue] py-0.8 px-4 rounded-[5px]'>Info</button>
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div >
  )
}

export default App
