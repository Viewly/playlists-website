import * as actions from '../actions';
import { PENDING, LOADED, LOADING } from '../constants/status_types';

const initialState = {
  config: { apiUrl: 'https://api.vidflow.io/v1/api' },
  playlists: { _status: PENDING, data: [] },
  playlist: { _status: PENDING }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYLISTS_FETCH_SUCCESS:
      return { ...state, playlists: { data: action.data, _status: LOADED } };

    case actions.PLAYLIST_FETCH_START:
      return { ...state, playlist: { _status: LOADING } };
    case actions.PLAYLIST_FETCH_SUCCESS:
      return { ...state, playlist: { _status: LOADED, ...action.data } };

    default:
      return state;
  }
};

export default rootReducer;
