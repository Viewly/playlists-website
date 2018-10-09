import { get } from './request';

export async function playlistsFetch (baseUrl) {
  const url = `${baseUrl}/playlists`;
  const { body } = await get(url);

  return body;
}
