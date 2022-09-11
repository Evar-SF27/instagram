import PropTypes from 'prop-types'
import './styles/post.css'

export default function Image({ imageSrc, caption }) {
  return <img 
            className='postImage' 
            src={imageSrc} 
            alt={caption}
        />
}

Image.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}