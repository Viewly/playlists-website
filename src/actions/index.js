import { makeApiCall, makeFunctionCall } from '../api/request';
import * as playlistApi from '../api/playlist';
import * as localstorageApi from '../api/localstorage';

export const PLAYLISTS_FETCH_START = 'PLAYLIST/PLAYLISTS_FETCH_START';
export const PLAYLISTS_FETCH_SUCCESS = 'PLAYLIST/PLAYLISTS_FETCH_SUCCESS';
export const PLAYLISTS_FETCH_ERROR = 'PLAYLIST/PLAYLISTS_FETCH_ERROR';
export const playlistsFetch = makeApiCall(playlistApi.playlistsFetch, PLAYLISTS_FETCH_START, PLAYLISTS_FETCH_SUCCESS, PLAYLISTS_FETCH_ERROR);

export const PLAYLIST_INJECT_DATA = 'PLAYLIST/PLAYLIST_INJECT_DATA';

export const PLAYLIST_FETCH_START = 'PLAYLIST/PLAYLIST_FETCH_START';
export const PLAYLIST_FETCH_SUCCESS = 'PLAYLIST/PLAYLIST_FETCH_SUCCESS';
export const PLAYLIST_FETCH_ERROR = 'PLAYLIST/PLAYLIST_FETCH_ERROR';
export const playlistFetch = makeApiCall(playlistApi.playlistFetch, PLAYLIST_FETCH_START, PLAYLIST_FETCH_SUCCESS, PLAYLIST_FETCH_ERROR);

export const PLAYLIST_SEARCH_START = 'PLAYLIST/PLAYLIST_SEARCH_START';
export const PLAYLIST_SEARCH_SUCCESS = 'PLAYLIST/PLAYLIST_SEARCH_SUCCESS';
export const PLAYLIST_SEARCH_ERROR = 'PLAYLIST/PLAYLIST_SEARCH_ERROR';
export const playlistSearch = makeApiCall(playlistApi.playlistSearch, PLAYLIST_SEARCH_START, PLAYLIST_SEARCH_SUCCESS, PLAYLIST_SEARCH_ERROR);

export const PLAYLIST_SUGGEST_START = 'PLAYLIST/PLAYLIST_SUGGEST_START';
export const PLAYLIST_SUGGEST_SUCCESS = 'PLAYLIST/PLAYLIST_SUGGEST_SUCCESS';
export const PLAYLIST_SUGGEST_ERROR = 'PLAYLIST/PLAYLIST_SUGGEST_ERROR';
export const playlistSuggestVideo = makeApiCall(playlistApi.playlistSuggestVideo, PLAYLIST_SUGGEST_START, PLAYLIST_SUGGEST_SUCCESS, PLAYLIST_SUGGEST_ERROR);

export const PLAYLIST_CREATE_NEW_START = 'PLAYLIST/PLAYLIST_CREATE_NEW_START';
export const PLAYLIST_CREATE_NEW_SUCCESS = 'PLAYLIST/PLAYLIST_CREATE_NEW_SUCCESS';
export const PLAYLIST_CREATE_NEW_ERROR = 'PLAYLIST/PLAYLIST_CREATE_NEW_ERROR';
export const playlistCreateNew = makeApiCall(playlistApi.playlistCreateNew, PLAYLIST_CREATE_NEW_START, PLAYLIST_CREATE_NEW_SUCCESS, PLAYLIST_CREATE_NEW_ERROR);

export const CATEGORIES_FETCH_START = 'PLAYLIST/CATEGORIES_FETCH_START';
export const CATEGORIES_FETCH_SUCCESS = 'PLAYLIST/CATEGORIES_FETCH_SUCCESS';
export const CATEGORIES_FETCH_ERROR = 'PLAYLIST/CATEGORIES_FETCH_ERROR';
export const categoriesFetch = makeApiCall(playlistApi.categoriesFetch, CATEGORIES_FETCH_START, CATEGORIES_FETCH_SUCCESS, CATEGORIES_FETCH_ERROR);

export const PERCENTAGE_UPDATE_START = 'PERCENTAGE/PERCENTAGE_UPDATE_START';
export const PERCENTAGE_UPDATE_SUCCESS = 'PERCENTAGE/PERCENTAGE_UPDATE_SUCCESS';
export const PERCENTAGE_UPDATE_ERROR = 'PERCENTAGE/PERCENTAGE_UPDATE_ERROR';
export const updatePercentage = makeFunctionCall(localstorageApi.updatePercentage, PERCENTAGE_UPDATE_START, PERCENTAGE_UPDATE_SUCCESS, PERCENTAGE_UPDATE_ERROR)
