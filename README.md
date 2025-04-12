# Dynamic Portfolio Website

A modern, responsive portfolio website with dynamic content loaded from a JSON data file.

## Features

- 🚀 **Dynamic Content**: All website content is loaded from a single JSON data file
- ✨ **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- 🎨 **Customizable**: Easy to personalize with the data editor
- 🌗 **Dark/Light Mode**: Automatic theme switching based on user preference
- 📱 **Responsive Design**: Looks great on all devices
- 🔄 **Animations**: Subtle animations for engaging user experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the file with your preferences
# VITE_DATA_PATH=src/data/portfolio-data.json
# VITE_PUBLIC_DATA_URL=https://your-remote-json-url.com/data.json (optional)
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Start the data API server (optional - for editing content via the UI)
```bash
npm run server
# or
yarn server
```

6. Or run both the development server and API server together
```bash
npm run dev:full
# or
yarn dev:full
```

The site will be available at http://localhost:5173 and the API server at http://localhost:5000.

## Customizing Content

There are multiple ways to customize your portfolio content:

### 1. Edit the JSON file directly (Development)

Modify the file at `src/data/portfolio-data.json` and rebuild your project.

### 2. Use the built-in Data Editor (Development Only)

1. Start both the development server and API server:
```bash
npm run dev:full
```

2. Navigate to http://localhost:5173/editor

3. Make your changes in the editor

4. Click "Save Changes" to update your content

### 3. Updating Content in Production

For Vercel deployments, you can update your portfolio content by:

1. **GitHub Method** (Recommended): 
   - Update the `src/data/portfolio-data.json` file in your GitHub repository
   - Commit and push the changes
   - Vercel will automatically redeploy with your new content

2. **Direct Editing**:
   - Clone your repository
   - Edit the `src/data/portfolio-data.json` file
   - Run the build locally (`npm run build`)
   - Deploy the updated `dist` directory to Vercel manually

3. **Using External Data Source**:
   - Host your JSON data on a service like GitHub Gist, JSONBin, or any CDN
   - Set the `VITE_PUBLIC_DATA_URL` environment variable in your Vercel project to point to this file
   - Or access your portfolio with the data URL as a query parameter:
     ```
     https://your-portfolio.com/?dataUrl=https://your-json-host.com/your-data.json
     ```
   - This allows you to update content without redeploying

## Data Structure

The portfolio data is structured as follows:

```json
{
  "hero": {
    "name": "Your Name",
    "title": "Your Title",
    ...
  },
  "about": {
    "title": "About Me",
    "subtitle": "Your subtitle",
    ...
  },
  ...
}
```

See the editor guide for a complete breakdown of the data structure.

## Deployment

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Deploy the `dist` directory to your hosting provider.

For Vercel deployments:
- Connect your GitHub repository to Vercel
- Set up environment variables in the Vercel dashboard (see setup-vercel-env.md)
- Vercel will automatically build and deploy your site
- The portfolio data will be included in the build

## Environment Variables

The portfolio uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_DATA_PATH | Path to the JSON data file | src/data/portfolio-data.json |
| VITE_PUBLIC_DATA_URL | URL to a remote JSON data file (optional) | - |

See `setup-vercel-env.md` for detailed instructions on setting up environment variables in Vercel.

## Adding Authentication (Optional)

For production use, consider adding authentication to the data editor:

1. Implement a login page
2. Add authentication middleware to the API routes
3. Protect the editor route with a route guard

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
