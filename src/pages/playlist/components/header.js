import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, author, tags }) => (
  <div className='c-section'>
    <div className='o-wrapper'>
      <div className='o-grid o-grid--auto'>
        <div className='o-grid__cell u-margin-bottom'>
          <img className='test' src='https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/28272ad2-e6c1-5ae4-9e69-cc12abbc04d8_thumbnail.jpg' />
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
                  <dd>Music</dd>
                </dl>
              </li>
            </ul>
            <p>Created in collaboration with Digital DJ Tips, the following step-by-step TRAKTOR tutorials cover everything from getting TRAKTOR set up and how your music files are imported, to cueing, EQ, loops, and more.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.array
};

export default Header;
