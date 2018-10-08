import React, { Component } from "react";
import Header from "./header";
import Video from "./video";

export default class PlaylistInfo extends Component {
  state = {
    title: "Traktor Pro 2 for beginners",
    author: "Red Axes",
    videos: [
      {
        title: "Installation and set up",
        description: "This video covers the process of setting up free demo version of TRAKTOR PRO",
        thumbnail: "",
        videoUrl: "/player/1/1abc",
      },
      {
        title: "Installation and set up",
        description: "This video covers the process of setting up free demo version of TRAKTOR PRO",
        thumbnail: "",
        videoUrl: "/player/1/2abc",
      },
      {
        title: "Installation and set up",
        description: "This video covers the process of setting up free demo version of TRAKTOR PRO",
        thumbnail: "",
        videoUrl: "/player/1/3abc",
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
