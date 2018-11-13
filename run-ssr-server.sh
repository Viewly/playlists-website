#!/bin/sh
mkdir -p dist
aws s3 cp s3://viewly-playlists-website/index.html dist/
npm run ssr-build
npm run ssr-start
