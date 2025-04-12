import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    {
      name: 'copy-portfolio-data',
      generateBundle() {
        // Ensure data directory exists
        const dataDir = path.resolve('dist/src/data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // Copy portfolio data
        const sourcePath = path.resolve('src/data/portfolio-data.json');
        const targetPath = path.resolve('dist/src/data/portfolio-data.json');
        
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, targetPath);
          console.log('✅ Portfolio data copied to build directory');
        } else {
          console.error('❌ Portfolio data file not found:', sourcePath);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
