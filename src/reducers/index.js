// import * as actions from '../actions';

const initialState = {
  config: { apiUrl: '' },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actions.SET_CONFIG:
    //   return { ...state, config: { ...action.payload, _status: STATUS_TYPE.LOADED } };
    
    default:
      return state;
  }
};

export default rootReducer;
