// This file would typically be in a separate server project
// For development purposes, you could use a tool like json-server or a simple Express server

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// Route to get the portfolio data
app.get('/api/portfolio', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../src/data/portfolio-data.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    res.status(500).json({ error: 'Failed to read portfolio data' });
  }
});

// Route to update the portfolio data
app.post('/api/portfolio', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../../src/data/portfolio-data.json');
    
    // Validate that the request body is valid JSON
    const portfolioData = req.body;
    
    // Write the updated data to the file
    fs.writeFileSync(dataPath, JSON.stringify(portfolioData, null, 2), 'utf8');
    
    res.json({ success: true, message: 'Portfolio data updated successfully' });
  } catch (error) {
    console.error('Error updating portfolio data:', error);
    res.status(500).json({ error: 'Failed to update portfolio data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Portfolio API server running on port ${PORT}`);
});

// To run this server:
// 1. Install dependencies: npm install express cors
// 2. Run the server: node src/server/api.js

module.exports = app; 