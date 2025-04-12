# Setting Up Vercel Environment Variables

Follow these steps to configure your environment variables on Vercel:

## 1. Using the Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Click on "Settings" in the top navigation
4. Go to "Environment Variables" in the sidebar
5. Add the following environment variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | VITE_DATA_PATH | src/data/portfolio-data.json | Production, Preview, Development |
   | VITE_PUBLIC_DATA_URL | [Optional URL to your remote JSON file] | Production, Preview, Development |

6. Click "Save" to apply the changes
7. Redeploy your project from the "Deployments" tab

## 2. Using the Vercel CLI

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Log in to your Vercel account
vercel login

# Add environment variables
vercel env add VITE_DATA_PATH
# Enter: src/data/portfolio-data.json

# Optional: Add remote data URL
vercel env add VITE_PUBLIC_DATA_URL
# Enter your remote JSON URL or leave blank

# Deploy with the environment variables
vercel --prod
```

## 3. Using GitHub Secrets (For GitHub Actions)

If you're using GitHub Actions for deployment, you need to set these as GitHub Secrets:

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Add the following secrets:

   | Name | Value |
   |------|-------|
   | VERCEL_TOKEN | Your Vercel API token |
   | VERCEL_ORG_ID | Your Vercel organization ID |
   | VERCEL_PROJECT_ID | Your Vercel project ID |
   | VITE_PUBLIC_DATA_URL | [Optional URL to your remote JSON file] |

4. These will be used automatically by the GitHub Actions workflow

## Getting Vercel Tokens and IDs

To get your Vercel token and IDs:

1. **VERCEL_TOKEN**: 
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token
   - Copy the token value

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   - Run `vercel link` in your project directory
   - The IDs will be stored in the `.vercel/project.json` file
   - Or find them in your project settings in the Vercel dashboard

## Using a Remote JSON File

If you want to update your portfolio without redeploying, host your JSON file on:

- GitHub Gist
- JSONBin.io
- Any CDN or file hosting service

Then set the `VITE_PUBLIC_DATA_URL` environment variable to point to that file. 