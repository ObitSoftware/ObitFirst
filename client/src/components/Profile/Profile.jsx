import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {

    const {selectedClientId} = useParams()

  return (
    <div>
       <h1> id: {selectedClientId} </h1>
    </div>
  )
}

export default Profile
