import { createServer } from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchPath } from "react-router-dom";
import App from "./App";
// import rootReducer from "./reducers/index";
// import { createBasicStore } from "./store/";
import { routes } from "./routes";
import Html from './server/html';
import store from "./store";

const port = 3000;

createServer((req, res) => {
  // const initialState = {};
  // const store = createBasicStore(rootReducer, initialState);
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.component && currentRoute.component.asyncLoad) {
    promise = currentRoute.component.asyncLoad({}, {}, store);
  } else {
    promise = Promise.resolve(null);
  }

  promise.then(data => {
    const context = { data };

    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const output = ReactDOMServer.renderToStaticMarkup(<Html title="Hello World" children={html} initialState={store.getState()} />)
    res.write(`<!doctype html>${output}`);
    res.end();
  });

}).listen(port);

console.log(`Serving at http://localhost:${port}`);
