import React from 'react'

const UserCard = ({user}) => {
    console.log(user)
    const {firstName, lastName, email, photoUrl, about, skills, gender, age} = user;
    
  return (
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
          <button className="btn btn-error text-white">Ignored</button>
          <button className="btn btn-primary text-white">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard