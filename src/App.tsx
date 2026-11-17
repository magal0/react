
import { useEffect, useState } from 'react'
import axios from 'axios'

import { Button } from '@/Components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog'
import { Input } from '@/Components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import {
  Card,
  CardContent,
} from '@/Components/ui/card'

type User = {
  id: string
  name: string
  age: number
  status: boolean
}

const API = 'https://69b7cc98ffbcd02860963626.mockapi.io/data'

const App = () => {

  const [data, setData] = useState<User[]>([])
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editStatus, setEditStatus] = useState(true)
  const [editId, setEditId] = useState<string | null>(null)
  const [inpName, setInpName] = useState('')
  const [inpAge, setInpAge] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')


  async function getUsers() {
    try {
      const { data } = await axios.get<User[]>(API)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getUsers()
  }, [])


  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    console.log(e.currentTarget)
    const newUser = {
      name: String(form.get('name')),
      age: Number(form.get('age')),
      status: true
    }

    try {
      const { data } = await axios.post<User>(API, newUser)
      setData(prev => [...prev, data])
      setAddModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function deletedUser(id: string) {
    try {
      await axios.delete(`${API}/${id}`)
      // setData(prev => prev.filter(user => user.id !== id))
      getUsers()
    } catch (error) {
      console.error(error)
    }
  }

  function openEditModal(user: User) {
    setInpName(user.name)
    setInpAge(String(user.age))
    setEditStatus(user.status)
    setEditId(user.id)
    setEditModal(true)
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    const updatedUser = {
      name: inpName,
      age: Number(inpAge),
      status: editStatus
    }

    try {
      const { data } = await axios.put(`${API}/${editId}`, updatedUser)
      // setData(prev => prev.map(user => user.id === editId ? data : user))
      getUsers()
      setEditModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  const filteredUsers = data.filter(user => {
    const searchRes = user.name.toLowerCase().includes(search.toLowerCase())
    const statusRes = statusFilter === 'all' || String(user.status) === statusFilter
    return searchRes && statusRes
  })


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between gap-4 mb-8">

        <h1 className="text-3xl font-bold">Users CRUD</h1>

        <Button onClick={() => setAddModal(true)}>+ Add User</Button>

      </div>


      <div className="flex gap-3 mb-8">

        <Input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-white"
        />

        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >

          <SelectTrigger className="w-45 bg-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Active</SelectItem>
            <SelectItem value="false">Inactive</SelectItem>
          </SelectContent>

        </Select>

      </div>


      <Dialog open={addModal} onOpenChange={setAddModal}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >

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

          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col gap-4"
          >

            <Input
              value={inpName}
              onChange={e => setInpName(e.target.value)}
              placeholder="Enter name"
              required
            />

            <Input
              value={inpAge}
              onChange={e => setInpAge(e.target.value)}
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
                Save
              </Button>

            </div>

          </form>

        </DialogContent>

      </Dialog>




      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {filteredUsers.map(user => (

          <Card key={user.id} className="bg-white">

            <CardContent className="p-5 flex flex-col items-center gap-3">

              <h1 className="text-xl font-bold">
                {user.name}
              </h1>

              <p className="text-gray-500">
                {user.age} y.o
              </p>

              <p className={
                user.status
                  ? 'text-green-600 font-medium'
                  : 'text-red-600 font-medium'
              }>
                {user.status ? 'Active' : 'Inactive'}
              </p>

              <div className="flex flex-wrap justify-center gap-2">

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deletedUser(user.id)}
                >
                  Delete
                </Button>

                <Button
                  size="sm"
                  onClick={() => openEditModal(user)}
                >
                  Edit
                </Button>

              </div>

            </CardContent>

          </Card>

        ))}


      </div>

    </div>
  )
}

export default App
