import { makeApiCall } from '../api/request';
import * as userApi from '../api/user';

export const USER_LOGIN_START = 'USER/USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER/USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER/USER_LOGIN_ERROR';
export const userLogin = makeApiCall(userApi.userLogin, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR);

export const USER_REGISTRATION_START = 'USER/USER_REGISTRATION_START';
export const USER_REGISTRATION_SUCCESS = 'USER/USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_ERROR = 'USER/USER_REGISTRATION_ERROR';
export const userRegister = makeApiCall(userApi.userRegister, USER_REGISTRATION_START, USER_REGISTRATION_SUCCESS, USER_REGISTRATION_ERROR);
