import { makeApiCall } from '../api/request';
import * as playlistApi from '../api/playlist';

export const PLAYLISTS_FETCH_START = 'PLAYLIST/PLAYLISTS_FETCH_START';
export const PLAYLISTS_FETCH_SUCCESS = 'PLAYLIST/PLAYLISTS_FETCH_SUCCESS';
export const PLAYLISTS_FETCH_ERROR = 'PLAYLIST/PLAYLISTS_FETCH_ERROR';
export const playlistsFetch = makeApiCall(playlistApi.playlistsFetch, PLAYLISTS_FETCH_START, PLAYLISTS_FETCH_SUCCESS, PLAYLISTS_FETCH_ERROR);
