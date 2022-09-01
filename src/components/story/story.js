import React from 'react'
import { Link } from 'react-router-dom'
import './styles/story.css'

const Story = ({ username }) => {
  return (
    <Link to={`/p/${username}`} className='story'>
    <img className='story__avatar' src={`/images/avatars/${username}.jpg`} alt='profile pic' />
    <p className='story__text'>{username}</p>
    </Link>
  )
}

export default Story
