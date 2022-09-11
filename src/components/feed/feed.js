import React from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../../hooks/use-photos'
import Post from '../post'
import 'react-loading-skeleton/dist/skeleton.css'
import './styles/feed.css'

const Feed = () => {
  const { photos } = usePhotos()

  return !photos ? (
      <Skeleton count={4} height={400} />
  ) : photos?.length > 0 ? (
    photos.map((content) => <p key={content.docId}><Post key={content.docId} content={content}/></p>)
  ) : (
    <p className='text__sm'> Follow more people to see photos</p>
  )
}

export default Feed