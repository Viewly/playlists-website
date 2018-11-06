import * as actions from '../actions';
import { PENDING, LOADED, LOADING, ERROR } from '../constants/status_types';
import { getPlaylistProgress, updateVideosWithProgresses } from "../utils";

const initialState = {
  config: { apiUrl: 'https://api.vidflow.io/v1/api' },
  playlists: { _status: PENDING, data: [] },
  playlist: { _status: PENDING },
  categories: { _status: PENDING, data: [] },
  searchedPlaylists: { _status: PENDING, data: [] }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYLISTS_FETCH_SUCCESS:
      return { ...state, playlists: { data: action.data, _status: LOADED } };

    case actions.PLAYLISTS_LOAD_MORE_SUCCESS:
      return { ...state, playlists: { data: [ ...state.playlists.data, ...action.data ], _status: LOADED } };

    case actions.PLAYLIST_INJECT_DATA:
      return { ...state, playlist: { ...action.data, videos: [] } }

    case actions.PERCENTAGE_UPDATE_SUCCESS:
      const videos = state.playlist.videos.map(item => {
        if (item.id === action.data.videoId) {
          item.percentage = action.data.percentage;
          item.currentTime = action.data.currentTime;
        }

        return item;
      });

      const watchedVideosToUpdate = videos.filter(item => item.percentage > 0);
      const sumProgressesToUpdate = watchedVideosToUpdate.reduce((acc, curr) => (acc + curr.percentage), 0);
      state.playlist.percentage = Math.round(sumProgressesToUpdate / videos.length);

      return { ...state, playlist: { ...state.playlist, videos } };

    case actions.PLAYLIST_FETCH_START:
      return { ...state, playlist: { ...state.playlist, _status: LOADING } };
    case actions.PLAYLIST_FETCH_SUCCESS:
      const playlist = getPlaylistProgress(action.data.id);
      action.data.videos = updateVideosWithProgresses(action.data.videos, playlist);
      const watchedVideos = action.data.videos.filter(item => item.percentage > 0);
      const sumProgresses = watchedVideos.reduce((acc, curr) => (acc + curr.percentage), 0);
      action.data.percentage = Math.round(sumProgresses / action.data.videos.length);

      return { ...state, playlist: { _status: LOADED, ...action.data, isServerRendered: SERVER } };

    case actions.PLAYLIST_SEARCH_START:
      return { ...state, searchedPlaylists: { _status: LOADING, data: [] } };
    case actions.PLAYLIST_SEARCH_SUCCESS:
      return { ...state, searchedPlaylists: { _status: LOADED, data: action.data } };
    case actions.PLAYLIST_SEARCH_ERROR:
      return { ...state, searchedPlaylists: { _status: ERROR, data: [] } };

    case actions.CATEGORIES_FETCH_SUCCESS:
      return {
        ...state, categories: {
          _status: LOADED,
          data: action.data.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          })
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
