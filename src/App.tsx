import { useState } from 'react'
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
  id: number
  name: string
  age: number
  status: boolean
}
const App = () => {
  let [data, setData] = useState<User[]>([
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


  let deletedUser = (id: number) => {
    setData(data.filter((e) => e.id !== id))
  }


  let handleSubmit = (e) => {
    e.preventDefault()
    let form = new FormData(e.currentTarget)
    console.log(e.currentTarget);

    let newUser = {
      id: Date.now(),
      name: String(form.get('name')),
      age: Number(form.get('age')),
      status: true
    }

    setData([...data, newUser])
    setaddModal(false)
  }


  let handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let form = new FormData(e.currentTarget)
    let editUser = {
      id: idx,
      name: String(form.get('name')),
      age: Number(form.get('age')),
    }

    setData((prev) =>
      prev.map((e) => e.id === idx ? editUser : e)
    )

    seteditModal(false)
  }


  let openEditModal = (e: User) => {
    setInpName(e.name)
    setInpAge(String(e.age))
    seteditModal(true)
    setidx(e.id)
  }

  let filteredUsers = data.filter((user) => {
    let res = user.name.toLowerCase().includes(search.toLowerCase())
    let resStat = status === 'all' || user.status === JSON.parse(status)
    return res && resStat
  })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Users CRUD</h1>
        <Button onClick={() => setaddModal(true)}>+ Add User</Button>
      </div>

      <div className="flex gap-3 mb-8">
        <Input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white" />
        <Select value={status} onValueChange={setStatus}>

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

      <Dialog open={addModal} onOpenChange={setaddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4">

            <Input
              name="name"
              placeholder="Enter name"
              required />

            <Input
              name="age"
              type="number"
              placeholder="Enter age"
              min="1"
              required />

            <div className="flex justify-end gap-2">

              <Button
                type="button"
                variant="outline"
                onClick={() => setaddModal(false)}>
                Cancel
              </Button>

              <Button type="submit">Add User</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editModal} onOpenChange={seteditModal}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleEditSubmit}
            className="flex flex-col gap-4">

            <Input
              defaultValue={inpName}
              name="name"
              placeholder="Enter name"
              required />

            <Input
              defaultValue={inpAge}
              name="age"
              type="number"
              placeholder="Enter age"
              min="1"
              required />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => seteditModal(false)}>
                Cancel
              </Button>

              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {
          filteredUsers.map((e) => {
            return (
              <Card key={e.id} className="bg-white">
                <CardContent className="p-5 flex flex-col items-center gap-3">
                  <h1 className="text-xl font-bold">{e.name}</h1>
                  <p className="text-gray-500">Age: {e.age}</p>
                  <p className={
                    e.status
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }>
                    {e.status ? "Active" : "Inactive"}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletedUser(e.id)}>Delete</Button>
                    <Button
                      size="sm"
                      onClick={() => openEditModal(e)}>Edit</Button>
                    <Button
                      variant="outline"
                      size="sm">Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}
export default App
