import { get, post } from './request';

export async function playlistFetch (baseUrl, { playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await get(url);

  return body;
}

export async function playlistsFetch (baseUrl, params) {
  let url = params && params.query
    ? `${baseUrl}/playlists?status=published&${params.query}`
    : `${baseUrl}/playlists?status=published`

  if (params.page) {
    url += `&page=${params.page}`;
  }

  if (params.limit) {
    url += `&limit=${params.limit}`;
  }

  const { body } = await get(url);

  return body;
}

export async function playlistsLoadMore (baseUrl, params) {
  let url = params && params.query
    ? `${baseUrl}/playlists?status=published&${params.query}`
    : `${baseUrl}/playlists?status=published`

  if (params.page) {
    url += `&page=${params.page}`;
  }

  if (params.limit) {
    url += `&limit=${params.limit}`;
  }

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

export async function categoriesFetch (baseUrl) {
  const { body } = await get(`${baseUrl}/categories`);

  return body;
}
