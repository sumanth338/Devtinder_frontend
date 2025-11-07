import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import {useEffect} from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fetchUser = async () =>{
  try{
      const res = await axios.get("http://localhost:3000/profile",{withCredentials:true})
      dispatch(addUser(res.data))
    }
  catch(err){
    if(err.status === 401){
     navigate('/login')
    }
    console.log(err)
  }
}

  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}

export default Home