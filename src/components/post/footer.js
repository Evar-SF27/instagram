import PropTypes from 'prop-types';

export default function Footer({ caption, username }) {
  return (
    <div className="footer">
      <span className="footer__name">{username}</span>
      <span className="footer__caption">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};