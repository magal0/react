import { useEffect, useState, type SubmitEvent } from 'react'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface TodoImage {
  id: number
  imageName: string
}

interface Todo {
  id: number
  name: string
  description: string
  isCompleted: boolean
  images?: TodoImage[]
}

const baseUrl = "https://to-dos-api.softclub.tj"
const api = `${baseUrl}/api/to-dos`

function readForm(form: HTMLFormElement) {
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement
  return {
    name: field("name").value.trim(),
    description: field("desc").value.trim(),
    files: Array.from(field("photo").files ?? []),
  }
}

const App = () => {
  const [data, setData] = useState<Todo[]>([])
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Todo | null>(null)

  async function getUsers() {
    try {
      const { data } = await axios.get(api)
      setData(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    axios
      .get(api)
      .then(({ data }) => setData(data.data))
      .catch(console.error)
  }, [])

  async function deletedUser(id: number) {
    try {
      await axios.delete(`${api}?id=${id}`)
      await getUsers()
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const { name, description, files } = readForm(form)

    if (!name || !description || files.length === 0) {
      alert("Name, description and at least one image are required")
      return
    }

    const fd = new FormData()
    fd.append("Name", name)
    fd.append("Description", description)
    files.forEach((file) => fd.append("Images", file))

    try {
      await axios.post(api, fd)
      await getUsers()
      form.reset()
      setOpen(false)
    } catch (error) {
      console.error("ERROR:", axios.isAxiosError(error) ? error.response?.data : error)
    }
  }

  function editUser(user: Todo) {
    setSelectedUser(user)
    setEditOpen(true)
  }

  async function updateUser(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selectedUser) return

    const { name, description, files } = readForm(e.currentTarget)

    if (!name || !description) {
      alert("Name and description are required")
      return
    }

    try {
      // Update text fields (API expects JSON)
      await axios.put(api, { id: selectedUser.id, name, description })

      // Optionally upload new images
      if (files.length > 0) {
        const fd = new FormData()
        files.forEach((file) => fd.append("Images", file))
        await axios.post(`${api}/${selectedUser.id}/images`, fd)
      }

      await getUsers()
      setEditOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />

          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add profile</DialogTitle>
              </DialogHeader>

              <Input name="name" placeholder="Name" />
              <Input name="desc" placeholder="Description" />
              <Input type="file" multiple name="photo" />

              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-sm">
            <form key={selectedUser?.id} onSubmit={updateUser}>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>

              <Input name="name" placeholder="Name" defaultValue={selectedUser?.name} />
              <Input name="desc" placeholder="Description" defaultValue={selectedUser?.description} />
              <Input type="file" multiple name="photo" />

              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {data.map((user) => (
        <div key={user.id}>
          {user.images?.map((img) => (
            <img key={img.id} src={`${baseUrl}/images/${img.imageName}`} alt={user.name} width="150" />
          ))}
          <h1>{user.name}</h1>
          <p>{user.description}</p>
          <p>{user.isCompleted ? "Completed" : "Not completed"}</p>
          <div>
            <button onClick={() => deletedUser(user.id)}>Delete</button>
            <button onClick={() => editUser(user)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
