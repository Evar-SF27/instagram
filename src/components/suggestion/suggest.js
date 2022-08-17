import React from 'react'
import PropTypes from 'prop-types'
import './styles/suggestion.css'

const Suggested = ({ userId, username, fullName }) => {
  return (
    <div id={userId} className='suggestion__each'>
        <img className='suggestion__avatar' src={`/images/avatars/${username}.jpg`} alt='profile pic'/>
        <div>
            <p className='suggestion__text-bold'>{username}</p>
            <p className='suggestion__text-sm'>{fullName}</p>
        </div>
        <div className='suggestion__btn'>
            <button type='button' className='follow__btn'>Follow</button>
        </div>
    </div>
  )
}

export default Suggested

Suggested.propTypes = {
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string
  }
