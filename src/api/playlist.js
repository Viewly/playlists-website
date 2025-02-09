import { del, get, post, put } from "./request";
import { getMeta } from "../analytics";

export async function playlistFetch (baseUrl, { authorization, playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await get(url, {}, { authorization });

  return body;
}

export async function playlistRemove (baseUrl, { authorization, playlistId }) {
  const url = `${baseUrl}/playlist/${playlistId}`;
  const { body } = await del(url, {}, { authorization });

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

export async function hashtagsFetch (baseUrl, { limit = 56 }) {
  const { body } = await get(`${baseUrl}/hashtags?limit=${limit}`);

  return body;
}

export async function playlistCreate (baseUrl, data) {
  const { authorization, ...playlistData } = data; // eslint-disable-line
  const { body } = await post(`${baseUrl}/playlist`, playlistData, { authorization });

  // should only return body, but this is temporary hack until response includes this data
  return {
    ...playlistData,
    id: body.id
  }
}

export async function playlistUpdate (baseUrl, data) {
  const { authorization, ...playlistData } = data; // eslint-disable-line
  const { body } = await put(`${baseUrl}/playlist`, playlistData, { authorization });

  // should only return body, but this is temporary hack until response includes this data
  return {
    ...playlistData,
    // id: body.id
  }
}

export async function videoPrefil (baseUrl, { authorization, url }) {
  const { body } = await get(`${baseUrl}/video-prefill?url=${url}`, {}, { authorization });

  return body;
}

export async function playlistAddVideo (baseUrl, { authorization, video_id, playlist_id, title, description, thumbnail_url, position }) {
  const { body } = await post(`${baseUrl}/add-video`, {
    video_id,
    playlist_id,
    title,
    description,
    thumbnail_url,
    position
  }, { authorization });

  return body;
}

export async function playlistRemoveVideo (baseUrl, { authorization, video_id, playlist_id }) {
  const { body } = await post(`${baseUrl}/remove-video`, {
    video_id,
    playlist_id
  }, { authorization });

  return body;
}

export async function playlistReorderVideos (baseUrl, { authorization, videos, playlist_id }) {
  const { body } = await post(`${baseUrl}/playlist-reorder/${playlist_id}`, videos, { authorization });

  return body;
}

export async function playlistUpdateVideo (baseUrl, { authorization, id, title, description }) {
  const { body } = await put(`${baseUrl}/video`, { id, title, description }, { authorization });

  return body;
}

export async function playlistCommentsFetch (baseUrl, { authorization, playlist_id }) {
  const { body } = await get(`${baseUrl}/reviews/${playlist_id}`, {}, { authorization });

  return body;
}

export async function playlistAddComment (baseUrl, { authorization, playlist_id, title = "", description = "" }) {
  const { body } = await post(`${baseUrl}/review`, { playlist_id, title, description }, { authorization });

  return body;
}

export async function playlistDeleteComment (baseUrl, { authorization, review_id }) {
  const { body } = await del(`${baseUrl}/review/${review_id}`, {}, { authorization });

  return body;
}

export async function playlistVoteComment (baseUrl, { authorization, playlist_id, review_id, status }) {
  const { body } = await post(`${baseUrl}/review-like`, { playlist_id, review_id, status }, { authorization });

  return body;
}

export async function playlistViews (baseUrl, { playlistId }) {
  const { body } = await get(`https://vidflow-analytics-api.view.ly/daily_playlist_views/${playlistId}`);

  return body;
}

export async function playlistFetchProgresses (baseUrl, { playlistId }) {
  const analyticsMeta = getMeta();
  const { body } = await get(`https://vidflow-analytics-api.view.ly/playlist_handoff/${playlistId}/${analyticsMeta.user_id || analyticsMeta.cookie_id}`);

  return body;
}

export async function playlistImportPlaylist (baseUrl, { authorization, yt_url, playlist_id }) {
  const { body } = await post(`${baseUrl}/playlist-import`, { yt_url, playlist_id }, { authorization });

  return body;
}

export async function playlistsFetchNew (baseUrl, params) {
  let url = `${baseUrl}/playlists?status=published&order=publish_date`;

  if (params && params.page) {
    url += `&page=${params.page}`;
  }

  if (params && params.limit) {
    url += `&limit=${params.limit}`;
  }

  const { body } = await get(url, {}, { authorization: params.authorization });

  return body;
}

export async function playlistsFetchPicked (baseUrl, params) {
  let url = `${baseUrl}/playlists?type=featured_monthly&page=0&limit=${params.limit || 6}`;
  if (params.category_id) { url += `&category_id=${params.category_id}` }
  if (params.tag) { url += `&tag=${params.tag}` }

  const { body } = await get(encodeURI(url), {}, { authorization: params.authorization });

  return body.sort((a,b) => b.watch_pct - a.watch_pct);
}

export async function playlistsFetchHashtag (baseUrl, params) {
  const url = `${baseUrl}/playlists?status=published&order=publish_date&page=0&limit=${params.limit}&q=${params.query}`;

  const { body } = await get(url, {}, { authorization: params.authorization });

  return body;
}

export async function fetchPurchases (baseUrl, params) {
  const url = `${baseUrl}/playlists?status=published&order=publish_date&purchased=true`;

  const { body } = await get(url, {}, { authorization: params.authorization });

  return body;
}

export async function playlistsFetchWatchHistory (baseUrl, params) {
  const url = `${baseUrl}/playlists?status=published&type=watch_history&page=0&limit=${params.limit}`;

  const { body } = await get(url, {}, { authorization: params.authorization });

  return body;
}

export async function playlistPurchase (baseUrl, { authorization, price, playlist_id, stripeData }) {
  const { body } = await post(`${baseUrl}/payment/charge`, { price, playlist_id, stripeData }, { authorization });

  return body;
}
