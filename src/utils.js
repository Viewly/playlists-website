import moment from "moment";
import "moment-duration-format";
import { LOADED } from "./constants/status_types";

export function convertYoutubeDuration (duration) {
  return moment
    .duration(duration)
    .format("h:mm:ss")
    .padStart(4, "0:0");
}

export function sumVideoDurations (videos) {
  const start = moment.duration();
  videos.forEach(video => {
    start.add(moment.duration(video.duration));
  });
  return convertYoutubeDuration(start.toString());
}

export function getPlaylistProgress(playlistId) {
  if (SERVER) {
    return {};
  }
  const storageKey = `progress-${playlistId}`;
  const playlist = JSON.parse(localStorage.getItem(storageKey)) || {};

  return playlist;
}

export function savePlaylistProgress(playlistId, playlist) {
  if (SERVER) {
    return false;
  }
  const storageKey = `progress-${playlistId}`;
  localStorage.setItem(storageKey, JSON.stringify(playlist));
}

export function updateVideosWithProgresses(videos, progresses) {
  const keys = Object.keys(progresses);

  if (keys.length) {
    videos.map(item => {
      if (keys.includes("" + item.id)) { // this converts id to string, because keys are strings
        item.percentage = progresses[item.id].percentage;
        item.currentTime = progresses[item.id].currentTime;
      }

      return item;
    });
  }

  return videos;
}

export function isLoaded(item) {
  return item && item._status === LOADED;
}

export function asyncLoad (asyncFunc) {
  return b => Object.assign(b, { asyncLoad: asyncFunc });
}
