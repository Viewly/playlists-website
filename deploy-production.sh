#!/bin/sh
npm run build
if [ -d "dist" ]; then
  cd dist
  aws s3 sync . s3://viewly-playlists-website
  aws cloudfront create-invalidation --distribution-id E2AQ41BU5QJN2J --paths /index.html
fi

while true; do echo 'sleeping'; sleep 3600; done
