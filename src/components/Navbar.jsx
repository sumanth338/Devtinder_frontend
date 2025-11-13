import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { useDispatch } from 'react-redux'
const Navbar = () => {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const handleLogout = async ()=>{
      try{
        await axios.post("http://localhost:3000/logout",{}, {withCredentials:true})
        dispatch(removeUser())
        return navigate('/login')
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻 Devtinder</Link>
  </div>
  <div className="flex gap-2 items-center">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    {user && <p className="mx-2">Welcome,{user.firstName}</p>}
    <div className="dropdown dropdown-end mx-5">
    {user && (
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={user.photoUrl} />
          </div>
        </div>
    )}
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar