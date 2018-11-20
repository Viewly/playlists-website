import { makeApiCall } from "../api/request";
import * as userApi from "../api/user";

export const USER_LOGIN_START = "USER/USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER/USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER/USER_LOGIN_ERROR";
export const userLogin = makeApiCall(userApi.userLogin, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR);

export const getGoogleLoginUrl = makeApiCall(userApi.getGoogleLoginUrl);
export const doGoogleLogin = makeApiCall(userApi.doGoogleLogin);

export const USER_REGISTRATION_START = "USER/USER_REGISTRATION_START";
export const USER_REGISTRATION_SUCCESS = "USER/USER_REGISTRATION_SUCCESS";
export const USER_REGISTRATION_ERROR = "USER/USER_REGISTRATION_ERROR";
export const userRegister = makeApiCall(userApi.userRegister, USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_ERROR);

export const USER_PROFILE_FETCH_START = "USER/USER_PROFILE_FETCH_START";
export const USER_PROFILE_FETCH_SUCCESS = "USER/USER_PROFILE_FETCH_SUCCESS";
export const USER_PROFILE_FETCH_ERROR = "USER/USER_PROFILE_FETCH_ERROR";
export const userProfileFetch = makeApiCall(userApi.userProfileFetch, USER_PROFILE_FETCH_START, USER_PROFILE_FETCH_SUCCESS, USER_PROFILE_FETCH_ERROR);

export const USER_EMAIL_REQUEST_START = "USER/USER_EMAIL_REQUEST_START";
export const USER_EMAIL_REQUEST_SUCCESS = "USER/USER_EMAIL_REQUEST_SUCCESS";
export const USER_EMAIL_REQUEST_ERROR = "USER/USER_EMAIL_REQUEST_ERROR";
export const userEmailRequest = makeApiCall(userApi.userEmailRequest, USER_EMAIL_REQUEST_START, USER_EMAIL_REQUEST_SUCCESS, USER_EMAIL_REQUEST_ERROR);

export const USER_EMAIL_CONFIRM_START = "USER/USER_EMAIL_CONFIRM_START";
export const USER_EMAIL_CONFIRM_SUCCESS = "USER/USER_EMAIL_CONFIRM_SUCCESS";
export const USER_EMAIL_CONFIRM_ERROR = "USER/USER_EMAIL_CONFIRM_ERROR";
export const userEmailConfirm = makeApiCall(userApi.userEmailConfirm, USER_EMAIL_CONFIRM_START, USER_EMAIL_CONFIRM_SUCCESS, USER_EMAIL_CONFIRM_ERROR);

export const USER_FORGOT_REQUEST_START = "USER/USER_FORGOT_REQUEST_START";
export const USER_FORGOT_REQUEST_SUCCESS = "USER/USER_FORGOT_REQUEST_SUCCESS";
export const USER_FORGOT_REQUEST_ERROR = "USER/USER_FORGOT_REQUEST_ERROR";
export const userForgotPassword = makeApiCall(userApi.userForgotPassword, USER_FORGOT_REQUEST_START, USER_FORGOT_REQUEST_SUCCESS, USER_FORGOT_REQUEST_ERROR);

export const USER_FORGOT_RESET_START = "USER/USER_FORGOT_RESET_START";
export const USER_FORGOT_RESET_SUCCESS = "USER/USER_FORGOT_RESET_SUCCESS";
export const USER_FORGOT_RESET_ERROR = "USER/USER_FORGOT_RESET_ERROR";
export const userForgotPasswordReset = makeApiCall(userApi.userForgotPasswordReset, USER_FORGOT_RESET_START, USER_FORGOT_RESET_SUCCESS, USER_FORGOT_RESET_ERROR);

export const USER_ONBOARDING_SAVE_START = "USER/USER_ONBOARDING_SAVE_START";
export const USER_ONBOARDING_SAVE_SUCCESS = "USER/USER_ONBOARDING_SAVE_SUCCESS";
export const USER_ONBOARDING_SAVE_ERROR = "USER/USER_ONBOARDING_SAVE_ERROR";
export const userSaveOnboarding = makeApiCall(userApi.userSaveOnboarding, USER_ONBOARDING_SAVE_START, USER_ONBOARDING_SAVE_SUCCESS, USER_ONBOARDING_SAVE_ERROR);

export const USER_ONBOARDING_FETCH_START = "USER/USER_ONBOARDING_FETCH_START";
export const USER_ONBOARDING_FETCH_SUCCESS = "USER/USER_ONBOARDING_FETCH_SUCCESS";
export const USER_ONBOARDING_FETCH_ERROR = "USER/USER_ONBOARDING_FETCH_ERROR";
export const userGetOnboarding = makeApiCall(userApi.userGetOnboarding, USER_ONBOARDING_FETCH_START, USER_ONBOARDING_FETCH_SUCCESS, USER_ONBOARDING_FETCH_ERROR);

export const USER_BOOKMARKS_FETCH_START = "USER/USER_BOOKMARKS_FETCH_START";
export const USER_BOOKMARKS_FETCH_SUCCESS = "USER/USER_BOOKMARKS_FETCH_SUCCESS";
export const USER_BOOKMARKS_FETCH_ERROR = "USER/USER_BOOKMARKS_FETCH_ERROR";
export const userGetBookmarks = makeApiCall(userApi.userGetBookmarks, USER_BOOKMARKS_FETCH_START, USER_BOOKMARKS_FETCH_SUCCESS, USER_BOOKMARKS_FETCH_ERROR);

export const USER_BOOKMARK_ADD_START = "USER/USER_BOOKMARK_ADD_START";
export const USER_BOOKMARK_ADD_SUCCESS = "USER/USER_BOOKMARK_ADD_SUCCESS";
export const USER_BOOKMARK_ADD_ERROR = "USER/USER_BOOKMARK_ADD_ERROR";
export const userAddBookmark = makeApiCall(userApi.userAddBookmark, USER_BOOKMARK_ADD_START, USER_BOOKMARK_ADD_SUCCESS, USER_BOOKMARK_ADD_ERROR);

export const USER_BOOKMARK_REMOVE_START = "USER/USER_BOOKMARK_REMOVE_START";
export const USER_BOOKMARK_REMOVE_SUCCESS = "USER/USER_BOOKMARK_REMOVE_SUCCESS";
export const USER_BOOKMARK_REMOVE_ERROR = "USER/USER_BOOKMARK_REMOVE_ERROR";
export const userRemoveBookmark = makeApiCall(userApi.userRemoveBookmark, USER_BOOKMARK_REMOVE_START, USER_BOOKMARK_REMOVE_SUCCESS, USER_BOOKMARK_REMOVE_ERROR);

export const LOGIN_SUCCESS_PERSIST = "USER/LOGIN_SUCCESS_PERSIST";
export const LOGOUT = "USER/LOGOUT";
