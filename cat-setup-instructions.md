# Cat Image Integration Guide

This guide explains how to properly integrate the adorable orange cat image into your portfolio website.

## What We've Done So Far

1. Added a temporary cat banner to the top of the homepage
2. Updated the layout.tsx file to properly reference favicons
3. Created a setup script (`setup-cat-image.sh`) to help you integrate the cat image
4. Prepared the Hero component to use a cat profile image

## Next Steps to Make the Cat Image Visible

### Option 1: Quick Cat Banner Integration (Already Done)

The cat banner with emoji is already visible at the top of your site. To replace it with your actual cat image:

1. Open `src/app/page.tsx`
2. Find the following section:
   ```jsx
   <div className="w-full h-full bg-gradient-to-br from-orange-300 to-amber-500 flex items-center justify-center">
     <span className="text-4xl">😺</span>
   </div>
   ```
3. Replace it with:
   ```jsx
   <Image 
     src="/cat-image.png" 
     alt="My coding buddy" 
     width={160} 
     height={160} 
     className="object-cover"
   />
   ```
4. Save your cat image as `public/cat-image.png`

### Option 2: Full Integration with Setup Script

1. Save your cat image to a location on your computer
2. Run the setup script:
   ```bash
   ./setup-cat-image.sh
   ```
3. Follow the prompts to provide the path to your cat image
4. The script will:
   - Copy the image to public/images/cat-profile.png
   - Convert it to a favicon
   - Update references in the code

### Option 3: Manual Integration

1. Save your cat image to:
   - `public/images/cat-profile.png` (for the profile image)
   - `public/favicon.ico` (for the favicon)
   - `src/app/favicon.ico` (for the app directory favicon)

2. Update the Hero component to use the cat image:
   ```jsx
   <Image 
     src="/images/cat-profile.png" 
     alt="Cat Profile" 
     width={256} 
     height={256} 
     className="object-cover"
     priority
   />
   ```

## Testing Your Changes

After making these changes:

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3001 to see the changes
   - You should see the cat banner at the top
   - The favicon in the browser tab should be the cat image
   - The Hero section should show the cat image as your profile picture

## Deploying Your Changes

Once you're happy with how everything looks:

1. Build the site:
   ```bash
   npm run export
   ```

2. Deploy to S3:
   ```bash
   ./deploy-to-s3.sh
   ```

Your portfolio will now feature your adorable orange cat throughout the site! 