#!/bin/bash
#
# Manual deploy to S3 (+ optional CloudFront invalidation).
#
# The primary deploy path is .github/workflows/deploy.yml -> Cloudflare Pages.
# This script is the AWS fallback: keep it working, but prefer the workflow.
#
#   S3_BUCKET=my-bucket DISTRIBUTION_ID=E123... ./deploy-to-s3.sh

set -euo pipefail

: "${S3_BUCKET:=kyrstin-portfolio-website}"
: "${AWS_REGION:=us-east-1}"
: "${DISTRIBUTION_ID:=}"
: "${NEXT_PUBLIC_SITE_URL:=https://kyrstinkauchak.com}"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Building static export...${NC}"
NEXT_PUBLIC_SITE_URL="$NEXT_PUBLIC_SITE_URL" npm run build

echo -e "${YELLOW}Syncing to s3://${S3_BUCKET}...${NC}"
# Hashed assets are immutable and safe to cache forever. Everything else is
# revalidated on each request, so a deploy is visible without an invalidation.
aws s3 sync out/ "s3://${S3_BUCKET}" --delete --region "$AWS_REGION" \
  --exclude "_next/static/*" \
  --cache-control "public, max-age=0, must-revalidate"

aws s3 sync out/_next/static/ "s3://${S3_BUCKET}/_next/static/" --delete --region "$AWS_REGION" \
  --cache-control "public, max-age=31536000, immutable"

# Next writes the OG card to out/opengraph-image with no file extension, and
# `aws s3 sync` infers Content-Type from the extension -- so it lands as
# application/octet-stream and every unfurler refuses to render it. Nothing in
# the build or the sync reports a problem; the card is just silently blank.
# Guarded on existence so a future Next that emits a real .png makes this a
# no-op rather than a failure.
if [ -f out/opengraph-image ]; then
  echo -e "${YELLOW}Re-putting the OG image as image/png...${NC}"
  aws s3 cp "s3://${S3_BUCKET}/opengraph-image" "s3://${S3_BUCKET}/opengraph-image" \
    --content-type image/png \
    --metadata-directive REPLACE \
    --region "$AWS_REGION"
fi

# Public access comes from the bucket policy in bucket-policy.json. Object ACLs
# are disabled on buckets created after April 2023.
if [ -n "$DISTRIBUTION_ID" ]; then
  echo -e "${YELLOW}Invalidating CloudFront...${NC}"
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" >/dev/null
fi

echo -e "${GREEN}Deployed to ${NEXT_PUBLIC_SITE_URL}${NC}"
