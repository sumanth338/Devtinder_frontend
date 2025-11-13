import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const requests = useSelector((store)=>store.request)
    console.log()
    const dispatch = useDispatch()

    const reviewRequest = async (status, _id)=>{
        try{
            const res = await axios.post("http://localhost:3000/request/review/"+status+'/'+_id, {}, {withCredentials:true})
            console.log(res)
            dispatch(removeRequest(_id))
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchRequests = async ()=>{
        try{
            const res = await axios.get("http://localhost:3000/user/requests/received",{withCredentials:true})
            console.log("Requests data:", res.data.data)
            dispatch(addRequests(res.data.data))
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchRequests()
    },[])

    if (!requests || requests.length === 0) {
        return (
            <div className="min-h-screen py-8 px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Requests</h1>
                <div className="text-center text-gray-500">
                    <p>No requests found</p>
                </div>
            </div>
        )
    }

  return (
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Requests</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {requests.map((request) => {
          const user = request.fromUserId;
          return (
            <div 
              key={request._id}
              className="card w-80 bg-base-100 shadow-xl"
            >
              <figure className="px-6 pt-6">
                <img 
                  src={user.photoUrl || 'https://via.placeholder.com/200'} 
                  className="rounded-full w-32 h-32 object-cover"
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {user.about || 'No description available'}
                </p>
                <div className="card-actions justify-center mt-4 gap-2">
                  <button 
                    className="btn btn-error btn-sm text-white"
                    onClick={() => reviewRequest("rejected",request._id)}
                  >
                    Reject
                  </button>
                  <button 
                    className="btn btn-primary btn-sm text-white"
                    onClick={() => reviewRequest("accepted",request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests