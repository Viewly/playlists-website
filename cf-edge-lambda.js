// This script can only run as "Origin Requests" CF lambda@edge function.
// It will change the origin from s3 to a custom SSR server
// if the ssr cookie isn't present.
'use strict';

let isValidObj = function (obj) {
  return !(
    obj === undefined
    || obj === ''
    || obj === null);
};

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // this is a page, and not an asset like foo(.)png
  if (request.uri.indexOf('.') >= 0) {
    callback(null, request);
    return;
  }

  // the user cookie is present, not a bot
  let hasCookie = false;
  if (isValidObj(headers) && isValidObj(headers.cookie)) {
    for (let i = 0; i < headers.cookie.length; i++) {
      if (headers.cookie[i].value.indexOf('ssr=1') >= 0) {
        hasCookie = true;
        break;
      }
    }
  }

  if (!hasCookie) {
    /* Set custom origin fields*/
    request.origin = {
      custom: {
        domainName: 'ssr.vidflow.io',
        port: 443,
        protocol: 'https',
        path: '', // request.uri??
        sslProtocols: ['TLSv1', 'TLSv1.1'],
        readTimeout: 15,
        keepaliveTimeout: 15,
        customHeaders: {}
      }
    };
    request.headers['host'] = [{ key: 'host', value: 'ssr.vidflow.io'}];
  }

  callback(null, request);
};
