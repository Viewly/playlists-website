import React, { Component } from "react";
import Layout from "./layout";
import VideoPlayer from "./components/video";

class PlayerPage extends Component {
  render() {
    return (
      <Layout>
        <VideoPlayer playlistUrl='/playlist/1' />
      </Layout>
    );
  }
}
export default PlayerPage;
