import { Link, Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
       <Outlet/>
    </div>
  )
}

export default Layout
