#!/bin/sh
aws s3 cp s3://viewly-playlists-website/index.html .
npm run ssr-build
npm run ssr-start
