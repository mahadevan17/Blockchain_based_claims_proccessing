// Import the necessary modules
const express = require('express');
const path = require('path');
require("dotenv").config()
// Create an instance of Express
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname,'public')));

//for env file 
app.get("/config", (req, res) => {
    res.json({ API_KEY: process.env.PINATA_API_KEY ,
        API_SECRET: process.env.PINATA_API_SECRET ,
        API_GATEWAY:process.env.PINATA_API_GATEWAY ,

    });
  });

// Route for the main page
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server
app.listen(3000, () => {
console.log(`Server is running on http://localhost:3000`);
});