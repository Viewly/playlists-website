import { makeApiCall } from "../api/request";
import * as uploadApi from "../api/upload";


export const GET_UPLOAD_URL_START = "UPLOAD/GET_UPLOAD_URL_START";
export const GET_UPLOAD_URL_SUCCESS = "UPLOAD/GET_UPLOAD_URL_SUCCESS";
export const GET_UPLOAD_URL_ERROR = "UPLOAD/GET_UPLOAD_URL_ERROR";
export const getUploadUrl = makeApiCall(uploadApi.getUploadUrl, GET_UPLOAD_URL_START, GET_UPLOAD_URL_SUCCESS, GET_UPLOAD_URL_ERROR);

export const UPLOAD_FILE_START = "UPLOAD/UPLOAD_FILE_START";
export const UPLOAD_FILE_SUCCESS = "UPLOAD/UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_ERROR = "UPLOAD/UPLOAD_FILE_ERROR";
export const uploadFile = makeApiCall(uploadApi.uploadFile, UPLOAD_FILE_START, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR);
