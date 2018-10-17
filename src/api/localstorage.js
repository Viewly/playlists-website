import { getPlaylistProgress, savePlaylistProgress } from "../utils";

export async function updatePercentage ({ playlistId, videoId, percentage, currentTime }) {
  const playlist = getPlaylistProgress(playlistId);

  playlist[videoId] = { percentage, currentTime };
  savePlaylistProgress(playlistId, playlist);

  return { playlistId, videoId, percentage, currentTime };
}
