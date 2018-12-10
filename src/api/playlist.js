import { get, post, put } from "./request";

export async function playlistFetch (baseUrl, { authorization, playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await get(url, {}, { authorization });

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

  const { body } = await get(url, {}, { authorization: params.authorization });

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

  const { body } = await get(url, {}, { authorization: params.authorization });

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

  // should only return body, but this is temporary hack until response includes this data
  const { authorization, ...playlistData } = data; // eslint-disable-line
  return {
    ...playlistData,
    id: body.id
  }
}

export async function playlistUpdate (baseUrl, data) {
  const { body } = await put(`${baseUrl}/playlist`, data);

  // should only return body, but this is temporary hack until response includes this data
  const { authorization, ...playlistData } = data; // eslint-disable-line
  return {
    ...playlistData,
    // id: body.id
  }
}

export async function videoPrefil (baseUrl, { url }) {
  const { body } = await get(`${baseUrl}/video-prefill?url=${url}`);

  return body;
}

export async function playlistAddVideo (baseUrl, { video_id, playlist_id, title, description, thumbnail_url, position }) {
  const { body } = await post(`${baseUrl}/add-video`, {
    video_id,
    playlist_id,
    title,
    description,
    thumbnail_url,
    position
  });

  return body;
}

export async function playlistRemoveVideo (baseUrl, { video_id, playlist_id }) {
  const { body } = await post(`${baseUrl}/remove-video`, {
    video_id,
    playlist_id
  });

  return body;
}

export async function playlistReorderVideos (baseUrl, { videos, playlist_id }) {
  const { body } = await post(`${baseUrl}/playlist-reorder/${playlist_id}`, videos);

  return body;
}
