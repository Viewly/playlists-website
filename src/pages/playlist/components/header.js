import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { THUMBNAIL_ROOT } from "../../../constants";

const Header = ({ title, author, duration, category, poster, description, hashtags, playFirstVideo, views }) => (
  <div className='c-section'>
    <div className='o-wrapper'>
      <div className='o-grid o-grid--middle'>
        <div className='o-grid__cell u-margin-bottom u-margin-bottom-none@large u-2/5@large u-align-self-flex-start'>
          <div className='c-section__thumbnail'>
            {poster
              ? <img className='c-section__thumbnail__img' src={`${THUMBNAIL_ROOT}/${poster}`} />
              : <img className='c-section__thumbnail__img' src={require("../../../images/playlist-thumbnail-default.jpg")} />
            }

            <button className='c-btn c-btn--with-icon c-section__thumbnail__btn' onClick={playFirstVideo}>
              <svg className='o-icon o-icon--small u-margin-right-tiny' width='16' height='22' viewBox='0 0 16 22' xmlns='http://www.w3.org/2000/svg'>
                <path d='M14.837 11.818L1.575 21.142A1 1 0 0 1 0 20.324V1.676A1 1 0 0 1 1.575.858l13.262 9.324a1 1 0 0 1 0 1.636z' fill='currentColor' fillRule='evenodd'/>
              </svg>
              Play all
            </button>
          </div>
        </div>
        <div className='o-grid__cell u-3/5@large'>
          <div className='c-section__intro'>
            <h1 className='c-section__title'>{title}</h1>
            <ul className='o-grid o-grid--auto'>
              <li className='o-grid__cell u-margin-bottom'>
                <dl>
                  <dt>Author</dt>
                  <dd>
                    <Link to={`/profile/${author?.alias}`}>{author?.alias ? author?.alias : `${author?.first_name} ${author?.last_name}`}</Link>
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
              {views > 10 && (
                <li className='o-grid__cell u-margin-bottom'>
                  <dl>
                    <dt>Views today</dt>
                    <dd>{views}</dd>
                  </dl>
                </li>
              )}
            </ul>
            <div className='c-section__description'>
              <p>{description}</p>
            </div>
            <div className='c-section__hashtags'>
              {hashtags.map((item, idx) => (
                <Link key={`hash-${idx}`} to={`/search/?query=${encodeURIComponent(item)}`}>{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.object,
  duration: PropTypes.string.isRequired,
  hashtags: PropTypes.array,
  poster: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.object.isRequired
};

export default Header;
