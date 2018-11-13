import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import path from "path";
import MetaTagsServer from "react-meta-tags/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { matchPath } from "react-router-dom";
import { MetaTagsContext } from "react-meta-tags";
import Cookies from "universal-cookie";
import { LOGIN_SUCCESS_PERSIST } from "./actions/user";
import { COOKIE_SESSION } from "./constants";

import App from "./app";
import { routes } from "./routes";
import createStore from "./store";

const port = 3000;

const app = express();
app.use(express.static(path.resolve(__dirname, "..", "dist"), { index: false }));

const indexPath = path.resolve(__dirname, "..", "dist", "index.html");
const indexHtml = fs.readFileSync(indexPath, "utf8");

app.get("*", async (req, res) => {
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};
  const metaTagsInstance = MetaTagsServer();
  const store = createStore();
  let promise;

  const cookies = new Cookies(req.headers.cookie);
  const jwt = cookies.get(COOKIE_SESSION);
  if (jwt) {
    store.dispatch({ type: LOGIN_SUCCESS_PERSIST, data: { jwt } });
  }

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
        <MetaTagsContext extract={metaTagsInstance.extract}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </MetaTagsContext>
      </Provider>
    );

    const meta = metaTagsInstance.renderToString();

    let finalHtml = indexHtml;
    finalHtml = finalHtml.replace("<!-- ROOT_CONTAINER -->", html);
    finalHtml = finalHtml.replace("var __INITIAL_STATE__ = false;", `var __INITIAL_STATE__ = ${JSON.stringify(store.getState())};`);
    finalHtml = finalHtml.replace("var __HYDRATE__ = false;", "var __HYDRATE__ = true;");
    finalHtml = finalHtml.replace(/<!-- DEFAULT META TAGS -->[\s\S]+<!-- \/DEFAULT META TAGS -->/, meta);
    res.write(finalHtml);
    res.end();
  });

});
app.listen(port, () => console.log(`App listening on port ${port}`));
