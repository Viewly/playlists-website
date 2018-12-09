import { get, post } from "./request";

export async function playlistFetch (baseUrl, { authenticationToken, playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await get(url, { authenticationToken });

  return body;
}

export async function playlistsFetch (baseUrl, params) {
  let url = params && params.query
    ? `${baseUrl}/playlists?status=published&order=publish_date&${params.query}`
    : `${baseUrl}/playlists?status=published&order=publish_date`;

  if (params && params.page) {
    url += `&page=${params.page}`;
  }

  if (params && params.limit) {
    url += `&limit=${params.limit}`;
  }

  const { body } = await get(url, { authenticationToken: params.authenticationToken });

  return body;
}

export async function playlistsLoadMore (baseUrl, params) {
  let url = params && params.query
    ? `${baseUrl}/playlists?status=published&order=publish_date&${params.query}`
    : `${baseUrl}/playlists?status=published&order=publish_date`;

  if (params && params.page) {
    url += `&page=${params.page}`;
  }

  if (params && params.limit) {
    url += `&limit=${params.limit}`;
  }

  const { body } = await get(url, { authenticationToken: params.authenticationToken });

  return body;
}

export async function playlistSuggestVideo (baseUrl, { playlistId, description, url, email }) {
  const requestUrl = `${baseUrl}/suggestion`;
  const { body } = await post(requestUrl, {
    playlist_id: playlistId,
    type: "suggest-video",
    description,
    url,
    email
  });

  return body;
}

export async function playlistCreateNew (baseUrl, { title, description, email, category }) {
  const requestUrl = `${baseUrl}/suggestion`;
  const { body } = await post(requestUrl, {
    type: "new-playlist",
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

export async function hashtagsFetch (baseUrl) {
  const { body } = await get(`${baseUrl}/hashtags?limit=56`);

  return body;
}

export async function playlistCreate (baseUrl, data) {
  const { body } = await post(`${baseUrl}/playlist`, data);

  return body;
}
