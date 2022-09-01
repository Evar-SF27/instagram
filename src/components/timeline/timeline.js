import React from 'react'
import Feed from '../feed/feed'
import './styles/timeline.css'
import useUser from '../../hooks/use-user'
import Stories from '../story/stories'

const TimeLine = () => {
  const { user } = useUser()
  return (
    <div className='timeline__main'>
      <Stories user={user}/>
      <Feed user={user}/>
    </div>
  )
}

export default TimeLine
