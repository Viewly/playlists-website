import { get, post, put, del } from "./request";

export async function userLogin(baseUrl, { email, password }) {
  const url = `${baseUrl}/user/login`;
  const { body } = await post(url, { email, password });

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

export async function userProfileUpdate(baseUrl, { authorization, alias, first_name, last_name, avatar_url }) {
  const url = `${baseUrl}/user/info`;
  const { body } = await put(url, { alias, first_name, last_name, avatar_url }, { authorization });

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

export async function fetchUserProfile(baseUrl, { authorization, alias }) {
  const url = `${baseUrl}/user/info?alias=${alias}`;
  const { body } = await get(url, {}, { authorization });

  return body;
}

export async function getSocialLoginUrl(baseUrl, { platform = 'google' }) {
  return `${baseUrl}/user/auth?platform=${platform}`;
}

export async function doSocialLogin(baseUrl, { platform = 'google', params }) {
  const url = `${baseUrl}/user/auth/${platform}`;
  const queryUrl = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');

  const { body } = await get(`${url}?${queryUrl}`);

  return body;
}
