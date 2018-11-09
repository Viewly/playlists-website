import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { THUMBNAIL_ROOT } from "../../../constants";

const Header = ({ title, author, duration, category, poster, description, hashtags }) => (
  <div className='c-section'>
    <div className='o-wrapper'>
      <div className='o-grid o-grid--middle'>
        <div className='o-grid__cell u-margin-bottom u-margin-bottom-none@large u-2/5@large u-align-self-flex-start'>
          <img className='c-section__thumbnail' src={`${THUMBNAIL_ROOT}/${poster}`} />
        </div>
        <div className='o-grid__cell u-3/5@large'>
          <div className='c-section__intro'>
            <h1 className='c-section__title'>{title}</h1>
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
                  <dd><Link to={`/category/${category.slug}`}>{category.name}</Link></dd>
                </dl>
              </li>
            </ul>
            <div>
              {hashtags.map((item, idx) => (
                <Link key={`hash-${idx}`} to={`/search/?query=${encodeURIComponent(item)}`}>{item}</Link>
              ))}
            </div>
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
  category: PropTypes.object.isRequired
};

export default Header;
