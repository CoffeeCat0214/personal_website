# Single-Page Portfolio Website

This is a simple and elegant single-page portfolio website built with pure HTML, CSS, and a touch of JavaScript. It's designed to be easy to host and maintain, with no build process or server requirements.

## Features

- Clean, responsive design that works on all devices
- Smooth scrolling navigation
- Animated typing effect
- Sections for About, Projects, Experience, and Contact
- Easy to customize and maintain

## Hosting on AWS S3

### Prerequisites

1. An AWS account
2. The AWS CLI installed and configured on your machine
3. A registered domain name (optional, but recommended)

### Creating an S3 Bucket for Static Website Hosting

1. Sign in to the AWS Management Console
2. Navigate to S3
3. Click "Create bucket"
4. Enter a globally unique bucket name (ideally matching your domain name)
5. Choose your preferred region
6. Uncheck "Block all public access" (since this is a public website)
7. Enable "Static website hosting" in the bucket properties
8. Set "index.html" as the Index document
9. Click "Create bucket"

### Setting Bucket Permissions

1. Go to the "Permissions" tab
2. Update the Bucket Policy with:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```

Replace "YOUR-BUCKET-NAME" with your actual bucket name.

### Deploying with the Script

1. Edit the `deploy-to-s3.sh` script and update:
   - `S3_BUCKET` with your bucket name
   - `REGION` with your AWS region

2. Run the deployment script:
```bash
./deploy-to-s3.sh
```

### Setting up CloudFront (Optional, but recommended)

For better performance and HTTPS:

1. Create a CloudFront distribution pointed to your S3 bucket
2. Set the "Origin Domain Name" to your S3 website endpoint
3. Configure HTTPS settings
4. Update the `DISTRIBUTION_ID` in your deployment script

## Making Changes

To update your portfolio:

1. Edit the `index.html` or `style.css` files as needed
2. Run the deployment script again
3. Your changes will be live within minutes

## Customization

### Changing Colors

Edit the CSS variables at the top of `style.css`:

```css
:root {
  --primary: #c7dbff;
  --secondary: #ffcfdf;
  --accent: #b1f8f2;
  --background: #1a1a2e;
  --text: #f1f1f8;
  /* ... other variables ... */
}
```

### Adding Projects

Add new project cards by duplicating the existing project HTML structure and updating the content.

### Profile Image

Replace the placeholder initials with an actual image by modifying the profile-image div in the HTML.

## License

This project is open source and available under the MIT License. 