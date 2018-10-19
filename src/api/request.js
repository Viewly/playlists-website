import axios from 'axios';

export async function get(url) {
  const response = await axios.get(url);
  return { body: response.data };
}

export async function put(url, data) {
  const response = await axios.put(url, data);
  return { body: response.data };
}

export async function post(url, data) {
  const response = await axios.post(url, data);
  return { body: response.data };
}

export async function patch(url, data) {
  const response = await axios.patch(url, data);
  return { body: response.data };
}

export function makeApiCall (_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const state = getState();

      // const apiBaseUrl = "http://142.93.105.235:3000/v1/api/";
      const apiBaseUrl = state.config.apiUrl;
      // const authenticationToken = state.authToken;

      dispatch({ ...params, type: startActionType });
      try {
        const data = await _apiCall(apiBaseUrl, params);
        dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        dispatch({ ...params, error, type: errorActionType });
        throw error;
      }
    };
  };
}


export function makeFunctionCall (func, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      dispatch({ ...params, type: startActionType });
      try {
        const data = await func(params);
        dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        dispatch({ ...params, error, type: errorActionType });
        throw error;
      }
    };
  };
}
