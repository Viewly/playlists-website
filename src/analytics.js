import Cookies from "universal-cookie";
import uuid from "uuid/v1";
import queryString from "query-string";
import { put } from "./api/request";
import { PLAYLIST_PAGE } from "./constants/pages";

const EVENT_URL = "https://vidflow-analytics.view.ly/log_event";
const ANALYTICS_COOKIE = "analytics";
const cookies = new Cookies();

let times = {};

function getUnixTimestamp() {
  return Math.round(+(new Date())/1000);
}

function getMeta() {
  const analyticsCookie = cookies.get(ANALYTICS_COOKIE);
  return {
    cookie_id: analyticsCookie
  };
}

async function sendEvent(event_type, data) {
  const meta = getMeta();
  const response = await put(EVENT_URL, { event_type, data, meta });

  return response;
}

export async function pageLoad(page) {
  const time = getUnixTimestamp();

  times[page] = time;
}

export async function RegisterCookie() {
  const temp = await sendEvent("RegisterCookie", {
    locale: "en",
    local_timezone: "",
    location: "",
    browser: "",
    os: "mac",
    cpu: "",
    gpu: "",
    screen_resolution: "1920x1080",
    device_type: 1, // 1 = pc, 2 = mobile, 3 = other
    // is_vpn: false
  });

  console.log("LOGGED", temp);
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
  const time_on_page_seconds = getUnixTimestamp() - times["HOME_PAGE"];

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
  const time_on_page_seconds = getUnixTimestamp() - times["SEARCH_PAGE"];
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

export async function triggerEvent(type, data = undefined) {
  console.log("TRIGGER", type);
  console.log("with data", data);
  switch (type) {
    case "HomepageEvent": HomepageEvent(data); break;
    case "SearchEvent": SearchEvent(data); break;
  }
}
