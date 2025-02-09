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
  getLocalStorageConfig,
  setLocalStorageConfig,
  youtubeDurationToSeconds
} from "../utils";
import { uniqBy } from "lodash";
import moment from "moment";

const jwtCookie = getUserCookie();

const initialState = {
  config: { apiUrl: "https://api.vidflow.com/v1/api" },
  playlists: { _status: PENDING, data: [] },
  playlists_new: { _status: PENDING, data: [] },
  playlists_picked: { _status: PENDING, data: [] },
  playlists_hashtag: { _status: PENDING, data: [] },
  playlists_toptopic: { _status: PENDING, data: [] },
  playlists_watch_history: { _status: PENDING, data: [] },
  playlists_purchases: { _status: PENDING, data: [] },
  playlist: { _status: PENDING },
  categories: { _status: PENDING, data: [] },
  hashtags: { _status: PENDING, data: [] },
  bookmarks: { _status: PENDING, data: [] },
  notifications: { _status: PENDING, data: [] },
  comments: { _status: PENDING, data: [] },
  renderedPages: {},
  user: jwtCookie ? decodeJwt(jwtCookie) : false,
  user_profile: { _status: PENDING, playlists: [] },
  localStorage: { _status: PENDING, data: {} },
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

    case playlistActions.PLAYLISTS_FETCH_NEW_START:
      return { ...state, playlists_new: { ...state.playlists_new, _status: LOADING } }

    case playlistActions.PLAYLISTS_FETCH_NEW_SUCCESS: {
      const newPlaylists = uniqBy([ ...state.playlists_new.data, ...action.data ], item => item.id);
      return { ...state, playlists_new: { data: newPlaylists, _status: LOADED } };
    }

    case playlistActions.PLAYLISTS_FETCH_PICKED_SUCCESS:
      return { ...state, playlists_picked: { data: action.data, _status: LOADED } };

    case playlistActions.PLAYLISTS_FETCH_HASHTAG_SUCCESS:
      return { ...state, playlists_hashtag: { data: action.data, _status: LOADED } };

    case playlistActions.PLAYLIST_FETCH_PURCHASES_SUCCESS:
      return { ...state, playlists_purchases: { data: action.data, _status: LOADED } };

    case playlistActions.PLAYLISTS_FETCH_PITOPTOPIC_SUCCESS:
      return { ...state, playlists_toptopic: { data: action.data, _status: LOADED } };

    case playlistActions.PLAYLISTS_FETCH_WATCH_HISTORY_SUCCESS: {
      const newPlaylists = action.data.map(item => {
        const secs = moment.duration(item.duration).asSeconds();
        return { ...item, percentage: Math.round(100 * item.watch_time / secs) };
      });

      return { ...state, playlists_watch_history: { data: newPlaylists, _status: LOADED } };
    }

    case actions.PLAYLISTS_LOAD_MORE_SUCCESS:
      return { ...state, playlists: { data: [...state.playlists.data, ...action.data], _status: LOADED } };

    case actions.PLAYLIST_INJECT_DATA:
      return { ...state, playlist: { ...action.data, videos: [] } };

    case userActions.USER_GET_PROFILE_SUCCESS:
      return { ...state, user_profile: { ...action.data, _status: LOADED } };

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
      // const playlist = getPlaylistProgress(action.data.id);
      // action.data.videos = updateVideosWithProgresses(action.data.videos, playlist);
      // const watchedVideos = action.data.videos.filter(item => item.percentage > 0);
      // const sumProgresses = watchedVideos.reduce((acc, curr) => (acc + curr.percentage), 0);
      // action.data.percentage = Math.round(sumProgresses / action.data.videos.length);

      return { ...state, playlist: { _status: LOADED, ...action.data, isServerRendered: SERVER } };
    }
    case actions.PLAYLIST_INJECT_WATCH_TIME: {
      let update = {};
      // const playlist = getPlaylistProgress(state.playlist.id);
      // update.videos = updateVideosWithProgresses(state.playlist.videos, playlist);
      // const watchedVideos = state.playlist.videos.filter(item => item.percentage > 0);
      // const sumProgresses = watchedVideos.reduce((acc, curr) => (acc + curr.percentage), 0);
      // update.percentage = Math.round(sumProgresses / state.playlist.videos.length);

      return { ...state, playlist: { ...state.playlist, ...update } };
    }
    case playlistActions.PLAYLIST_FETCH_VIEWS_SUCCESS: {
      return { ...state, playlist: { ...state.playlist, views: action.data.visitors }};
    }
    case playlistActions.PLAYLIST_FETCH_PROGRESSES_SUCCESS: {
      const progresses = action.data;
      const videos = state.playlist.videos;
      let formatted = {};

      progresses.forEach(item => {
        const video = videos.find(video => video.id === +item.video_id);
        const percentage = Math.round(100 * item.last_time_seconds / youtubeDurationToSeconds(video.duration));

        formatted[item.video_id] = {
          currentTime: item.last_time_seconds,
          percentage
        };
      });

      let update = state.playlist;
      update.videos = updateVideosWithProgresses(state.playlist.videos, formatted);

      return { ...state, playlist: { ...update } };
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
      return { ...state, localStorage: { ...state.localStorage, data: { ...state.localStorage.data, hidePromotion: true } } };
    }

    case actions.BOOKMARK_TOOLTIP_HIDE: {
      setLocalStorageConfig("hideBookmark", true);
      return { ...state, localStorage: { ...state.localStorage, data: { ...state.localStorage.data, hideBookmark: true } } };
    }

    case actions.LOAD_LOCALSTORAGE: {
      const storage = getLocalStorageConfig();
      return { ...state, localStorage: { _status: LOADED, data: { ...storage } } };
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

    case notificationActions.NOTIFICATIONS_FETCH_SUCCESS: {
      const notifications = action.data.error ? [] : action.data;
      return { ...state, notifications: { _status: LOADED, data: notifications } }
    }

    case playlistActions.PLAYLIST_COMMENTS_FETCH_SUCCESS:
      return { ...state, comments: { _status: LOADED, playlist_id: action.playlist_id, data: action.data } }

    default:
      return state;
  }
};

export default rootReducer;
