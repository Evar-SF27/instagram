import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import './styles/user.css'

const User = ({ username, fullname }) => 
  !username || !fullname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className='user__link'>
      <img 
        className='user__avatar'
        src={`/images/avatars/${username}.jpg`}
        alt='User avatar'
      />
      <div className='user__text'>
        <p className='text__bold'>{username}</p>
        <p className='text__sm'>{fullname}</p>
      </div>
    </Link>
  )


  


export default memo(User)

User.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired
}

User.whyDidYouRender = true
