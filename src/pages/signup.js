import React, { useEffect, useState } from 'react'
import '../styles/signup.css'
import { useNavigate, Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import Footer from '../components/footer/footer'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db, auth } from '../lib/firebase.prod'
import { addDoc, collection } from 'firebase/firestore'
import { doesUsernameExist } from '../services/firebase'


const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const isInvalid = password === '' || email === ''

    const handleSignUp = async (event) => {
        event.preventDefault()
        console.log('userexists', doesUsernameExist(userName))

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user.user)
            updateProfile(user.user, { displayName: userName})
            await addDoc(collection(db, 'users'), {
                userId: user.user.uid,
                username: userName.toLowerCase(),
                fullname: fullName.toLowerCase(),
                emailAddress: email.toLowerCase(),
                following: [],
                dateCreated: Date.now()
            })
            navigate(ROUTES.DASHBOARD)
                  
        } catch (error) {
            setError(error.message)
            setUserName('')
            setEmail('')
            setFullName('')
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

              <form onSubmit={handleSignUp} method="POST">
                <h2 className="title">Sign up to see photos and videos from your friends.</h2>
                <input
                  aria-label="Enter your User Name"
                  type="text"
                  placeholder="User Name"
                  className="login-input"
                  onChange={({ target }) => setUserName(target.value)}
                  value={userName}
                />
                <input
                  aria-label="Enter your Full Names"
                  type="text"
                  placeholder="Full Name"
                  className="login-input"
                  onChange={({ target }) => setFullName(target.value)}
                  value={fullName}
                />
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
                <p className='info-text'>
                    People who use our service may have uploaded your contact information to Instagram.
                    <span> Learn More</span>
                </p>
                <p className='info-text'>
                    By signing up, you agree to our 
                    <span> Terms, Data Policy</span> and <span>Cookies Policy</span>
                </p>
                { isInvalid ? 
                  <>
                    <button
                      disabled={isInvalid}
                      type="submit"
                      className="submit_inactive"
                    >
                      Sign Up
                    </button>
                  </>
                  : 
                  <>
                    <button
                      disabled={isInvalid}
                      type="submit"
                      className="submit"
                    >
                      Sign Up
                    </button>
                  </>
                  }
                <p className="text-small">Forgot password?</p>
              </form>
            </div>
            <div className="account">
              <p className="text">
                Have an account?{` `}
                <Link to={ROUTES.LOGIN} className="text-bold">
                  Log in
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

export default SignUp