import moment from "moment";
import "moment-duration-format";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { LOADED } from "./constants/status_types";
import { COOKIE_SESSION } from "./constants";
import getUserLocale from "get-user-locale";
import guessTimezone from "guess-timezone";
import browserDetect from "browser-detect";
import isMobile from "is-mobile";
import uuid from "uuid/v1";

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

export function decodeJwt(jwt) {
  try {
    return jwtDecode(jwt);
  } catch (e) {
    return false;
  }
}

export function setUserCookie (jwt) {
  const cookies = new Cookies();

  cookies.set(COOKIE_SESSION, jwt, { path: "/" });
}

export function getUserCookie() {
  const cookies = new Cookies();

  return cookies.get(COOKIE_SESSION) || "";
}

export function unsetUserCookie() {
  const cookies = new Cookies();

  cookies.remove(COOKIE_SESSION);
}

export function getLocale() {
  const userLocale = getUserLocale();

  return userLocale;
}

export function getTimezone() {
  return guessTimezone.calc();
}

export function getBrowser() {
  const result = browserDetect();

  if (result) {
    return result.name;
  } else {
    return "unknown";
  }
}

export function getOs() {
  const result = browserDetect();

  if (result) {
    return result.os;
  } else {
    return "unknown";
  }
}

export function getResolution() {
  let width = window.screen.width;
  let height = window.screen.height;

  if (window.devicePixelRatio) {
    width *= window.devicePixelRatio;
    height *= window.devicePixelRatio;
  }

  return `${width}x${height}`;
}

export function getDevice() {
  if (!navigator.userAgent) {
    return 3;
  }

  return isMobile() ? 2 : 1;
}

export function generateUuid() {
  return uuid();
}
