import 'isomorphic-fetch';

export function loadPlaylists() {
  return fetch(`https://api.vidflow.io/v1/api/playlists`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};
