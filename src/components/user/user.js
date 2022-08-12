import React from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import './styles/user.css'

const User = ({ username, fullname }) => 
  !username || !fullname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className='user__link'>
      <p>{username}</p>
    </Link>
  )


  


export default User

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
}
