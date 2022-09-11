import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const IsUserLoggedIn = ({ user, children }) => {
  return (
        <>
            { !user ? children : <Navigate to={{ pathname: ROUTES.DASHBOARD }} /> }   
        </>
    
  )
}

export default IsUserLoggedIn

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
}