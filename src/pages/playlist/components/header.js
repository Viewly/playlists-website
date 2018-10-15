import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, author, tags, poster, description }) => (
  <div className='c-section'>
    <div className='o-wrapper'>
      <div className='o-grid o-grid--auto'>
        <div className='o-grid__cell u-margin-bottom'>
          {/* TODO - get URL from env or config */}
          <img src={`https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/${poster}`} />
        </div>
        <div className='o-grid__cell o-grid__cell--shrink'>
          <div className='c-section__intro'>
            <h2 className='c-section__title'>{title}</h2>
            <ul className='o-grid o-grid--auto'>
              <li className='o-grid__cell'>
                <dl>
                  <dt>Author</dt>
                  <dd>
                    <span className='o-flag o-flag--tiny'>
                      <span className='o-flag__img'>
                        <img className='o-avatar o-avatar--small' src="https://randomuser.me/api/portraits/men/43.jpg" alt="" />
                      </span>
                      <span className='o-flag__body'>
                        {author}
                      </span>
                    </span>
                  </dd>
                </dl>
              </li>
              <li className='o-grid__cell'>
                <dl>
                  <dt>Length</dt>
                  <dd>36:50m</dd>
                </dl>
              </li>
              <li className='o-grid__cell'>
                <dl>
                  <dt>Category</dt>
                  <dd>{tags[0]}</dd>
                </dl>
              </li>
            </ul>
            <p>{description}</p>
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
