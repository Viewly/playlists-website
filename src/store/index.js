import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "../reducers/index";
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger({
  collapsed: true
});


const composeEnhancers = DEVELOPMENT && CLIENT && !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  CLIENT && !!window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : undefined,
  // applyMiddleware(thunk, logger)
  enhancer
)

// export function createBasicStore (reducers, data) {
//   return createStore(
//     reducers,
//     applyMiddleware(thunk, logger)
//   )
// }

export default store;
