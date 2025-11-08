import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const dispatch = useDispatch()
    const [toast, setToast] = useState(false)

    const saveProfile = async ()=>{
        try{
          const res =  await axios.patch('http://localhost:3000/profile/edit',{firstName,lastName,age,gender,about,photoUrl},{withCredentials:true})
          dispatch(addUser(res?.data?.data))
            setToast(true)
            setTimeout(()=>{
                setToast(false)
            },3000)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <>
    <div className="bg-base-200 py-10 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Edit Profile Card - More Compact */}
          <div className="w-full lg:w-1/2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-6">
                <h2 className="card-title text-xl mb-3">Edit Profile</h2>
                
                <div className="space-y-3">
                  {/* Photo URL */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text text-sm">Photo URL</span>
                    </label>
                    <input 
                      type="text" 
                      value={photoUrl}
                      className="input input-bordered input-sm w-full" 
                      onChange = {(e)=>{setPhotoUrl(e.target.value)}}
                    />
                  </div>

                  {/* First Name and Last Name in a row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-sm">First Name</span>
                      </label>
                      <input 
                        type="text" 
                        value={firstName}
                        className="input input-bordered input-sm w-full" 
                        onChange = {(e)=>{setFirstName(e.target.value)}}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-sm">Last Name</span>
                      </label>
                      <input 
                        type="text" 
                        value={lastName} 
                        className="input input-bordered input-sm w-full" 
                        onChange = {(e)=>{setLastName(e.target.value)}}
                      />
                    </div>
                  </div>

                  {/* Age and Gender in a row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-sm">Age</span>
                      </label>
                      <input 
                        type="text" 
                        value={age}
                        className="input input-bordered input-sm w-full" 
                        onChange = {(e)=>{setAge(e.target.value)}}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-sm">Gender</span>
                      </label>
                      <input 
                        type="text" 
                        value={gender}
                        className="input input-bordered input-sm w-full" 
                        onChange = {(e)=>{setGender(e.target.value)}}
                      />
                    </div>
                  </div>

                  {/* About */}
                  <div className="form-control">
                    <label className="label py-1">
                      <span className="label-text text-sm">About</span>
                    </label>
                    <input 
                      type="text" 
                      value={about}
                      className="input input-bordered input-sm w-full" 
                      onChange = {(e)=>{setAbout(e.target.value)}}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-control mt-4">
                    <button className="btn btn-primary btn-sm text-white" onClick={saveProfile}>Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UserCard Preview */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
          </div>
        </div>
      </div>
    </div>
    {toast &&
    <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved sucessfully</span>
  </div>
</div>
}
    </>
  )
}

export default EditProfile