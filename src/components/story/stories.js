import React, { useEffect, useState } from 'react'
import Story from './story'
import Skeleton from 'react-loading-skeleton'
import { getFollowing } from '../../services/firebase'
import './styles/story.css'
import 'react-loading-skeleton/dist/skeleton.css'


const Stories = ({ user }) => {
  const [stories, setStories] = useState(null)

  useEffect(() => {
    const followingUsers = async () => {
      const profiles = await getFollowing(user.userId, user.following)
      setStories(profiles)
    }

    if (user?.userId) {
      followingUsers()
    } 
  }, [user.userId, user.following])
  
  return stories ? (
    <div className='story__main'>
      {stories.map((story) => (
        <Story username={story.username} />
      ))}
    </div>
  ) : (
    <Skeleton height={120} className='loading__skeleton'/>
  )
}

export default Stories