#!/bin/sh
npm run build
if [ -d "dist" ]; then
  cd dist
  aws s3 sync . s3://viewly-playlists-website
  aws cloudfront create-invalidation --distribution-id E2AQ41BU5QJN2J --paths /index.html
  echo "Triggering SSR Deployment in 1 minute..."
  sleep 60
  curl -X POST "https://hooks.cloud66.com/stacks/redeploy/95b536980f5f79341d90822dac86a7b4/1a30000a3509672eb860859a622594a1?services=web-ssr"
fi

while true; do echo 'sleeping'; sleep 3600; done
