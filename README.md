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

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Start the data API server (optional - for editing content via the UI)
```bash
npm run server
# or
yarn server
```

5. Or run both the development server and API server together
```bash
npm run dev:full
# or
yarn dev:full
```

The site will be available at http://localhost:5173 and the API server at http://localhost:5000.

## Customizing Content

There are two ways to customize your portfolio content:

### 1. Edit the JSON file directly

Modify the file at `src/data/portfolio-data.json`.

### 2. Use the built-in Data Editor

1. Start both the development server and API server:
```bash
npm run dev:full
```

2. Navigate to http://localhost:5173/editor

3. Make your changes in the editor

4. Click "Save Changes" to update your content

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

For the data API in production:
- Set up the API server on your hosting provider
- Update the API_URL in the DataEditor component to point to your production API
- Add authentication to secure the API endpoints

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
