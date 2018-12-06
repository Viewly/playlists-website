import { makeApiCall } from "../api/request";
import * as uploadApi from "../api/upload";


export const GET_UPLOAD_URL_START = "PLAYLIST/GET_UPLOAD_URL_START";
export const GET_UPLOAD_URL_SUCCESS = "PLAYLIST/GET_UPLOAD_URL_SUCCESS";
export const GET_UPLOAD_URL_ERROR = "PLAYLIST/GET_UPLOAD_URL_ERROR";
export const getUploadUrl = makeApiCall(uploadApi.getUploadUrl, GET_UPLOAD_URL_START, GET_UPLOAD_URL_SUCCESS, GET_UPLOAD_URL_ERROR);

export const UPLOAD_FILE_START = "PLAYLIST/UPLOAD_FILE_START";
export const UPLOAD_FILE_SUCCESS = "PLAYLIST/UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_ERROR = "PLAYLIST/UPLOAD_FILE_ERROR";
export const uploadFile = makeApiCall(uploadApi.uploadFile, UPLOAD_FILE_START, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR);
