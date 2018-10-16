import { getPlaylistProgress, savePlaylistProgress } from "../utils";

export async function updatePercentage ({ playlistId, videoId, percentage }) {
  const playlist = getPlaylistProgress(playlistId);

  playlist[videoId] = percentage;
  savePlaylistProgress(playlistId, playlist);

  return { playlistId, videoId, percentage };
}
