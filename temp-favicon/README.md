# Favicon Update Instructions

To use the adorable orange cat image as your favicon:

## Option 1: Online Favicon Generator (Recommended)

1. Visit a favicon generator website like [favicon.io](https://favicon.io/favicon-converter/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload the cat image
3. Download the generated favicon package
4. Replace the existing `favicon.ico` file in both:
   - `personal-portfolio/src/app/favicon.ico`
   - `personal-portfolio/public/favicon.ico` (for better compatibility)

## Option 2: Manual Conversion

If you have ImageMagick installed:

```bash
# Install ImageMagick if needed
# macOS: brew install imagemagick
# Ubuntu: sudo apt install imagemagick

# Navigate to your project
cd personal-portfolio

# Create a temporary directory
mkdir -p temp-favicon

# Copy the cat image to the temp directory
cp /path/to/cat-image.png temp-favicon/cat.png

# Convert the image to different favicon sizes
convert temp-favicon/cat.png -resize 16x16 temp-favicon/favicon-16.png
convert temp-favicon/cat.png -resize 32x32 temp-favicon/favicon-32.png
convert temp-favicon/cat.png -resize 48x48 temp-favicon/favicon-48.png

# Combine them into an .ico file
convert temp-favicon/favicon-16.png temp-favicon/favicon-32.png temp-favicon/favicon-48.png temp-favicon/favicon.ico

# Copy the favicon to both locations
cp temp-favicon/favicon.ico src/app/favicon.ico
cp temp-favicon/favicon.ico public/favicon.ico

# Clean up
rm -rf temp-favicon
```

After updating the favicon, be sure to rebuild your site with:

```bash
npm run export
```

Then deploy it again with:

```bash
./deploy-to-s3.sh
``` 