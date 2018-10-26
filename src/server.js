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
import path from "path";

const port = 3000;

const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'dist'), { index: false }));

const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

app.get('*', async (req, res) => {
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
  let promise;

  if (currentRoute.component && currentRoute.component.asyncLoad) {
    const matched = matchPath(req.url, currentRoute);
    promise = currentRoute.component.asyncLoad(matched.params, {}, store);
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
    finalHtml = finalHtml.replace('var __INITIAL_STATE__ = false;', `var __INITIAL_STATE__ = ${JSON.stringify(store.getState())};`);
    finalHtml = finalHtml.replace('var __HYDRATE__ = false;', 'var __HYDRATE__ = true;');
    res.write(finalHtml);
    res.end();
  });

});
app.listen(port, () => console.log(`App listening on port ${port}`));
