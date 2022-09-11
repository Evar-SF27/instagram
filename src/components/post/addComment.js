import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../lib/firebase.prod'
import { updateDoc, arrayUnion, doc, collection } from 'firebase/firestore';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment('');
    const photoCollection = collection(db, 'photos')
    const photo = doc(photoCollection, docId)

    return updateDoc(photo, {
        comments: arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="add__comment">
      <form
        className="add__comment__form"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="add__comment__input"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`add__comment__btn ${!comment && 'opacity'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};