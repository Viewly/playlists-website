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

export const PLAYLIST_FETCH_VIEWS_START = "PLAYLIST/PLAYLIST_FETCH_VIEWS_START";
export const PLAYLIST_FETCH_VIEWS_SUCCESS = "PLAYLIST/PLAYLIST_FETCH_VIEWS_SUCCESS";
export const PLAYLIST_FETCH_VIEWS_ERROR = "PLAYLIST/PLAYLIST_FETCH_VIEWS_ERROR";
export const playlistViews = makeApiCall(playlistApi.playlistViews, PLAYLIST_FETCH_VIEWS_START, PLAYLIST_FETCH_VIEWS_SUCCESS, PLAYLIST_FETCH_VIEWS_ERROR);

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

export const PLAYLIST_COMMENTS_FETCH_START = "PLAYLIST/PLAYLIST_COMMENTS_FETCH_START";
export const PLAYLIST_COMMENTS_FETCH_SUCCESS = "PLAYLIST/PLAYLIST_COMMENTS_FETCH_SUCCESS";
export const PLAYLIST_COMMENTS_FETCH_ERROR = "PLAYLIST/PLAYLIST_COMMENTS_FETCH_ERROR";
export const playlistCommentsFetch = makeApiCall(playlistApi.playlistCommentsFetch, PLAYLIST_COMMENTS_FETCH_START, PLAYLIST_COMMENTS_FETCH_SUCCESS, PLAYLIST_COMMENTS_FETCH_ERROR);

export const PLAYLIST_ADD_COMMENT_START = "PLAYLIST/PLAYLIST_ADD_COMMENT_START";
export const PLAYLIST_ADD_COMMENT_SUCCESS = "PLAYLIST/PLAYLIST_ADD_COMMENT_SUCCESS";
export const PLAYLIST_ADD_COMMENT_ERROR = "PLAYLIST/PLAYLIST_ADD_COMMENT_ERROR";
export const playlistAddComment = makeApiCall(playlistApi.playlistAddComment, PLAYLIST_ADD_COMMENT_START, PLAYLIST_ADD_COMMENT_SUCCESS, PLAYLIST_ADD_COMMENT_ERROR);

export const PLAYLIST_DELETE_COMMENT_START = "PLAYLIST/PLAYLIST_DELETE_COMMENT_START";
export const PLAYLIST_DELETE_COMMENT_SUCCESS = "PLAYLIST/PLAYLIST_DELETE_COMMENT_SUCCESS";
export const PLAYLIST_DELETE_COMMENT_ERROR = "PLAYLIST/PLAYLIST_DELETE_COMMENT_ERROR";
export const playlistDeleteComment = makeApiCall(playlistApi.playlistDeleteComment, PLAYLIST_DELETE_COMMENT_START, PLAYLIST_DELETE_COMMENT_SUCCESS, PLAYLIST_DELETE_COMMENT_ERROR);

export const PLAYLIST_VOTE_COMMENT_START = "PLAYLIST/PLAYLIST_VOTE_COMMENT_START";
export const PLAYLIST_VOTE_COMMENT_SUCCESS = "PLAYLIST/PLAYLIST_VOTE_COMMENT_SUCCESS";
export const PLAYLIST_VOTE_COMMENT_ERROR = "PLAYLIST/PLAYLIST_VOTE_COMMENT_ERROR";
export const playlistVoteComment = makeApiCall(playlistApi.playlistVoteComment, PLAYLIST_VOTE_COMMENT_START, PLAYLIST_VOTE_COMMENT_SUCCESS, PLAYLIST_VOTE_COMMENT_ERROR);

export const PLAYLIST_REORDER_VIDEOS_START = "PLAYLIST/PLAYLIST_REORDER_VIDEOS_START";
export const PLAYLIST_REORDER_VIDEOS_SUCCESS = "PLAYLIST/PLAYLIST_REORDER_VIDEOS_SUCCESS";
export const PLAYLIST_REORDER_VIDEOS_ERROR = "PLAYLIST/PLAYLIST_REORDER_VIDEOS_ERROR";
export const playlistReorderVideos = makeApiCall(playlistApi.playlistReorderVideos, PLAYLIST_REORDER_VIDEOS_START, PLAYLIST_REORDER_VIDEOS_SUCCESS, PLAYLIST_REORDER_VIDEOS_ERROR);

export const PLAYLIST_UPDATE_VIDEO_START = "PLAYLIST/PLAYLIST_UPDATE_VIDEO_START";
export const PLAYLIST_UPDATE_VIDEO_SUCCESS = "PLAYLIST/PLAYLIST_UPDATE_VIDEO_SUCCESS";
export const PLAYLIST_UPDATE_VIDEO_ERROR = "PLAYLIST/PLAYLIST_UPDATE_VIDEO_ERROR";
export const playlistUpdateVideo = makeApiCall(playlistApi.playlistUpdateVideo, PLAYLIST_UPDATE_VIDEO_START, PLAYLIST_UPDATE_VIDEO_SUCCESS, PLAYLIST_UPDATE_VIDEO_ERROR);

export const PLAYLISTS_FETCH_NEW_START = "PLAYLIST/PLAYLISTS_FETCH_NEW_START";
export const PLAYLISTS_FETCH_NEW_SUCCESS = "PLAYLIST/PLAYLISTS_FETCH_NEW_SUCCESS";
export const PLAYLISTS_FETCH_NEW_ERROR = "PLAYLIST/PLAYLISTS_FETCH_NEW_ERROR";
export const playlistsFetchNew = makeApiCall(playlistApi.playlistsFetchNew, PLAYLISTS_FETCH_NEW_START, PLAYLISTS_FETCH_NEW_SUCCESS, PLAYLISTS_FETCH_NEW_ERROR);

export const PLAYLISTS_FETCH_PICKED_START = "PLAYLIST/PLAYLISTS_FETCH_PICKED_START";
export const PLAYLISTS_FETCH_PICKED_SUCCESS = "PLAYLIST/PLAYLISTS_FETCH_PICKED_SUCCESS";
export const PLAYLISTS_FETCH_PICKED_ERROR = "PLAYLIST/PLAYLISTS_FETCH_PICKED_ERROR";
export const playlistsFetchPicked = makeApiCall(playlistApi.playlistsFetchPicked, PLAYLISTS_FETCH_PICKED_START, PLAYLISTS_FETCH_PICKED_SUCCESS, PLAYLISTS_FETCH_PICKED_ERROR);

export const PLAYLISTS_FETCH_HASHTAG_START = "PLAYLIST/PLAYLISTS_FETCH_HASHTAG_START";
export const PLAYLISTS_FETCH_HASHTAG_SUCCESS = "PLAYLIST/PLAYLISTS_FETCH_HASHTAG_SUCCESS";
export const PLAYLISTS_FETCH_HASHTAG_ERROR = "PLAYLIST/PLAYLISTS_FETCH_HASHTAG_ERROR";
export const playlistsFetchHashtag = makeApiCall(playlistApi.playlistsFetchHashtag, PLAYLISTS_FETCH_HASHTAG_START, PLAYLISTS_FETCH_HASHTAG_SUCCESS, PLAYLISTS_FETCH_HASHTAG_ERROR);

export const UPDATE_REORDERED_VIDEOS = "PLAYLIST/UPDATE_REORDERED_VIDEOS";
