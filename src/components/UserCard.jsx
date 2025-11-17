import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useDispatch();

  if (!user) {
    return <div>No user present</div>
  }
  console.log(user)
  const {_id,firstName, lastName, email, photoUrl, about, skills, gender, age} = user;

  const handleRequest = async (status, userId)=>{
    try{
      await axios.post('http://localhost:3000/request/send/'+ status +'/' +userId,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId))
      if (status === 'interested') {
        setToastMessage('Request sent successfully');
      } else if (status === 'ignored') {
        setToastMessage('Request ignored');
      }
      setTimeout(() => {
        navigate(0); // refresh the current page after showing toast briefly
      }, 1000);
    }
    catch(err){
      console.log(err)
    }
  }
    
  return (
    <>
    {toastMessage && (
      <div className="toast toast-top toast-end">
        <div className="alert alert-info">
          <span>{toastMessage}</span>
        </div>
      </div>
    )}
    <div className="card bg-base-300 w-70 shadow-xl">
      <figure>
        <img
          src={photoUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p className="text-sm text-gray-600">{email}</p>
        {age && (
          <p className="text-sm text-gray-500">Age: {age}</p>
        )}
        {about && (
          <p className="text-sm">{about}</p>
        )}
        {skills &&  (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge badge-primary badge-sm">{skill}</span>
            ))}
          </div>
        )}
        {gender && (
          <div className="flex flex-wrap gap-2 mt-2">
              <span className="badge badge-secondary badge-sm">{gender}</span>
          </div>
        )}
        <div className="card-actions justify-center mt-4 gap-4">
          <button className="btn btn-error text-white" onClick={()=>{handleRequest("ignored",_id)}}>Ignored</button>
          <button className="btn btn-primary text-white" onClick={()=>{handleRequest("interested",_id)}}>Interested</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserCard