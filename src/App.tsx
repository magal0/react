import { createBrowserRouter, Router, RouterProvider } from "react-router";
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
  let router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<Home/>,
        },
        {
          path:"/about",
          element:<About/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
