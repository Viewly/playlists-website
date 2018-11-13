import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "../reducers/index";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger({
  collapsed: true
});


const composeEnhancers = DEVELOPMENT && CLIENT && !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeEnhancers(
  CLIENT
    ? applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
    : applyMiddleware(
      thunkMiddleware
    )
);

export default function() {
  return createStore(
    rootReducer,
    CLIENT && !!window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : undefined,
    enhancer
  );
}
