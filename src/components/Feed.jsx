import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'
const Feed = () => {
  const feed  = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  const getFeed = async () =>{
    try{
      if(feed) return;
      const res = await axios.get("http://localhost:3000/user/feed",{withCredentials:true})
      dispatch(addFeed(res.data))
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getFeed()
  },[])
  return (
  feed && (
    <div className="flex justify-center my-10">
        <UserCard user={feed.data[0]} />
    </div>
  )
)
}

export default Feed