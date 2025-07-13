import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const state = useSelector((state)=>state.user.value)   //1rer stete c'est le store || state.user.value c'est la partie de donnée du slice user
    const {name,email,role} = state;
  
    return (
    <div>
      <div>Name :{name}</div>
      <div>Email :{email}</div>
      <div>Role :{role}</div>
    </div>
  )
}

export default Profile
