import { get, post, put, del } from "./request";

export async function userLogin(baseUrl, { email, password }) {
  const url = `${baseUrl}/user/login`;
  const { body } = await post(url, { email, password });

  return body;
}

export async function getGoogleLoginUrl(baseUrl) {
  const url = `${baseUrl}/user/auth`;
  const { body } = await get(url);

  return body;
}

export async function doGoogleLogin(baseUrl) {
  const url = `http://localhost:3001/v1/api/user/auth?platform=google`;
  window.location.replace(url);
}

export async function passLoginInfo(baseUrl, { platform, params }) {
  console.log(platform, params, "???");
  const url = `${baseUrl}/user/auth/${platform || 'google'}`;

  let things = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');

  const { body } = await get(url + `?${things}`);

  return body;
}

export async function userRegister(baseUrl, { first_name, last_name, email, password }) {
  const url = `${baseUrl}/user/register`;
  const { body } = await post(url, { first_name, last_name, email, password });

  return body;
}

export async function userProfileFetch(baseUrl, { authorization }) {
  const url = `${baseUrl}/user/info`;
  const { body } = await get(url, {}, { authorization });

  return body;
}

export async function userProfileUpdate(baseUrl, { authorization, first_name, last_name, avatar_url }) {
  const url = `${baseUrl}/user/info`;
  const { body } = await put(url, { first_name, last_name, avatar_url }, { authorization });

  return body;
}

export async function userProfileUpdatePassword(baseUrl, { authorization, current_password, new_password }) {
  const url = `${baseUrl}/user/change-password`;
  const { body } = await put(url, { current_password, new_password }, { authorization });

  return body;
}

export async function userEmailRequest(baseUrl, { authorization, email }) {
  const url = `${baseUrl}/user/confirm-email-request`;
  const { body } = await post(url, { email }, { authorization });

  return body;
}

export async function userEmailConfirm(baseUrl, { token }) {
  const url = `${baseUrl}/user/confirm-email`;
  const { body } = await post(url, { email_confirm_token: token });

  return body;
}

export async function userForgotPassword(baseUrl, { email }) {
  const url = `${baseUrl}/user/reset-password-request`;
  const { body } = await post(url, { email });

  return body;
}

export async function userForgotPasswordReset(baseUrl, { token, password }) {
  const url = `${baseUrl}/user/reset-password`;
  const { body } = await post(url, { password_reset_token: token, password });

  return body;
}

export async function userSaveOnboarding(baseUrl, { authorization, categories_ids }) {
  const url = `${baseUrl}/user/onboarding`;
  const { body } = await put(url, { categories_ids }, { authorization });

  return body;
}

export async function userGetOnboarding(baseUrl, { authorization }) {
  const url = `${baseUrl}/user/onboarding`;
  const { body } = await get(url, {}, { authorization });

  return body;
}

export async function userGetBookmarks(baseUrl, { authorization }) {
  const url = `${baseUrl}/playlists?status=published&order=publish_date&bookmarked=true`;
  const { body } = await get(url, {}, { authorization });

  return body;
}

export async function userAddBookmark(baseUrl, { authorization, playlist_id }) {
  const url = `${baseUrl}/user/bookmark`;
  const { body } = await post(url, { playlist_id }, { authorization });

  return { body, playlist_id };
}

export async function userRemoveBookmark(baseUrl, { authorization, playlist_id }) {
  const url = `${baseUrl}/user/bookmark/${playlist_id}`;
  const { body } = await del(url, {}, { authorization });

  return { body, playlist_id };
}

export async function fetchMyPlaylists(baseUrl, { authorization }) {
  const url = `${baseUrl}/playlists?order=publish_date&mine=true`;
  const { body } = await get(url, {}, { authorization });

  return body;
}
