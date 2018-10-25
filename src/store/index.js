import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers/index";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

const logger = createLogger({
  collapsed: true,
  // predicate: (getState, action) => {
  //   // don't log actions that starts with PERCENTAGE/
  //   if (action.type.startsWith('PERCENTAGE/')) {
  //     return false;
  //   }

  //   return true;
  // }
});

const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  CLIENT && !!window.__INITIAL_STATE__ ? window.__INITIAL_STATE__ : undefined,
  applyMiddleware(thunk, logger)
)

// export function createBasicStore (reducers, data) {
//   return createStore(
//     reducers,
//     applyMiddleware(thunk, logger)
//   )
// }

export default store;
