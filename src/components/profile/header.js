import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile } from '../../services/firebase'
import 'react-loading-skeleton/dist/skeleton.css';

export default function Header({ 
    photosCount, 
    profile: { docId: profileDocId, userId: profileuserId, fullname, following = [] }, 
    followerCount, 
    setFollowerCount 
}) {
    const { user } = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState()

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileuserId)
            setIsFollowingProfile(isFollowing)
        }

        if (user.username && profileuserId) {
            isLoggedInUserFollowingProfile()
        }
    }, [user.username, profileuserId])

    return (
        <div>
        This is the Header
        </div>
    )
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired
    }).isRequired
}


