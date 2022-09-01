import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { getSuggestedProfiles } from '../../services/firebase'
import Suggested from './suggest'
import './styles/suggestion.css'

const Suggestion = ({ userId, following }) => {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(userId, following)
      setProfiles(response)
    }

    if (userId) {
      suggestedProfiles()
    }
  }, [userId, following])

  return !profiles ? (
    <>
      <Skeleton height={50} className='suggestion__skeleton' />
      <Skeleton height={150} count={2} className='suggestion__skeleton' />
    </>
  ) : profiles.length > 0 ? (
    <div className='suggestion__box'>
      <div className='suggestion__panel'>
        <p className='suggestion__title'>Suggestions for you</p>
        {profiles.map((user) => {
          return (
            <Suggested 
              key={user.docId}
              userId = {userId}
              username = {user.username}
              fullName = {user.fullName}
              userDocId = {user.docId}
              profileId = {user.userId}
            />
          )
        })}
      </div>
    </div>
  ) : ( null )
}

export default Suggestion

Suggestion.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array
}