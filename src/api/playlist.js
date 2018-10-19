import { get, post } from './request';

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

export async function playlistSearch (baseUrl, { query }) {
  const url = `${baseUrl}/playlists?title=${query}`;
  const { body } = await get(url);

  return body;
}

export async function playlistSuggestVideo (baseUrl, { playlistId, description, url, email }) {
  const requestUrl = `${baseUrl}/suggestion`;
  const { body } = await post(requestUrl, {
    playlist_id: playlistId,
    description,
    url,
    email
  });

  return body;
}
