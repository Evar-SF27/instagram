import React, { useRef } from 'react'
import Header from './header'
import PropTypes from 'prop-types'
import './styles/post.css'
import Image from './image'
import Actions from './actions'
import Footer from './footer'
import Comments from './comments'

const Post = ({ content }) => {
const commentInput = useRef(null)
const handleFocus = () => commentInput.current.focus()

  return (
    <div className='post'>
      <Header username={content.username} />
      <Image 
        imageSrc={content.imageSrc} 
        caption={content.caption} 
      />
      <Actions 
        docId={content.docId} 
        totalLikes={content.likes.length} 
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer
        username={content.username}
        caption={content.caption}
      />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  )
}

export default Post

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
}
