import React, { useDebugValue, useEffect, useState } from 'react'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"



const App = () => {
  let api = "https://to-dos-api.softclub.tj/api/to-dos"

  let [data, setData] = useState([])
  let [open, setOpen] = useState(false)
  async function getUsers() {
    try {
      let { data } = await axios.get(api)
      console.log(data);
      setData(data.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  async function deletedUser(id) {
    try {
      await axios.delete(`${api}?id=${id}`)
      getUsers()
    } catch (error) {
      console.error(error);

    }
  }

  async function addUser(user: FormData) {
    try {
      let res = await axios.post(api, user)


      await getUsers()
    } catch (error) {
      console.log("ERROR:", error.response?.data || error)
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault()

    let newuser = new FormData()

    newuser.append("Name", e.currentTarget.name.value)
    newuser.append("Description", e.currentTarget.desc.value)

    for (let el of e.currentTarget.photo.files) {
      newuser.append("Images", el)
    }

    await addUser(newuser)
  }

  return (
    <div>
      {
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
        </div>

      }
      {
        data.map((user) => {
          return (
            <div key={user.id}>
              {user.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={user.name}
                  width="150"
                />
              ))}
              <h1>{user.name}</h1>
              <p>{user.isComplited ? "Active" : "Inactive"}</p>
              <div>
                <button onClick={() => deletedUser(user.id)}>Delete</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default App
