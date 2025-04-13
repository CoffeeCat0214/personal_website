#!/bin/bash

# Exit on error
set -e

# Configuration - REPLACE THESE VALUES
S3_BUCKET="kyrstin-portfolio-website"
REGION="us-east-1"
# Setting to empty string to skip CloudFront invalidation
DISTRIBUTION_ID=""

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building Next.js static export...${NC}"
npm run export

echo -e "${YELLOW}Deploying to S3 bucket: ${S3_BUCKET}...${NC}"
aws s3 sync out/ s3://${S3_BUCKET} --delete --region ${REGION}

# No longer using ACL flags as the bucket doesn't support them
# Instead, we'll rely on the bucket policy for public access

# If using CloudFront, invalidate the cache
if [ ! -z "$DISTRIBUTION_ID" ]; then
  echo -e "${YELLOW}Invalidating CloudFront cache...${NC}"
  aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --region ${REGION}
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your website is available at: http://${S3_BUCKET}.s3-website-${REGION}.amazonaws.com${NC}" 