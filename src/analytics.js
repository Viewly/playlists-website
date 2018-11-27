import Cookies from "universal-cookie";
import uuid from "uuid/v1";
import queryString from "query-string";
import { put } from "./api/request";
import { HOME_PAGE, PLAYLIST_PAGE, SEARCH_PAGE, PLAYER_PAGE } from "./constants/pages";
import { getLocale, getTimezone, getBrowser, getOs, getResolution, getDevice } from "./utils";

const EVENT_URL = "https://vidflow-analytics.view.ly/log_event";
const ANALYTICS_COOKIE = "analytics";
const cookies = new Cookies();

let times = {};
let user_id = undefined;

function getUnixTimestamp() {
  return Math.round(+(new Date())/1000);
}

function getMeta() {
  const analyticsCookie = cookies.get(ANALYTICS_COOKIE);
  return {
    cookie_id: analyticsCookie,
    user_id
  };
}

async function sendEvent(event_type, data) {
  if (PRODUCTION) {
    const meta = getMeta();
    const response = await put(EVENT_URL, { event_type, data, meta });

    return response;
  }
}

export async function pageLoad(page) {
  const time = getUnixTimestamp();

  times[page] = time;
}

export async function SetUserId(current_user_id) {
  user_id = current_user_id;
}

export async function RegisterCookie() {
  sendEvent("RegisterCookie", {
    locale: getLocale(),
    local_timezone: getTimezone(),
    location: "",
    browser: getBrowser(),
    os: getOs(),
    cpu: "",
    gpu: "",
    screen_resolution: getResolution(),
    device_type: getDevice(), // 1 = pc, 2 = mobile, 3 = other
    // is_vpn: false
  });
}

export async function FirstLoadEvent() {
  const analyticsCookie = cookies.get(ANALYTICS_COOKIE);

  if (!analyticsCookie) {
    const id = uuid();
    cookies.set(ANALYTICS_COOKIE, id, { path: "/" });
    RegisterCookie();
  }
}

export async function HomepageEvent(data) {
  const time_on_page_seconds = getUnixTimestamp() - times[HOME_PAGE];

  let homepageData = {
    referrer_url: document && document.referrer,
    time_on_page_seconds
  };

  if (data.toRoute && data.toRoute.analytics && data.toRoute.analytics.pageName === PLAYLIST_PAGE) {
    homepageData.click_playlist_id = data.toRoute.params.playlistId;
  } else {
    homepageData.click_other_url = data.toUrl;
  }

  sendEvent("HomepageEvent", homepageData);
}

export async function SearchEvent(data) {
  const time_on_page_seconds = getUnixTimestamp() - times[SEARCH_PAGE];
  const parsed = queryString.parse(data.prevLocation ? data.prevLocation.search : document.location.search);

  let searchData = {
    time_on_page_seconds,
    pagination: 0,
    query: parsed.query
  };

  if (data.toRoute && data.toRoute.params && data.toRoute.params.playlistId) {
    searchData.click_playlist_id = data.toRoute.params.playlistId;
  } else {
    searchData.click_other_url = data.toUrl;
  }

  sendEvent("SearchEvent", searchData);
}

export async function PlaylistEvent(data) {
  const time_on_page_seconds = getUnixTimestamp() - times[PLAYLIST_PAGE];
  let playlistData = {
    time_on_page_seconds,
    playlist_id: data.fromRoute.params.playlistId
  };

  if (data.toRoute && data.toRoute.params && data.toRoute.params.videoId) {
    playlistData.click_video_id = data.toRoute.params.videoId;
  } else {
    playlistData.click_other_url = data.toUrl;
  }

  sendEvent("PlaylistEvent", playlistData);
}

export async function PlayerEvent(data) {
  const time_on_page_seconds = getUnixTimestamp() - times[PLAYER_PAGE];

  let playlistData = {
    time_on_page_seconds,
    playlist_id: data.fromRoute.params.playlistId,
    video_id: data.fromRoute.params.videoId,
    playback_state: -1
  };

  if (data.toRoute && data.toRoute.params && data.toRoute.params.videoId) {
    playlistData.click_video_id = data.toRoute.params.videoId;
  } else {
    playlistData.click_other_url = data.toUrl;
  }

  sendEvent("PlayerEvent", playlistData);
}

export async function TriggerPlayerEvent(data) {
  const time_on_page_seconds = getUnixTimestamp() - times[PLAYER_PAGE];
  const playlistData = {
    time_on_page_seconds,
    playlist_id: data.playlist_id,
    video_id: data.video_id,
    playback_state: -1,
    ...data
  };
  sendEvent("PlayerEvent", playlistData);
}

export async function TriggerPlayerError(data) {
  const playlistData = {
    playlist_id: data.playlist_id,
    video_id: data.video_id,
    ...data
  };
  sendEvent("PlayerError", playlistData);
}

export async function triggerEvent(type, data = undefined) {
  switch (type) {
    case "HomepageEvent": HomepageEvent(data); break;
    case "SearchEvent": SearchEvent(data); break;
    case "PlaylistEvent": PlaylistEvent(data); break;
    case "PlayerEvent": PlayerEvent(data); break;
  }
}
