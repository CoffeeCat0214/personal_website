#!/bin/bash

# Exit on error
set -e

# Configuration - REPLACE THESE VALUES
S3_BUCKET="your-bucket-name"
REGION="us-east-1"
DISTRIBUTION_ID="your-cloudfront-distribution-id-if-applicable"

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying to S3 bucket: ${S3_BUCKET}...${NC}"

# Upload the HTML and CSS files to S3
echo -e "${YELLOW}Uploading files...${NC}"
aws s3 cp index.html s3://${S3_BUCKET}/index.html --region ${REGION}
aws s3 cp style.css s3://${S3_BUCKET}/style.css --region ${REGION}

# Set content types and public read access
echo -e "${YELLOW}Setting content types and public access...${NC}"
aws s3 cp s3://${S3_BUCKET}/index.html s3://${S3_BUCKET}/index.html --content-type "text/html" --acl public-read --region ${REGION}
aws s3 cp s3://${S3_BUCKET}/style.css s3://${S3_BUCKET}/style.css --content-type "text/css" --acl public-read --region ${REGION}

# If using CloudFront, invalidate the cache
if [ ! -z "$DISTRIBUTION_ID" ]; then
  echo -e "${YELLOW}Invalidating CloudFront cache...${NC}"
  aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/index.html" "/style.css" --region ${REGION}
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your website is available at: http://${S3_BUCKET}.s3-website-${REGION}.amazonaws.com${NC}" 