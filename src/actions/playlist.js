import { makeApiCall } from "../api/request";
import * as playlistApi from "../api/playlist";


export const PLAYLIST_CREATE_START = "PLAYLIST/PLAYLIST_CREATE_START";
export const PLAYLIST_CREATE_SUCCESS = "PLAYLIST/PLAYLIST_CREATE_SUCCESS";
export const PLAYLIST_CREATE_ERROR = "PLAYLIST/PLAYLIST_CREATE_ERROR";
export const playlistCreate = makeApiCall(playlistApi.playlistCreate, PLAYLIST_CREATE_START, PLAYLIST_CREATE_SUCCESS, PLAYLIST_CREATE_ERROR);
