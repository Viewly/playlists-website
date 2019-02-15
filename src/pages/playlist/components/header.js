import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { THUMBNAIL_ROOT } from "../../../constants";

const DESCRIPTION_SHOW_MORE_HEIGHT = 200;

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.object,
    duration: PropTypes.string.isRequired,
    hashtags: PropTypes.array,
    poster: PropTypes.string,
    description: PropTypes.string,
    mustPurchase: PropTypes.bool,
    playVideoLabel: PropTypes.string,
    playVideo: PropTypes.func,
    category: PropTypes.object.isRequired
  };

  state = {
    tooLong: false
  }

  componentDidMount() {
    if (this.descriptionDiv.clientHeight > DESCRIPTION_SHOW_MORE_HEIGHT) {
      this.setState({ tooLong: true });
    }
  }

  render() {
    const { title, author, duration, category, poster, description, hashtags, playVideo, playVideoLabel, views, mustPurchase } = this.props;

    return (
      <div className='c-section'>
        <div className='o-wrapper'>
          <div className='o-grid o-grid--middle'>
            <div className='o-grid__cell u-margin-bottom u-margin-bottom-none@large u-2/5@large u-align-self-flex-start'>
              <div className='c-section__thumbnail'>
                {poster
                  ? <img alt='' className='c-section__thumbnail__img' src={`${THUMBNAIL_ROOT}/${poster}`} />
                  : <img alt='' className='c-section__thumbnail__img' src={require("../../../images/playlist-thumbnail-default.jpg")} />
                }

                <div className='c-section__thumbnail__details'>
                  {views > 10 && (
                    <span>{views} views today</span>
                  )}
                  <span>{duration}</span>
                </div>
                {!mustPurchase && (
                  <button className='c-btn c-btn--with-icon c-section__thumbnail__btn' onClick={playVideo}>
                    <svg className='o-icon o-icon--small u-margin-right-tiny' width='16' height='22' viewBox='0 0 16 22' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M14.837 11.818L1.575 21.142A1 1 0 0 1 0 20.324V1.676A1 1 0 0 1 1.575.858l13.262 9.324a1 1 0 0 1 0 1.636z' fill='currentColor' fillRule='evenodd'/>
                    </svg>
                    {playVideoLabel}
                  </button>
                )}
              </div>
            </div>
            <div className='o-grid__cell u-3/5@large'>
              <div className='c-section__intro'>
                <span className='c-link-category'>
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </span>
                <h1 className='c-section__title'>{title}</h1>
                <p className='c-section__details'>By <Link to={`/profile/${author?.alias}`}>{author?.alias ? author?.alias : `${author?.first_name} ${author?.last_name}`}</Link> {/*&bull; <time className='c-section__details__time'>2 weeks ago</time>*/}</p>

                <div ref={(ref) => this.descriptionDiv = ref} className={`c-section__description ${this.state.tooLong ? 'c-section__description--long' : ''}`}>
                  <ReactMarkdown source={description} linkTarget="_blank" />
                </div>

                {this.state.tooLong && <span className='description--expand' onClick={() => this.setState({ tooLong: false })}>Show more</span>}

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
    )
  }
}
