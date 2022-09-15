import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import { getUserPhotosByUsername } from '../../services/firebase'
import Profile from '../../pages/profile'
import Photos from './photos'

const UserProfile = ({ user }) => {

    const reducer = (state, newState) => ({ ...state, ...newState })
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }
    const [{ profile, photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)
    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUsername(user.username)
            dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length })
        }

        if (user.username) getProfileInfoAndPhotos()
    }, [user])

    return (
        <>
            <Header 
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount} 
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection}/>
        </>
    )
}

export default UserProfile

Profile.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired,
        followers: PropTypes.array.isRequired  
    }).isRequired
}
