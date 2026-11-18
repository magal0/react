import { useEffect, useState } from 'react'
import axios from "axios"
import { Button, } from './Components/ui/button'
import { Dialog, DialogContent } from './Components/ui/dialog'
import { Avatar, Input } from '@base-ui/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
const App = () => {

  let api = "https://69b7cc98ffbcd02860963626.mockapi.io/data"
  let [data, setData] = useState([])
  let [addModal, setAddModal] = useState(false)
  let [editModal, setEditModal] = useState(false)
  let [infoModal, setInfoModal] = useState(false)
  let [inpName, setInpName] = useState('')
  let [inpImg, setInpImg] = useState('')
  let [inpAge, setInpAge] = useState('')
  let [editId, setEditId] = useState(null)
  let [search, setSearch] = useState("")
  let [statusFilter, setStatusFilter] = useState("all")

  async function getUsers() {
    try {
      let { data } = await axios.get(api)
      setData(data)
    } catch (error) {
      console.error(error);

    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  async function deletedUser(id) {
    try {
      await axios.delete(api + "/" + id)
      getUsers()
    } catch (error) {
      console.error(error);

    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let newUser = {
      name: e.target.name.value,
      age: e.target.age.value,
      avatar: e.target.img.value,
      status: false
    }
    try {
    await axios.post(api, newUser)
      setAddModal(false)
    } catch (error) {
      console.error(error);

    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    let upUser = {
      name: inpName,
      age: Number(inpAge),
      avatar: inpImg,
    }
    try {
       await axios.put(api + "/" + editId, upUser)
      getUsers()
      setEditModal(false)
    } catch (error) {
      console.error(error);

    }
  }

  function openEditModal(el) {
    setInpName(el.name)
    setInpAge(String(el.age))
    setInpImg(String(el.avatar))
    setEditId(el.id)
    setEditModal(true)
  }

  const filteredUsers = data.filter(user => {
    const searchRes = user.name.toLowerCase().includes(search.toLowerCase())
    const statusRes = statusFilter === 'all' || String(user.status) === statusFilter
    return searchRes && statusRes
  })

  return (
    <div>
      <Button onClick={() => setAddModal(true)}>Add User</Button>

      <Input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bg-white"
      />

      <Select value={statusFilter} onValueChange={setStatusFilter}>

        <SelectTrigger className="w-45 bg-white">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>

      </Select>
      <Dialog open={addModal} onOpenChange={setAddModal}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <Input
              name="img"
              placeholder="Enter name"
              required
            />

            <Input
              name="name"
              placeholder="Enter name"
              required
            />

            <Input
              name="age"
              type="number"
              placeholder="Enter age"
              min="1"
              required
            />

            <div className="flex justify-end gap-2">

              <Button
                type="button"
                variant="outline"
                onClick={() => setAddModal(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                Add User
              </Button>

            </div>

          </form>

        </DialogContent>

      </Dialog>

      <Dialog open={editModal} onOpenChange={setEditModal}>
        <DialogContent>
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">

            <Input
              defaultValue={inpImg}
              placeholder="Enter image"
              required
            />

            <Input
              defaultValue={inpName}
              placeholder="Enter name"
              required
            />

            <Input
              defaultValue={inpAge}
              type="number"
              placeholder="Enter age"
              min="1"
              required
            />

            <div className="flex justify-end gap-2">

              <Button
                type="button"
                variant="outline"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                edit
              </Button>

            </div>

          </form>

        </DialogContent>

      </Dialog>



      <table border="1">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredUsers.map((el) => {
              return (
                <tr key={el.id}>
                  <td><img style={{ width: "80px" }} src={el.avatar} alt="" /></td>
                  <td>{el.name}</td>
                  <td>{el.age}</td>
                  <td className={el.status ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{el.status ? "Active" : "Inactive"}</td>
                  <td><div>
                    <Button variant="destructive" size="sm" onClick={() => deletedUser(el.id)}>Delete</Button>
                    <Button size="sm" onClick={() => openEditModal(el)}>Edit</Button>
                    <Button size="sm" onClick={() => setInfoModal(true)}>Info</Button>

                    <Dialog open={infoModal} onOpenChange={setInfoModal}>
                      <DialogContent>
                        <img src={el.avatar} alt="" />
                        <h1>{el.name}</h1>
                        <p>{el.age}</p>
                      </DialogContent>

                    </Dialog>

                  </div></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
