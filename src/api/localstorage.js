export async function updatePercentage ({ playlistId, videoId, percentage }) {
  const storageKey = `progress-${playlistId}`;
  const playlist = JSON.parse(localStorage.getItem(storageKey)) || {};

  playlist[videoId] = percentage;
  localStorage.setItem(storageKey, JSON.stringify(playlist));

  return { playlistId, videoId, percentage };
}
