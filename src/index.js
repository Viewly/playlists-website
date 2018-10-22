import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./app";
import ScrollToTop from "./components/scrollToTop";

const $appContainer = document.getElementById("root");

$appContainer && ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>), $appContainer
);
