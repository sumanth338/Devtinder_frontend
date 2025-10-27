import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'


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
