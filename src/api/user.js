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

export async function doGoogleLogin(baseUrl, { code }) {
  const url = `${baseUrl}/user/youtube-login`;
  const { body } = await post(url, { code });

  return body;
}

export async function userRegister(baseUrl, { first_name, last_name, email, password }) {
  const url = `${baseUrl}/user/register`;
  const { body } = await post(url, { first_name, last_name, email, password });

  return body;
}

export async function userProfileFetch(baseUrl, { authenticationToken }) {
  const url = `${baseUrl}/user/info`;
  const { body } = await get(url, { authenticationToken });

  return body;
}

export async function userProfileUpdate(baseUrl, { authenticationToken, first_name, last_name, avatar_url }) {
  const url = `${baseUrl}/user/info`;
  const { body } = await put(url, { authenticationToken, first_name, last_name, avatar_url });

  return body;
}

export async function userEmailRequest(baseUrl, { authenticationToken, email }) {
  const url = `${baseUrl}/user/confirm-email-request`;
  const { body } = await post(url, { authenticationToken, email });

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

export async function userSaveOnboarding(baseUrl, { authenticationToken, categories_ids }) {
  const url = `${baseUrl}/user/onboarding`;
  const { body } = await put(url, { authenticationToken, categories_ids });

  return body;
}

export async function userGetOnboarding(baseUrl, { authenticationToken }) {
  const url = `${baseUrl}/user/onboarding`;
  const { body } = await get(url, { authenticationToken });

  return body;
}

export async function userGetBookmarks(baseUrl, { authenticationToken }) {
  const url = `${baseUrl}/playlists?status=published&order=publish_date&bookmarked=true`;
  const { body } = await get(url, { authenticationToken });

  return body;
}

export async function userAddBookmark(baseUrl, { authenticationToken, playlist_id }) {
  const url = `${baseUrl}/user/bookmark`;
  const { body } = await post(url, { authenticationToken, playlist_id });

  return { body, playlist_id };
}

export async function userRemoveBookmark(baseUrl, { authenticationToken, playlist_id }) {
  const url = `${baseUrl}/user/bookmark/${playlist_id}`;
  const { body } = await del(url, { authenticationToken });

  return { body, playlist_id };
}
