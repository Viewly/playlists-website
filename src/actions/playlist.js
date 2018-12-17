import { makeApiCall } from "../api/request";
import * as playlistApi from "../api/playlist";


export const PLAYLIST_CREATE_START = "PLAYLIST/PLAYLIST_CREATE_START";
export const PLAYLIST_CREATE_SUCCESS = "PLAYLIST/PLAYLIST_CREATE_SUCCESS";
export const PLAYLIST_CREATE_ERROR = "PLAYLIST/PLAYLIST_CREATE_ERROR";
export const playlistCreate = makeApiCall(playlistApi.playlistCreate, PLAYLIST_CREATE_START, PLAYLIST_CREATE_SUCCESS, PLAYLIST_CREATE_ERROR);

export const PLAYLIST_UPDATE_START = "PLAYLIST/PLAYLIST_UPDATE_START";
export const PLAYLIST_UPDATE_SUCCESS = "PLAYLIST/PLAYLIST_UPDATE_SUCCESS";
export const PLAYLIST_UPDATE_ERROR = "PLAYLIST/PLAYLIST_UPDATE_ERROR";
export const playlistUpdate = makeApiCall(playlistApi.playlistUpdate, PLAYLIST_UPDATE_START, PLAYLIST_UPDATE_SUCCESS, PLAYLIST_UPDATE_ERROR);

export const PLAYLIST_REMOVE_START = "PLAYLIST/PLAYLIST_REMOVE_START";
export const PLAYLIST_REMOVE_SUCCESS = "PLAYLIST/PLAYLIST_REMOVE_SUCCESS";
export const PLAYLIST_REMOVE_ERROR = "PLAYLIST/PLAYLIST_REMOVE_ERROR";
export const playlistRemove = makeApiCall(playlistApi.playlistRemove, PLAYLIST_REMOVE_START, PLAYLIST_REMOVE_SUCCESS, PLAYLIST_REMOVE_ERROR);

export const VIDEO_PREFIL_START = "PLAYLIST/VIDEO_PREFIL_START";
export const VIDEO_PREFIL_SUCCESS = "PLAYLIST/VIDEO_PREFIL_SUCCESS";
export const VIDEO_PREFIL_ERROR = "PLAYLIST/VIDEO_PREFIL_ERROR";
export const videoPrefil = makeApiCall(playlistApi.videoPrefil, VIDEO_PREFIL_START, VIDEO_PREFIL_SUCCESS, VIDEO_PREFIL_ERROR);

export const PLAYLIST_ADD_VIDEO_START = "PLAYLIST/PLAYLIST_ADD_VIDEO_START";
export const PLAYLIST_ADD_VIDEO_SUCCESS = "PLAYLIST/PLAYLIST_ADD_VIDEO_SUCCESS";
export const PLAYLIST_ADD_VIDEO_ERROR = "PLAYLIST/PLAYLIST_ADD_VIDEO_ERROR";
export const playlistAddVideo = makeApiCall(playlistApi.playlistAddVideo, PLAYLIST_ADD_VIDEO_START, PLAYLIST_ADD_VIDEO_SUCCESS, PLAYLIST_ADD_VIDEO_ERROR);

export const PLAYLIST_REMOVE_VIDEO_START = "PLAYLIST/PLAYLIST_REMOVE_VIDEO_START";
export const PLAYLIST_REMOVE_VIDEO_SUCCESS = "PLAYLIST/PLAYLIST_REMOVE_VIDEO_SUCCESS";
export const PLAYLIST_REMOVE_VIDEO_ERROR = "PLAYLIST/PLAYLIST_REMOVE_VIDEO_ERROR";
export const playlistRemoveVideo = makeApiCall(playlistApi.playlistRemoveVideo, PLAYLIST_REMOVE_VIDEO_START, PLAYLIST_REMOVE_VIDEO_SUCCESS, PLAYLIST_REMOVE_VIDEO_ERROR);

export const PLAYLIST_VIDEOS_FETCH_START = "PLAYLIST/PLAYLIST_VIDEOS_FETCH_START";
export const PLAYLIST_VIDEOS_FETCH_SUCCESS = "PLAYLIST/PLAYLIST_VIDEOS_FETCH_SUCCESS";
export const PLAYLIST_VIDEOS_FETCH_ERROR = "PLAYLIST/PLAYLIST_VIDEOS_FETCH_ERROR";
export const playlistVideosFetch = makeApiCall(playlistApi.playlistFetch, PLAYLIST_VIDEOS_FETCH_START, PLAYLIST_VIDEOS_FETCH_SUCCESS, PLAYLIST_VIDEOS_FETCH_ERROR);

export const PLAYLIST_REORDER_VIDEOS_START = "PLAYLIST/PLAYLIST_REORDER_VIDEOS_START";
export const PLAYLIST_REORDER_VIDEOS_SUCCESS = "PLAYLIST/PLAYLIST_REORDER_VIDEOS_SUCCESS";
export const PLAYLIST_REORDER_VIDEOS_ERROR = "PLAYLIST/PLAYLIST_REORDER_VIDEOS_ERROR";
export const playlistReorderVideos = makeApiCall(playlistApi.playlistReorderVideos, PLAYLIST_REORDER_VIDEOS_START, PLAYLIST_REORDER_VIDEOS_SUCCESS, PLAYLIST_REORDER_VIDEOS_ERROR);

export const PLAYLIST_UPDATE_VIDEO_START = "PLAYLIST/PLAYLIST_UPDATE_VIDEO_START";
export const PLAYLIST_UPDATE_VIDEO_SUCCESS = "PLAYLIST/PLAYLIST_UPDATE_VIDEO_SUCCESS";
export const PLAYLIST_UPDATE_VIDEO_ERROR = "PLAYLIST/PLAYLIST_UPDATE_VIDEO_ERROR";
export const playlistUpdateVideo = makeApiCall(playlistApi.playlistUpdateVideo, PLAYLIST_UPDATE_VIDEO_START, PLAYLIST_UPDATE_VIDEO_SUCCESS, PLAYLIST_UPDATE_VIDEO_ERROR);

export const UPDATE_REORDERED_VIDEOS = "PLAYLIST/UPDATE_REORDERED_VIDEOS";
