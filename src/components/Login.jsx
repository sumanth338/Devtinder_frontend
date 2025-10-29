import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [emailId, setEmail] = useState("sumanth@gmail.com")
  const [password, setPassword] = useState("Sumanth@123")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleLogin = async () => {
  
    try{
      const res = await axios.post("http://localhost:3000/login", {
        email: emailId, password  
      },{
        withCredentials:true
      })
      console.log(res.data)
      dispatch(addUser(res.data))
      // TODO: Handle successful login (store token, redirect, etc.)
      return navigate('/')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-base-200 pt-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Login</h2>
          
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input 
              type="email" 
              className="input input-bordered w-full" 
              placeholder="Enter your email" 
              value = {emailId}
              onChange = {(e)=> setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input 
              type="password" 
              className="input input-bordered w-full" 
              placeholder="Enter your password" 
              value = {password}
              onChange = {(e)=> setPassword(e.target.value)}
            />
          </div>
          
          <div className="card-actions justify-center">
            <button className="btn btn-primary w-full" onClick = {handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login