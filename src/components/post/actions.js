import { useState, useContext } from 'react'
import { collection, doc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase.prod'
import PropTypes from 'prop-types'
import UserContext from '../../context/user'

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
    const { user: { uid: userId = ''}} = useContext(UserContext)
    const [toggleLiked, setToggleLiked] = useState(likedPhoto)
    const [likes, setLikes] = useState(totalLikes)

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked)

        const photoCollection = collection(db, 'photos')
        const photo = doc(photoCollection, docId)
  
        await updateDoc(photo, {
            likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId)
        })

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }

    return (
        <>
            <div className='actions__panel'>
                <svg
                    onClick={handleToggleLiked}
                    onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleToggleLiked();
                    }
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={0}
                    className={`${
                    toggleLiked ? 'fill-red action__icon' : 'action__icon'
                    }`}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                <svg
                    onClick={handleFocus}
                    onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleFocus();
                    }
                    }}
                    className="action__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={0}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </div>
            <div className="actions__count">
                <p className="actions__text">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
            </div>
        </>
    )
}

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}
