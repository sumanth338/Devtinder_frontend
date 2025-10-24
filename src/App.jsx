import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./Navbar"
import Home from './Home'
import Profile from './Profile'
import Login from './Login'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} >
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
