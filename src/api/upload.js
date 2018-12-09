import { post, upload } from "./request";

export async function getUploadUrl(baseUrl, { key, type }) {
  const url = `${baseUrl}/upload-file`;
  const { body } = await post(url, { key, type });

  return body;
}

export async function uploadFile(baseUrl, { url, data, callback}) {
  const { body } = await upload(url, data, callback);

  return body;
}
