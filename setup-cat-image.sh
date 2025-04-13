#!/bin/bash

# Make the script executable
chmod +x setup-cat-image.sh

# Exit on error
set -e

# Define colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Cat Image Setup Helper${NC}"
echo "This script will help you set up the cat image as both a favicon and profile picture."

# Get the path to the cat image from the user
echo -e "${BLUE}Please enter the full path to your cat image file:${NC}"
echo "Example: /Users/username/Downloads/cat.png"
read CAT_IMAGE_PATH

# Check if the file exists
if [ ! -f "$CAT_IMAGE_PATH" ]; then
  echo -e "${YELLOW}File not found: $CAT_IMAGE_PATH${NC}"
  echo "Please make sure the file exists and try again."
  exit 1
fi

# Copy the cat image to the public/images directory
echo -e "${BLUE}Copying cat image to public/images directory...${NC}"
cp "$CAT_IMAGE_PATH" public/images/cat-profile.png

# Copy the cat image to be used as favicon
echo -e "${BLUE}Copying cat image to be used as favicon...${NC}"
cp "$CAT_IMAGE_PATH" public/favicon.png

# Check if ImageMagick is installed for favicon conversion
if command -v convert &> /dev/null; then
  echo -e "${BLUE}ImageMagick detected. Converting image to favicon...${NC}"
  
  # Create favicon.ico
  convert public/favicon.png -resize 16x16 public/favicon-16.png
  convert public/favicon.png -resize 32x32 public/favicon-32.png
  convert public/favicon.png -resize 48x48 public/favicon-48.png
  convert public/favicon-16.png public/favicon-32.png public/favicon-48.png public/favicon.ico
  
  # Copy the favicon to src/app directory
  cp public/favicon.ico src/app/favicon.ico
  
  # Cleanup temporary files
  rm public/favicon-16.png public/favicon-32.png public/favicon-48.png
  
  echo -e "${GREEN}Favicon successfully created!${NC}"
else
  echo -e "${YELLOW}ImageMagick not found.${NC}"
  echo "Please convert your image to favicon.ico using an online tool like favicon.io"
  echo "Then place the favicon.ico in both:"
  echo "- public/favicon.ico"
  echo "- src/app/favicon.ico"
fi

# Update Hero.tsx to use the correct image path
echo -e "${BLUE}Updating Hero component to use cat image...${NC}"
sed -i '.bak' 's|src="/cat-profile.png"|src="/images/cat-profile.png"|g' src/components/Hero.tsx

echo -e "${GREEN}Setup complete!${NC}"
echo "Please restart your development server to see the changes."
echo "Run: npm run dev" 