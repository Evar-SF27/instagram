import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './styles/suggestion.css'
import { Link } from 'react-router-dom'
import { followedByUser, followingUser } from '../../services/firebase'

const Suggested = ({ userDocId, profileId, userId, username, fullName }) => {
  const [followed, setFollowed] = useState(false)

  async function handleFollowUser() {
    setFollowed(true)

    await followingUser(userId, profileId, false)
    await followedByUser(userId, profileId, false)
  }
  

  return !followed ? (
    <div className='suggestion__each'>
        <img className='suggestion__avatar' src={`/images/avatars/${username}.jpg`} alt='profile pic'/>
        <div>
          <Link to={`/p/${username}`}><p className='suggestion__text-bold'>{username}</p></Link>
          <p className='suggestion__text-sm'>{fullName}</p>
        </div>
        <div className='suggestion__btn'>
          <button onClick={handleFollowUser} type='button' className='follow__btn'>Follow</button>
        </div>
    </div>
  ) : null
}

export default Suggested

Suggested.propTypes = {
    userId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userDocId: PropTypes.string.isRequired
  }
