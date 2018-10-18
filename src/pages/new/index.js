import React, { Component } from "react";
import Layout from "./layout";

class NewPlaylist extends Component {
  render() {
    return (
      <Layout>
        <div className='o-wrapper'>

          <form>

            <div>
              <label>Blabla</label>
              <input type="text" name="link" placeholder="Your video link" />
            </div>
            <div>
              <label>Email address</label>
              <input type="text" name="email" placeholder="Your email" />
            </div>

            <button>Submit</button>

          </form>

        </div>
      </Layout>
    );
  }
}
export default NewPlaylist;
