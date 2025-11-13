import axios from 'axios'
import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector((store)=>store.connection)
    
    useEffect(()=>{
        const fetchConnections = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/user/connections",{withCredentials:true})
                console.log(res.data.data)
                dispatch(addConnections(res.data.data))
            }
            catch(err){
                console.log(err)
            }
        }
        fetchConnections()
    },[dispatch])
    if (connections.length === 0) return <h1>No connection found</h1>

  return (
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Connections</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((connection) => {
          return (
            <div 
              key={connection.toUserId._id}
              className="card w-80 bg-base-100 shadow-xl"
            >
              <figure className="px-6 pt-6">
                <img 
                  src={connection.toUserId.photoUrl || 'https://via.placeholder.com/200'} 
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {connection.toUserId.firstName} {connection.toUserId.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {connection.toUserId.about || 'No description available'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Connections