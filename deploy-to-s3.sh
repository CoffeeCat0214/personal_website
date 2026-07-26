#!/bin/bash

set -euo pipefail

: "${S3_BUCKET:=kyrstin-portfolio-website}"
: "${AWS_REGION:=us-east-1}"
: "${DISTRIBUTION_ID:=}"

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Next.js static export...${NC}"
# `next build` emits the static export directly: next.config.ts sets
# output: "export" and distDir: "out". There is no separate `export` script --
# this called `npm run export` until that script was renamed to `build`.
npm run build

echo -e "${YELLOW}Deploying to S3 bucket: ${S3_BUCKET}...${NC}"
aws s3 sync out/ "s3://${S3_BUCKET}" --delete --region "${AWS_REGION}"

# Next writes the generated OG card to out/opengraph-image with NO file
# extension. `aws s3 sync` infers Content-Type from the extension, so that
# object lands as application/octet-stream -- and every unfurler (Slack,
# iMessage, X, LinkedIn, Facebook) refuses to render a share image that is not
# served as an image type. The card is silently blank everywhere, and nothing
# in the build or the sync reports a problem.
#
# So re-put that one object with an explicit type. Guarded on existence rather
# than assumed: if a future Next version starts emitting a real .png, the sync
# above already handles it correctly and this becomes a no-op instead of an
# error that fails the deploy.
if [ -f out/opengraph-image ]; then
  echo -e "${YELLOW}Fixing Content-Type on the OG image...${NC}"
  aws s3 cp "s3://${S3_BUCKET}/opengraph-image" "s3://${S3_BUCKET}/opengraph-image" \
    --content-type image/png \
    --metadata-directive REPLACE \
    --region "${AWS_REGION}"
fi

# No longer using ACL flags as the bucket doesn't support them
# Instead, we'll rely on the bucket policy for public access

# If using CloudFront, invalidate the cache
if [ -n "$DISTRIBUTION_ID" ]; then
  echo -e "${YELLOW}Invalidating CloudFront cache...${NC}"
  aws cloudfront create-invalidation \
    --distribution-id "${DISTRIBUTION_ID}" \
    --paths "/*" \
    --region "${AWS_REGION}"
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your website is available at: http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com${NC}"
