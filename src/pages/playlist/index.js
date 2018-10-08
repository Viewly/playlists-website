import React, { Component } from "react";
import Header from "./components/header";
import Video from "./components/video";

class PlaylistPage extends Component {
  state = {
    title: "Traktor Pro 2 for beginners",
    author: "Red Axes",
    videos: [
      {
        title: "Installation and set up",
        description: "This video covers the process of setting up free demo version of TRAKTOR PRO",
        thumbnail: "",
        videoId: "123",
      },
      {
        title: "Installation and set up",
        description: "This video covers the process of setting up free demo version of TRAKTOR PRO",
        thumbnail: "",
        videoId: "123",
      },
      {
        title: "Installation and set up",
        description: "This video covers the process of setting up free demo version of TRAKTOR PRO",
        thumbnail: "",
        videoId: "123",
      },
    ]
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} author={this.state.author} />

        {this.state.videos.map((item, idx) => <Video key={`video-${idx}`} {...item} />)}
      </div>
    );
  }
}
export default PlaylistPage;
