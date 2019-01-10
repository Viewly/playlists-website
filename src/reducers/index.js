import * as actions from "../actions";
import * as userActions from "../actions/user";
import * as toastActions from "../actions/toast";
import * as playlistActions from "../actions/playlist";
import * as notificationActions from "../actions/notification";
import { PENDING, LOADED, LOADING } from "../constants/status_types";
import {
  getPlaylistProgress,
  updateVideosWithProgresses,
  decodeJwt,
  setUserCookie,
  getUserCookie,
  unsetUserCookie,
  generateUuid,
  getLocalStorageConfig, setLocalStorageConfig
} from "../utils";

const jwtCookie = getUserCookie();

const initialState = {
  config: { apiUrl: "https://api.vidflow.com/v1/api" },
  playlists: { _status: PENDING, data: [] },
  playlist: { _status: PENDING },
  categories: { _status: PENDING, data: [] },
  hashtags: { _status: PENDING, data: [] },
  bookmarks: { _status: PENDING, data: [] },
  notifications: { _status: PENDING, data: [] },
  comments: { _status: PENDING, data: [] },
  renderedPages: {},
  user: jwtCookie ? decodeJwt(jwtCookie) : false,
  localStorage: { ...getLocalStorageConfig() },
  emailConfirmation: { _status: PENDING },
  onboarding: false,
  jwt: jwtCookie,
  modals: {
    register: {
      isOpen: false
    },
    login: {
      isOpen: false
    },
    upload: {
      isOpen: false
    },
    crop: {
      isOpen: false
    }
  },
  toasts: { data: [] },
  playlistCreator: { _status: PENDING }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.USER_MY_PLAYLISTS_FETCH_START:
    case actions.PLAYLISTS_FETCH_START:
      return { ...state, playlists: { ...state.playlists, _status: LOADING } };

    case userActions.USER_MY_PLAYLISTS_FETCH_SUCCESS:
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
      return {
        ...state,
        playlist: { ...state.playlist, bookmarked: true },
        bookmarks: { ...state.bookmarks, data: selected ? [ ...state.bookmarks.data, selected ] : state.bookmarks.data }
      };
    }

    case userActions.USER_BOOKMARK_REMOVE_SUCCESS:
      return {
        ...state,
        playlist: { ...state.playlist, bookmarked: false },
        bookmarks: { ...state.bookmarks, data: state.bookmarks.data.filter(item => item.id !== action.data.playlist_id )}
      };

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

    case actions.PROMOTION_HIDE: {
      setLocalStorageConfig("hidePromotion", true);
      return { ...state, localStorage: { ...state.localStorage, hidePromotion: true } };
    }

    case actions.LOAD_LOCALSTORAGE: {
      const storage = getLocalStorageConfig();
      return { ...state, localStorage: { ...state.localStorage, ...storage } };
    }

    case userActions.USER_EMAIL_CONFIRM_SUCCESS:
      return { ...state, emailConfirmation: { _status: LOADED, success: action.data.success } };

    case userActions.USER_ONBOARDING_FETCH_SUCCESS:
      return { ...state, onboarding: action.data };

    case userActions.OPEN_LOGIN_MODAL:
      return { ...state, modals: { ...state.modals, [action.data.name]: { isOpen: true, ...action.data } } };
    case userActions.CLOSE_LOGIN_MODAL:
      return { ...state, modals: { ...state.modals, [action.data.name]: { isOpen: false } } };

    case toastActions.OPEN_TOAST: {
      if (!action.data.id) {
        action.data.id = generateUuid();
      }
      return { ...state, toasts: { ...state.toasts, data: [ ...state.toasts.data, action.data ] } }
    }
    case toastActions.CLOSE_TOAST: {
      return { ...state, toasts: { ...state.toasts, data: state.toasts.data.filter(item => item.id !== action.data) } }
    }

    case playlistActions.PLAYLIST_CREATE_SUCCESS:
      return { ...state, playlist: { _status: LOADED, ...action.data } }

      case playlistActions.PLAYLIST_UPDATE_SUCCESS:
      return { ...state, playlist: { _status: LOADED, ...action.data } }

    case playlistActions.PLAYLIST_VIDEOS_FETCH_SUCCESS:
      return { ...state, playlist: { _status: LOADED, ...state.playlist, videos: action.data.videos } }

    case playlistActions.UPDATE_REORDERED_VIDEOS:
      return { ...state, playlist: { _status: LOADED, ...state.playlist, videos: action.data } }

    case playlistActions.PLAYLIST_REMOVE_VIDEO_SUCCESS:
      const videos = state.playlist.videos.filter(item => item.id !== action.video_id);
      return { ...state, playlist: { _status: LOADED, ...state.playlist, videos } }

    case notificationActions.NOTIFICATIONS_FETCH_SUCCESS:
      return { ...state, notifications: { _status: LOADED, data: action.data } }

    case playlistActions.PLAYLIST_COMMENTS_FETCH_SUCCESS:
      return { ...state, comments: { _status: LOADED, playlist_id: action.playlist_id, data: action.data } }

    default:
      return state;
  }
};

export default rootReducer;
