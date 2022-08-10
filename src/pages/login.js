import React, { useEffect, useState } from 'react'
import '../styles/login.css'
import { useNavigate, Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import Footer from '../components/footer/footer'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase.prod'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const isInvalid = password === '' || email === ''

    const handleLogin = async (event) => {
      event.preventDefault()
      console.log(email)
      console.log(password)

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate(ROUTES.DASHBOARD)
      } catch (error) {
        setError(error.message)
        setEmail('')
        setPassword('')
      }
    }

    useEffect(() => {
        document.title = 'Login - Instagram'
    }, [])
    
    return (
      <>
        <div className="container">
          <div className="section-2">
            <div className="login">
              <h1 className="logo-container">
                <img src="/images/logo.png" alt="Instagram" className="logo" />
              </h1>

              {error && <p className="error-container">{error}</p>}

              <form onSubmit={handleLogin} method="POST">
                <input
                  aria-label="Enter your email address"
                  type="text"
                  placeholder="Email address"
                  className="login-input"
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
                />
                <input
                  aria-label="Enter your password"
                  type="password"
                  placeholder="Password"
                  className="login-input"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                />
                { isInvalid ? 
                  <>
                    <button
                      disabled={isInvalid}
                      type="submit"
                      className="submit_inactive"
                    >
                      Log In
                    </button>
                  </>
                  : 
                  <>
                    <button
                      disabled={isInvalid}
                      type="submit"
                      className="submit"
                    >
                      Log In
                    </button>
                  </>
                  }
                <p className="text-small">Forgot password?</p>
              </form>
            </div>
            <div className="account">
              <p className="text">
                Don't have an account?{` `}
                <Link to={ROUTES.SIGN_UP} className="text-bold">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="download">
              <p className="text">Get app.</p>
              <div className="download-logo-container">
                <img src="/images/app-store.png" className="download-logo" alt="app store" />
                <img src="/images/play-store.png" className="download-logo" alt="play store" />
              </div>
              
            </div>
          </div>
        </div>
        <Footer />
      </>
    
    )
}

export default Login


