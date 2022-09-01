import React from 'react'
import useUser from '../../hooks/use-user'
import User from '../user/user'
import Suggestion from '../suggestion/suggestion'
import './styles/sidebar.css'

const SideBar = () => {
  const { user } = useUser()
  
  return (
    <div className='sidebar__main'>
      <User username={user.username} fullName={user.fullName}/>
      <Suggestion userId={user.userId} following={user.following}/>
    </div>
  )
}

export default SideBar
