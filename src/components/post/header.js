import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import './styles/post.css'

export default function Header({ username }) {
  return (
    <div className="postHeader">
      <Link to={`/p/${username}`} className='postHeader__link'>
        <img 
            className='postHeader__avatar' 
            src={`/images/avatars/${username}.jpg`} 
            alt={`${username} profile`}
        />
        <p className="postHeader__username">{username}</p>
      </Link>
    </div>
  )
}

Header.propTypes = {
    username: PropTypes.string.isRequired
}

