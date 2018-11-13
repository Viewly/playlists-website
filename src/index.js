import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from "./store/index";
import App from "./app";
import ScrollToTop from "./components/scrollToTop";

const store = createStore();
const $appContainer = document.getElementById("root");
const Application = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

$appContainer && __HYDRATE__
  ? ReactDOM.hydrate(Application, $appContainer)
  : ReactDOM.render(Application, $appContainer);
