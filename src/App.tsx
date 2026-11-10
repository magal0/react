import React, { useState } from "react";

import Table from "./Components/Table";

const App = () => {

  let [data, setData] = useState([{ id: 1, name: "ali", age: 12 }, { id: 2, name: "Vali", age: 13 }])
  let [modalAdd, setmodalAdd] = useState(false)

  let DeleteData = (id) => {
    setData(data.filter((e) => e.id != id))
  }

  let handleSubmit=(e:any)=>{
    e.preventDefault()
    let newUser={
      id:Date.now(),
      name:e.target["name"].value,
      age:e.target["age"].value
    }
    // setData(...data,newUser)
    setData((prev)=>[...prev,newUser])
    setmodalAdd(false)
  }
  return (
    <div style={{ margin: 0 }}>

      <div>
        {
          modalAdd ? <div style={{ background:"rgba(214,214,215,0.5)", height: "98vh", position: "absolute",top:"0", width: "99%" }}>
            <div style={{width:"350px",background:"white",borderRadius:"10px",margin:"auto",marginTop:"200px"}}>
              <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:20,gap:"15px"}} action="">
                <input name="name" style={{width:"90%",padding:"10px",border:"1px solid black",borderRadius:"5px",outline:"none"}} type="text" placeholder="Name" />
                <input name="age" style={{width:"90%",padding:"10px",border:"1px solid black",borderRadius:"5px",outline:"none"}} type="text" placeholder="Age" />
                <div style={{width:"90%",display:"flex",justifyContent:"end",gap:"20px"}}>
                <button type="submit" style={{cursor:"pointer",padding:"10px 20px",border:"1px solid navy",borderRadius:"5px",outline:"none",background:"navy",color:"white"}}>add</button>
                <button onClick={()=>setmodalAdd(false)} style={{cursor:"pointer",padding:"10px 20px",border:"1px solid red",borderRadius:"5px",outline:"none",background:"red",color:"white"}}>cancel</button>
                </div>
              </form>
            </div>
          </div> : null
        }
      </div>
      <button onClick={() => setmodalAdd(true)}>open add</button>

      <Table data={data} DeleteData={DeleteData} />

    </div>
  )
}

export default App
