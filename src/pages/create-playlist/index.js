import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { categoriesFetch } from "../../actions";

@connect((state) => ({
  categories: state.categories
}), (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch())
}))
class CreatePlaylist extends Component {
  static propTypes = {
    categoriesFetch: PropTypes.func.isRequired,
    categories: PropTypes.object
  };

  state = {
    playlist_name: "",
    category_id: "0",
    thumbnail_url: "",
    hashtags: "",
    youtube_url: ""
  };

  componentDidMount() {
    const { categoriesFetch } = this.props;

    categoriesFetch();
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  };

  handleSubmit = async (evnt) => {
    evnt.preventDefault();
    alert("Submit");
  };

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        <form onSubmit={this.handleSubmit}>
          <div className="o-grid o-grid--center o-grid--large">

            <div className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge'>
              <ul className='c-form__list c-form__list--large'>
                <li>
                  <label className='c-form__label'>Playlist name</label>
                  <input
                    className='c-input c-input--primary'
                    type="text"
                    name="playlist_name"
                    value={this.state.playlist_name}
                    onChange={this.handleChange}
                    required/>
                </li>

                <li>
                  <label className='c-form__label'>Category</label>
                  <div className='c-select u-1/1'>
                    <select
                      className='c-select__select'
                      name="category"
                      value={this.state.category}
                      onChange={this.handleChange}>

                      <option value="0">No category</option>
                      {categories.data.map((item, idx) => (
                        <option key={`category-${idx}`} value={item.id}>{item.name}</option>
                      ))}

                    </select>
                  </div>
                </li>

                <li>
                  <label className='c-form__label'>Playlist thumbnail</label>
                  <div>
                    drag and drop here or browse
                  </div>
                </li>

                <li>
                  <label className='c-form__label'>Description</label>
                  <textarea
                    className='c-input c-input--primary c-input--textarea'
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required></textarea>
                </li>

                <li>
                  <label className='c-form__label'>Hashtags</label>
                  <input
                    className='c-input c-input--primary'
                    type="text"
                    name="hashtags"
                    value={this.state.hashtags}
                    onChange={this.handleChange}
                    required/>
                </li>
              </ul>
            </div>

            <div className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge u-margin-top-large u-margin-top-none@large'>
              <ul className='c-form__list c-form__list--large'>
                <li>
                  <label className='c-form__label'>Add videos</label>
                  <div className='o-flag o-flag--reverse'>
                    <div className='o-flag__img'>
                      <button className='c-btn c-btn--secondary c-btn--square'>
                        <img className='o-icon o-icon--small' src={require("../../images/icons/plus.svg")} />
                      </button>
                    </div>
                    <div className='o-flag__body'>
                      <input
                        className='c-input c-input--primary'
                        type="text"
                        name=""
                        value=""
                        onChange={this.handleChange}
                        required/>
                    </div>
                  </div>
                  <small className='c-form__annotation'>Copy video URL and paste it here</small>
                </li>
              </ul>
              <ul className='u-margin-top-large c-form__list c-form__list--small'>
                <li>
                  <div className='c-video-link-preview'>
                    <div className='o-grid o-grid--auto o-grid--nowrap o-grid--middle o-grid--small'>

                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/reorder.svg")} />
                        </div>
                      </div>
                      <div className='o-grid__cell o-grid__cell--grow'>
                        <div className='o-grid o-grid--small o-grid--auto o-grid--nowrap o-grid--middle'>
                          <div className='o-grid__cell u-1/3'>
                            <span className='o-ratio o-ratio--16:9'>
                              <img className='c-video-link-preview__thumbnail o-ratio__content' src='https://i.ytimg.com/vi/fFcml2J5ElE/mqdefault.jpg'/>
                            </span>
                          </div>
                          <div className='o-grid__cell u-2/3'>
                            <input
                              className='c-input c-input--primary c-input--small'
                              type="text"
                              name=""
                              value='Premier League Preview - GW 13'
                              required/>
                          </div>
                        </div>
                      </div>
                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/delete.svg")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='c-video-link-preview'>
                    <div className='o-grid o-grid--auto o-grid--nowrap o-grid--middle o-grid--small'>

                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/reorder.svg")} />
                        </div>
                      </div>
                      <div className='o-grid__cell o-grid__cell--grow'>
                        <div className='o-grid o-grid--small o-grid--auto o-grid--nowrap o-grid--middle'>
                          <div className='o-grid__cell u-1/3'>
                            <span className='o-ratio o-ratio--16:9'>
                              <img className='c-video-link-preview__thumbnail o-ratio__content' src='https://i.ytimg.com/vi/fFcml2J5ElE/mqdefault.jpg'/>
                            </span>
                          </div>
                          <div className='o-grid__cell u-2/3'>
                            <input
                              className='c-input c-input--primary c-input--small'
                              type="text"
                              name=""
                              value='Premier League Preview - GW 13'
                              required/>
                          </div>
                        </div>
                      </div>
                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/delete.svg")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='c-video-link-preview'>
                    <div className='o-grid o-grid--auto o-grid--nowrap o-grid--middle o-grid--small'>

                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/reorder.svg")} />
                        </div>
                      </div>
                      <div className='o-grid__cell o-grid__cell--grow'>
                        <div className='o-grid o-grid--small o-grid--auto o-grid--nowrap o-grid--middle'>
                          <div className='o-grid__cell u-1/3'>
                            <span className='o-ratio o-ratio--16:9'>
                              <img className='c-video-link-preview__thumbnail o-ratio__content' src='https://i.ytimg.com/vi/fFcml2J5ElE/mqdefault.jpg'/>
                            </span>
                          </div>
                          <div className='o-grid__cell u-2/3'>
                            <input
                              className='c-input c-input--primary c-input--small'
                              type="text"
                              name=""
                              value='Premier League Preview - GW 13'
                              required/>
                          </div>
                        </div>
                      </div>
                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/delete.svg")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className='c-video-link-preview'>
                    <div className='o-grid o-grid--auto o-grid--nowrap o-grid--middle o-grid--small'>

                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/reorder.svg")} />
                        </div>
                      </div>
                      <div className='o-grid__cell o-grid__cell--grow'>
                        <div className='o-grid o-grid--small o-grid--auto o-grid--nowrap o-grid--middle'>
                          <div className='o-grid__cell u-1/3'>
                            <span className='o-ratio o-ratio--16:9'>
                              <img className='c-video-link-preview__thumbnail o-ratio__content' src='https://i.ytimg.com/vi/fFcml2J5ElE/mqdefault.jpg'/>
                            </span>
                          </div>
                          <div className='o-grid__cell u-2/3'>
                            <input
                              className='c-input c-input--primary c-input--small'
                              type="text"
                              name=""
                              value='Premier League Preview - GW 13'
                              required/>
                          </div>
                        </div>
                      </div>
                      <div className='o-grid__cell'>
                        <div className='c-faux-link'>
                          <img className='o-icon o-icon--small' src={require("../../images/icons/delete.svg")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='u-text-right u-horizontally-center u-margin-top u-margin-top-large@large u-4/5@medium u-1/1@large u-4/5@extralarge'>
            <button className='c-btn c-btn--secondary c-btn--hollow u-margin-right-small'>Save as draft</button>
            <button className='c-btn c-btn--secondary'>Publish</button>
          </div>
        </form>


      </div>
    );
  }
}

export default CreatePlaylist;
