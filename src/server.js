import express from 'express';
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchPath } from "react-router-dom";
import App from "./App";
import { routes } from "./routes";
import store from "./store";
import fs from "fs";

const port = 3000;

const app = express();
app.use(express.static('.', { index: false }));

const indexHtml = fs.readFileSync('./index.html', 'utf8');

app.get('*', async (req, res) => {
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

    let finalHtml = indexHtml;
    finalHtml = finalHtml.replace('<!-- ROOT_CONTAINER -->', html);
    finalHtml = finalHtml.replace('/*INITIAL_STATE*/', JSON.stringify(store.getState()));
    res.write(finalHtml);
    res.end();
  });

});
app.listen(port, () => console.log(`App listening on port ${port}`));
