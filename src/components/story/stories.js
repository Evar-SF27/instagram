import React, { useEffect, useState } from 'react'
import Story from './story'
import Skeleton from 'react-loading-skeleton'
import { getFollowing, getPhotos } from '../../services/firebase'
import './styles/story.css'
import 'react-loading-skeleton/dist/skeleton.css'


const Stories = ({ user }) => {
  const [stories, setStories] = useState(null)

  useEffect(() => {
    const followingUsers = async () => {
      const profiles = await getFollowing(user.userId, user.following)
      setStories(profiles)
      const photos = await getPhotos(user.userId, user.following)
    }

    if (user?.userId) {
      followingUsers()
    } 
  }, [user.userId, user.following])
  
  return stories ? (
    <div className='story__main'>
      {stories.map((story) => (
        <Story username={story.username} key={story.userId}/>
      ))}
    </div>
  ) : (
    <Skeleton height={120} className='loading__skeleton'/>
  )
}

export default Stories