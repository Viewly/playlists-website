import * as actions from '../actions';
import { PENDING, LOADED } from '../constants/status_types';

const initialState = {
  config: { apiUrl: 'http://142.93.105.235:3000/v1/api/' },
  playlists: { _status: PENDING, data: [] }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYLISTS_FETCH_SUCCESS:
      return { ...state, playlists: { data: action.data, _status: LOADED } };

    default:
      return state;
  }
};

export default rootReducer;
