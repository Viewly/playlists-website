async function sendEvent(event, data) {
  // if (PRODUCTION) {
    window && window.Gleam && window.Gleam.push([event, data]);
  // }
}

export async function RegistrationEvent(email) {
  sendEvent("Vidflowsignup", email);
}

