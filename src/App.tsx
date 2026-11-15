import { useEffect, useState } from 'react'
import axios from 'axios'


const Get = () => {
  const api = 'https://69b7cc98ffbcd02860963626.mockapi.io/data'
  const [data, setdata] = useState([])
  const [triger, settriger] = useState([true])

  async function getdata() {
    try {
      const { data } = await axios.get(api)
      setdata(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getdata()
  }, [triger])

  return (
    <div>
      <button onClick={() => settriger(prev => !prev)}>Click</button>
      {
        data.map((el) => {
          return <div>
            <h1>{el.name}</h1>
          </div>
        })
      }
    </div>
  )
}

export default Get