import { get, post } from "./request";

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

export async function userRegister(baseUrl, { name, email, password }) {
  const url = `${baseUrl}/user/register`;
  const { body } = await post(url, { name, email, password });

  return body;
}

export async function userProfileFetch(baseUrl, { authenticationToken }) {
  const url = `${baseUrl}/user/info`;
  const { body } = await get(url, { authenticationToken });

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

