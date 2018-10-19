import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./layout";

import { playlistCreateNew } from "../../actions";

@connect(null, (dispatch) => ({
  playlistCreateNew: (title, description, email) => dispatch(playlistCreateNew({ title, description, email })),
}))
class NewPlaylist extends Component {
  state = {
    title: '',
    description: '',
    email: '',
    suggested: false
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { playlistCreateNew } = this.props;

    evnt.preventDefault();
    await playlistCreateNew(this.state.title, this.state.description, this.state.email);
    this.setState({ suggested: true });
  }

  render() {
    return (
      <Layout>
        <div className='o-wrapper'>
          {this.state.suggested && (
            <h2>Thanks for suggesting a playlist</h2>
          )}

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Title</label>
              <input type="text" name="title" placeholder="Playlist title" value={this.state.title} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Description</label>
              <input type="text" name="description" placeholder="Short description" value={this.state.description} onChange={this.handleChange} />
            </div>
            <div>
              <label>Email address</label>
              <input type="text" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <button>Submit</button>
          </form>

        </div>
      </Layout>
    );
  }
}
export default NewPlaylist;
