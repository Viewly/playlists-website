import { post } from './request';

export async function userLogin(baseUrl, { email, password }) {
  const url = `${baseUrl}/user/login`;
  const { body } = await post(url, { email, password });

  return body;
}

export async function userRegister(baseUrl, { name, email, password }) {
  const url = `${baseUrl}/user/register`;
  const { body } = await post(url, { name, email, password });

  return body;
}

