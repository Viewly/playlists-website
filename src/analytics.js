import Cookies from "universal-cookie";
import uuid from "uuid/v1";
import { put } from "./api/request";

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

async function sendEvent(type, data) {
  const meta = getMeta();
  const response = await put(EVENT_URL, { type, data, meta });

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

export async function HomepageEvent() {
  const time_on_page_seconds = getUnixTimestamp() - times["HOME_PAGE"];

  console.log("TIME SPENT ON PAGE", time_on_page_seconds);
}
