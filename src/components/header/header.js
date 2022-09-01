import React, { useContext } from 'react'
import { auth } from '../../lib/firebase.prod'
import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user'
import * as ROUTES from '../../constants/routes'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import './styles/header.css'

const Header = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate

  const SignOut =  async () => {
    signOut(auth)
  }

  return (
    <header>
      <div className='container'>
        <div className='header__icon'>
          <Link to={ROUTES.DASHBOARD} aria-label='Instagram logo'>
            <img src='/images/logo.png' alt='Instagram' className='header__logo' />
          </Link>
        </div>
        <div className='header__panel'>
          { user ? (
            <>
              <button
                type='button'
                className='header__btn'
                onClick={() => { navigate(ROUTES.DASHBOARD) }}
              >
                <HomeIcon className='btn__icon'/>
              </button>
              <button
                type='button'
                className='header__btn'
                onClick={() => { navigate(ROUTES.DASHBOARD) }}
              >
                <AddBoxOutlinedIcon />
              </button>
              <button
                type='button'
                className='header__btn'
                onClick={() => { navigate(ROUTES.DASHBOARD) }}
              >
                <ExploreOutlinedIcon />
              </button>
              <button
                type='button'
                className='header__btn'
                onClick={() => { navigate(ROUTES.DASHBOARD) }}
              >
                <FavoriteBorderOutlinedIcon />
              </button>
              <button
                type='button'
                className='header__btn'
                onClick={SignOut}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    SignOut()
                  }
                }}
              >
                <LogoutOutlinedIcon />
              </button>
              <div className='avatar'>
                <Link to={`/p/${user.displayName}`}>
                  <img 
                    className='header__avatar' 
                    src={`/images/avatars/${user.displayName}.jpg`}
                    alt='profile-avatar'
                  />
                </Link>
              </div>

            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <button className='login__btn'>
                  Log In
                </button>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <button className='signup__btn'>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
