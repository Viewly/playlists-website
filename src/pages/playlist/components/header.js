import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = ({ title, author, duration, tags, poster, description }) => (
  <div className='c-section'>
    <div className='o-wrapper'>
      <div className='o-grid o-grid--middle'>
        <div className='o-grid__cell u-margin-bottom u-margin-bottom-none@large u-2/5@large u-align-self-flex-start'>
          {/* TODO - get URL from env or config */}
          <img className='c-section__thumbnail' src={`https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/${poster}`} />
        </div>
        <div className='o-grid__cell u-3/5@large'>
          <div className='c-section__intro'>
            <h2 className='c-section__title'>{title}</h2>
            <ul className='o-grid o-grid--auto'>
              <li className='o-grid__cell u-margin-bottom'>
                <dl>
                  <dt>Author</dt>
                  <dd>
                    <Link to={`/profile/${author}`}>{author}</Link>
                  </dd>
                </dl>
              </li>
              <li className='o-grid__cell u-margin-bottom'>
                <dl>
                  <dt>Length</dt>
                  <dd>{duration}</dd>
                </dl>
              </li>
              <li className='o-grid__cell u-margin-bottom'>
                <dl>
                  <dt>Category</dt>
                  <dd>{tags[0]}</dd>
                </dl>
              </li>
            </ul>
            <div className='c-section__description'>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  poster: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array
};

export default Header;
