import { put } from "./api/request";

const EVENT_URL = "https://vidflow-analytics.view.ly/log_event";

let times = {};

function getUnixTimestamp() {
  return Math.round(+(new Date())/1000);
}
function getMeta() {
  return {
    cookie_id: "123"
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
    locale: "",
    local_timezone: "",
    location: "",
    browser: "",
    os: "",
    cpu: "",
    gpu: "",
    screen_resolution: "1920x1080",
    device_type: 1, // 1 = pc, 2 = mobile, 3 = other
    is_vpn: false
  });

  console.log("LOGGED", temp);
}

export async function HomepageEvent() {
  const time_on_page_seconds = getUnixTimestamp() - times["HOME_PAGE"];

  console.log("TIME SPENT ON PAGE", time_on_page_seconds);
}
