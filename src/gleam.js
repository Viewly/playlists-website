async function sendEvent(event, data) {
  window && window.Gleam && window.Gleam.push([ event, data ]);
  // if (PRODUCTION) {
  // }
}

export async function RegistrationEvent(email) {
  sendEvent("Vidflowsignup", email);
}

export async function PlaylistcreateEvent(data) {
  sendEvent("playlistcreate", data);
}

export async function WatchEvent(data) {
  sendEvent("watch", data);
}

export async function WatchTimeEvent() {
  const storageKey = "watchtime";
  const incrementSeconds = 5;
  const watchRequirement = 60; // 1 minute - 60, 1 hour - 3600
  const time = parseInt(localStorage.getItem(storageKey) || 0, 10);

  if (time + incrementSeconds >= watchRequirement) {
    console.log("GLEAM: DONE, LOG AND RESET");
    WatchEvent();
    localStorage.removeItem(storageKey);
  } else {
    console.log("GLEAM: TOTAL WATCHED", time + incrementSeconds, "/", watchRequirement);
    localStorage.setItem(storageKey, time + incrementSeconds);
  }
}
