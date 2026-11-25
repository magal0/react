
import { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Home() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const api = "https://to-dos-api.softclub.tj/api/to-dos";
  const imgapi = "https://to-dos-api.softclub.tj/images/";

  async function getTodos() {
    try {
      setLoading(true);

      const { data } = await axios.get(api);
      setData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    setEditId(null);
    setName("");
    setDescription("");
    setImages([]);
    setOpenAdd(true);
  }

  function handleEdit(todo) {
    setEditId(todo.id);
    setName(todo.name);
    setDescription(todo.description);
    setOpenEdit(true);
  }

  async function saveTodo(e) {
    e.preventDefault();

    try {
      if (editId !== null) {
        await axios.put(api, {
          id: editId,
          name: name,
          description: description,
        });

        setOpenEdit(false);
      } else {
        const formData = new FormData();

        formData.append("Name", name);
        formData.append("Description", description);

        images.forEach((image) => {
          formData.append("Images", image);
        });

        await axios.post(api, formData);

        setOpenAdd(false);
      }

      setName("");
      setDescription("");
      setImages([]);
      setEditId(null);

      getTodos();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${api}?id=${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Users</h1>

          <Button onClick={handleAdd}>
            + Add User
          </Button>
        </div>

        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
            </DialogHeader>

            <form onSubmit={saveTodo} className="flex flex-col gap-3">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setImages(Array.from(e.target.files || []))
                }
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenAdd(false)}
                >
                  Cancel
                </Button>

                <Button type="submit">
                  Add
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>

            <form onSubmit={saveTodo} className="flex flex-col gap-3">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenEdit(false)}
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

        {loading ? (
          <p className="py-10 text-center text-gray-500">Loading tasks...</p>
        ) : data.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold">No user found</h2>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((user) => (
              <Card key={user.id} className="overflow-hidden bg-white">

                {user.images?.map((image) => (
                  <img
                    src={imgapi + image.imageName}
                    className="h-48 w-full object-cover"
                  />
                ))}

                <CardContent className="space-y-4 p-5">
                  <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="mt-2 text-sm text-gray-500">{user.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1" onClick={() => handleEdit(user)}>Edit</Button>

                    <Button variant="destructive" className="flex-1" onClick={() => deleteTodo(user.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;



