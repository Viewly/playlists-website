import moment from 'moment';
import 'moment-duration-format';

export function convertYoutubeDuration (duration) {
  return moment
    .duration(duration)
    .format('h:mm:ss')
    .padStart(4, '0:0');
}

export function getPlaylistProgress(playlistId) {
  const storageKey = `progress-${playlistId}`;
  const playlist = JSON.parse(localStorage.getItem(storageKey)) || {};

  return playlist;
}

export function savePlaylistProgress(playlistId, playlist) {
  const storageKey = `progress-${playlistId}`;
  localStorage.setItem(storageKey, JSON.stringify(playlist));
}

export function updateVideosWithProgresses(videos, progresses) {
  const keys = Object.keys(progresses);

  if (keys.length) {
    videos.map(item => {
      if (keys.includes("" + item.id)) { // this converts id to string, because keys are strings
        item.percentage = progresses[item.id];
      }

      return item;
    })
  }

  return videos;
}
