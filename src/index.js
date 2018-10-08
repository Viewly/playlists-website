import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./app";

const $appContainer = document.getElementById("root");

$appContainer && ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>), $appContainer
);