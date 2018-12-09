import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import SEO from "../../components/SEO";
import EditPlaylist from "./components/edit";
import NewPlaylist from "./components/new";

class CreatePlaylist extends Component {
  render() {
    return (
      <>
        <SEO />
        <Switch>
          <Route path='/create-playlist/:playlistId' component={EditPlaylist} />
          <Route path='/create-playlist' component={NewPlaylist}/>
        </Switch>
      </>
    );
  }
}

export default CreatePlaylist;
