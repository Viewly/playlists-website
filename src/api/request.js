import axios from "axios";

export async function get(url, data = {}, headers = {}) {
  const response = await axios.get(url, { headers });
  return { body: response.data };
}

export async function put(url, data = {}, headers = {}) {
  const response = await axios.put(url, data, { headers });
  return { body: response.data };
}

export async function post(url, data = {}, headers = {}) {
  const response = await axios.post(url, data, { headers });
  return { body: response.data };
}

export async function patch(url, data = {}, headers = {}) {
  const response = await axios.patch(url, data, { headers });
  return { body: response.data };
}

export async function upload(url, formData, callback) {
  const config = {
    onUploadProgress: evnt => {
      const percentage = Math.round(100 * evnt.loaded / evnt.total);
      callback && callback(percentage);
    },
    headers: {
      'Content-Type': formData.type
    }
  }
  const response = await axios.put(url, formData, config);
  return { body: response.data };
}

export async function del(url, data = {}, headers = {}) {
  const response = await axios.delete(url, { params: data, headers });
  return { body: response.data };
}

export function makeApiCall (_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const state = getState();

      // const apiBaseUrl = "http://142.93.105.235:3000/v1/api/";
      const apiBaseUrl = state.config.apiUrl;
      const authorization = state.jwt;

      startActionType && dispatch({ ...params, type: startActionType });
      try {
        const data = await _apiCall(apiBaseUrl, { ...params, authorization });
        successActionType && dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        errorActionType && dispatch({ ...params, error, type: errorActionType });
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
