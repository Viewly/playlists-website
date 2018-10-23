import { get, post } from './request';

export async function playlistFetch (baseUrl, { playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await get(url);

  return body;
}

export async function playlistsFetch (baseUrl) {
  const url = `${baseUrl}/playlists?status=published`;
  const { body } = await get(url);

  return body;
}

export async function playlistSearch (baseUrl, { query }) {
  const url = `${baseUrl}/playlists?status=published&title=${query}`;
  const { body } = await get(url);

  return body;
}

export async function playlistSuggestVideo (baseUrl, { playlistId, description, url, email }) {
  const requestUrl = `${baseUrl}/suggestion`;
  const { body } = await post(requestUrl, {
    playlist_id: playlistId,
    type: 'suggest-video',
    description,
    url,
    email
  });

  return body;
}

export async function playlistCreateNew (baseUrl, { title, description, email, category }) {
  const requestUrl = `${baseUrl}/suggestion`;
  const { body } = await post(requestUrl, {
    type: 'new-playlist',
    title,
    description,
    email,
    category
  });

  return body;
}
