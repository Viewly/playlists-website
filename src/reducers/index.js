import * as actions from "../actions";
import * as userActions from "../actions/user";
import { PENDING, LOADED, LOADING } from "../constants/status_types";
import { getPlaylistProgress, updateVideosWithProgresses, decodeJwt, setUserCookie, getUserCookie, unsetUserCookie } from "../utils";

const jwtCookie = getUserCookie();

const initialState = {
  config: { apiUrl: "https://api.vidflow.io/v1/api" },
  playlists: { _status: PENDING, data: [] },
  playlist: { _status: PENDING },
  categories: { _status: PENDING, data: [] },
  hashtags: { _status: PENDING, data: [] },
  bookmarks: { _status: PENDING, data: [] },
  renderedPages: {},
  user: jwtCookie ? decodeJwt(jwtCookie) : false,
  emailConfirmation: { _status: PENDING },
  onboarding: false,
  jwt: jwtCookie
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PLAYLISTS_FETCH_START:
      return { ...state, playlists: { ...state.playlists, _status: LOADING } };
    case actions.PLAYLISTS_FETCH_SUCCESS:
      return { ...state, playlists: { data: action.data, _status: LOADED } };

    case actions.PLAYLISTS_LOAD_MORE_SUCCESS:
      return { ...state, playlists: { data: [...state.playlists.data, ...action.data], _status: LOADED } };

    case actions.PLAYLIST_INJECT_DATA:
      return { ...state, playlist: { ...action.data, videos: [] } };

    case actions.SET_SERVER_RENDERED:
      return { ...state, renderedPages: { ...state.renderedPages, [action.data]: true } };
    case actions.SET_CLIENT_RENDERED:
      return { ...state, renderedPages: { ...state.renderedPages, [action.data]: false } };

    case actions.PERCENTAGE_UPDATE_SUCCESS: {
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
    }
    case actions.PLAYLIST_FETCH_START:
      return { ...state, playlist: { ...state.playlist, _status: LOADING } };
    case actions.PLAYLIST_FETCH_SUCCESS: {
      const playlist = getPlaylistProgress(action.data.id);
      action.data.videos = updateVideosWithProgresses(action.data.videos, playlist);
      const watchedVideos = action.data.videos.filter(item => item.percentage > 0);
      const sumProgresses = watchedVideos.reduce((acc, curr) => (acc + curr.percentage), 0);
      action.data.percentage = Math.round(sumProgresses / action.data.videos.length);

      return { ...state, playlist: { _status: LOADED, ...action.data, isServerRendered: SERVER } };
    }
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

    case actions.HASHTAGS_FETCH_SUCCESS:
      return { ...state, hashtags: { _status: LOADED, data: action.data } };

    case userActions.USER_BOOKMARKS_FETCH_SUCCESS:
      return { ...state, bookmarks: { _status: LOADED, data: action.data } };

    case userActions.USER_BOOKMARK_ADD_SUCCESS: {
      const selected = state.playlists.data.find(item => item.id === action.data.playlist_id);
      console.log("SELECTED - ", selected);
      return { ...state, bookmarks: { ...state.bookmarks, data: [ ...state.bookmarks.data, selected ] } };
    }

    case userActions.USER_BOOKMARK_REMOVE_SUCCESS:
      return { ...state, bookmarks: { ...state.bookmarks, data: state.bookmarks.data.filter(item => item.bookmark_id !== action.data.bookmark_id )} };

    case userActions.LOGIN_SUCCESS_PERSIST:
    case userActions.USER_PROFILE_FETCH_SUCCESS: {
      const decodedUser = decodeJwt(action.data.jwt);
      setUserCookie(action.data.jwt);
      return { ...state, jwt: action.data.jwt, user: decodedUser };
    }

    case userActions.LOGOUT: {
      unsetUserCookie();
      return { ...state, jwt: "", user: false };
    }

    case userActions.USER_EMAIL_CONFIRM_SUCCESS:
      return { ...state, emailConfirmation: { _status: LOADED, success: action.data.success } };

    case userActions.USER_ONBOARDING_FETCH_SUCCESS:
      return { ...state, onboarding: action.data };

    default:
      return state;
  }
};

export default rootReducer;
