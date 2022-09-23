import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { followUser, isUserFollowingProfile } from '../../services/firebase'
import 'react-loading-skeleton/dist/skeleton.css';
import './styles/profile.css'

export default function Header({ 
    photosCount, 
    profile: { docId: profileDocId, userId: profileUserId, fullName: profileFullName, username: profileUserName, followers = [], following = [] }, 
    followerCount, 
    setFollowerCount 
}) {
    const { user } = useUser()
    const [isFollowingProfile, setIsFollowingProfile] = useState()
    const activeBtnFollow = user.username && user.username !== profileUserName

    const handleToggleFollow =  async () => {
        await followUser(isFollowingProfile, user.docId, profileDocId, user.userId, profileUserId)
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)
        setFollowerCount({
            followerCount: isFollowingProfile ? Number(followerCount - 1) : Number(followerCount + 1)
        })
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId)
            setIsFollowingProfile(isFollowing)
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile()
        }
    }, [user.username, profileUserId])

    return (
        <>
            <div className='profile__header'>
                <div className='profile__innerHeader'>
                    {!profileUserName ? (
                        <Skeleton count={1} height={70} />
                    ) : (
                        <img 
                            src={`/images/avatars/${profileUserName}.jpg`} 
                            alt={`${profileUserName} profile pic`} 
                            className='profile__headerAvatar' 
                        />
                    )}
                    {!profileUserName ? (
                            <>
                                <Skeleton count={1} height={20} />
                                <Skeleton count={1} height={20} />
                                <Skeleton count={1} height={40} />
                                <Skeleton count={3} height={10} />
                            </>
                        ) : (
                            <div className='profile__info'>
                                <div className='profile__containerOne'>
                                    <div className='profile__innercontainerOne'>
                                        <p className='profile__username'>{profileUserName}</p>
                                        <p className='optionsOne'>{ activeBtnFollow ? <MoreHorizIcon /> : < SettingsIcon fontSize='small'/> }</p>
                                    </div>
                                    <div className='profile__containerTwo'>
                                        {!activeBtnFollow ? (
                                            <button 
                                                className='btn profile__btnNrml'
                                                type='button'
                                            >
                                            Edit Profile
                                        </button>
                                        ) : (
                                            <>
                                                { isFollowingProfile && <button className='btn profile__btnNrml' type='button'>
                                                    Message
                                                </button> }
                                                {isFollowingProfile ? (
                                                    <button 
                                                        className='btn profile__unfollowBtn'
                                                        type='button'
                                                        onClick={handleToggleFollow}
                                                        onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                            handleToggleFollow();
                                                            }
                                                        }}
                                                    >
                                                        <PersonIcon fontSize='small'/>
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className='btn profile__followBtn'
                                                        type='button'
                                                        onClick={handleToggleFollow}
                                                        onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                            handleToggleFollow();
                                                            }
                                                        }}
                                                    >
                                                        Follow
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <p className='optionsTwo'>{ activeBtnFollow ? <MoreHorizIcon /> : < SettingsIcon /> }</p>
                                </div>
                                <div className='profile__containerThree'>
                                    <div>
                                        <p className='profile__text_bold'>{photosCount}</p>
                                        <p className='profile__text_sm'>posts</p>
                                    </div>
                                    <div>
                                        <p className='profile__text_bold'>{followerCount}</p>
                                        <p className='profile__text_sm'>{followerCount === 1 ? `follower` : `followers`}</p>
                                    </div>
                                    <div>
                                        <p className='profile__text_bold'>{following.length}</p>
                                        <p className='profile__text_sm'>following</p>
                                    </div>
                                </div>
                                <div className='profile__containerFour'>
                                    <p className='profile__fullname'>{profileFullName}</p>
                                    <p className='profile__bio'>Your bio goes in here...</p>
                                    <div className='profile__followDetails'>
                                        <p className='text__sm'>Followed by <span className='text__bold'>user_one, user_two, user_three</span> +83 more</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    
                </div>
                <div className='profile__description'>
                    <p className='profile__fullname'>{profileFullName}</p>
                    <p className='profile__bio'>Your bio goes in here...</p>
                    <div className='profile__followDetails'>
                        <p className='text__sm'>Followed by <span className='text__bold'>user_one, user_two, user_three</span> +83 more</p>
                    </div>
                </div>
            </div>
            <div className='profile__count'>
                <div>
                    <p className='profile__text_bold'>{photosCount}</p>
                    <p className='profile__text_sm'>posts</p>
                </div>
                <div>
                    <p className='profile__text_bold'>{followerCount}</p>
                    <p className='profile__text_sm'>{followerCount === 1 ? `follower` : `followers`}</p>
                </div>
                <div>
                    <p className='profile__text_bold'>{following.length}</p>
                    <p className='profile__text_sm'>following</p>
                </div>
            </div>
        </>
        
    )
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        profileUserName: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired,
        followers: PropTypes.array.isRequired,
    }).isRequired
}


