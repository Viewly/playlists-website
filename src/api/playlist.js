import { get } from './request';

export async function playlistFetch (baseUrl, { playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await get(url);

  return body;
}

export async function playlistsFetch (baseUrl) {
  const url = `${baseUrl}/playlists`;
  const { body } = await get(url);

  return body;
}
