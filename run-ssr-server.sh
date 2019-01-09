#!/bin/sh
mkdir -p dist
aws s3 cp s3://viewly-playlists-website/index.html dist/
aws s3 cp s3://viewly-playlists-website/favicon.ico dist/
npm run ssr-build
npm run ssr-start
