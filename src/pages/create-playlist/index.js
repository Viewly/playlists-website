import React, { Component } from "react";
import { connect } from "react-redux";

import { playlistCreateNew, categoriesFetch } from "../../actions";

@connect((state) => ({
  categories: state.categories
}), (dispatch) => ({
  playlistCreateNew: (title, description, email, category) => dispatch(playlistCreateNew({ title, description, email, category })),
  categoriesFetch: () => dispatch(categoriesFetch())
}))
class CreatePlaylist extends Component {
  state = {
    title: '',
    description: '',
    email: '',
    category: '0',
    suggested: false
  }

  componentDidMount() {
    const { categoriesFetch } = this.props;

    categoriesFetch();
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { playlistCreateNew } = this.props;

    evnt.preventDefault();
    await playlistCreateNew(this.state.title, this.state.description, this.state.email, this.state.category);
    this.setState({ suggested: true });
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        {this.state.suggested && (
          <div className='c-thank-you'>
            <img className='c-thank-you__img' src={require('../../images/message-thank-you.svg')} />
            <h5 className='u-margin-bottom-small'>Thanks for suggesting a playlist</h5>
            <p>We're still working on finalizing this feature, and we'll notify you as soon as it's ready.</p>
          </div>
        )}

        {!this.state.suggested && (
          <div>
            <h1 className='c-form__title'>Create your playlist</h1>
            <form className='c-form' onSubmit={this.handleSubmit}>
              <ul className='c-form__list'>
                <li>
                  <label className='c-form__label'>Playlist title</label>
                  <input className='c-input c-input--primary' type="text" name="title" value={this.state.title} onChange={this.handleChange} required />
                </li>
                <li>
                  <label className='c-form__label'>Category</label>
                  <div className='c-select u-1/1'>
                    <select className='c-select__select' name="category" value={this.state.category} onChange={this.handleChange}>
                      <option value="0">No category</option>
                      {categories.data.map((item, idx) => <option key={`category-${idx}`} value={item.id}>{item.name}</option>)}
                    </select>
                  </div>
                </li>
                <li>
                  <label className='c-form__label'>Description</label>
                  <textarea className='c-input c-input--primary c-input--textarea' type="text" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                </li>
                <li>
                  <label className='c-form__label'>Your email address</label>
                  <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </li>
                <li className='u-text-right'>
                  <button className='c-btn c-btn--primary'>Next</button>
                </li>
              </ul>
            </form>
          </div>
        )}

      </div>
    );
  }
}
export default CreatePlaylist;
