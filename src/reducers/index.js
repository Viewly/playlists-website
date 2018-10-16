import * as actions from '../actions';
import { PENDING, LOADED, LOADING } from '../constants/status_types';
import { getPlaylistProgress, updateVideosWithProgresses } from "../utils";

const initialState = {
  config: { apiUrl: 'https://api.vidflow.io/v1/api' },
  playlists: { _status: PENDING, data: [] },
  playlist: { _status: PENDING }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYLISTS_FETCH_SUCCESS:
      return { ...state, playlists: { data: action.data, _status: LOADED } };

    case actions.PERCENTAGE_UPDATE_SUCCESS:
      const videos = state.playlist.videos.map(item => {
        if (item.id === action.data.videoId) {
          item.percentage = action.data.percentage
        }

        return item;
      });

      const watchedVideosToUpdate = videos.filter(item => item.percentage > 0);
      const sumProgressesToUpdate = watchedVideosToUpdate.reduce((acc, curr) => (acc + curr.percentage), 0);
      state.playlist.percentage = Math.round(sumProgressesToUpdate / videos.length);

      return { ...state, playlist: { ...state.playlist, videos } };

    case actions.PLAYLIST_FETCH_START:
      return { ...state, playlist: { _status: LOADING } };
    case actions.PLAYLIST_FETCH_SUCCESS:
      const playlist = getPlaylistProgress(action.data.id);
      action.data.videos = updateVideosWithProgresses(action.data.videos, playlist);
      const watchedVideos = action.data.videos.filter(item => item.percentage > 0);
      const sumProgresses = watchedVideos.reduce((acc, curr) => (acc + curr.percentage), 0);
      action.data.percentage = Math.round(sumProgresses / action.data.videos.length);

      return { ...state, playlist: { _status: LOADED, ...action.data } };

    default:
      return state;
  }
};

export default rootReducer;
