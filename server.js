/* 
This file sets up a basic web server using Node.js and the Express framework. 
Configures Express to serve static files from the public directory.
Defines an endpoint to fetch event data from SerpApi and return it as JSON.
*/
const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, 'credentials', '.env') });
const app = express();
//const port = 4000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch events
app.get('/events', async (req, res) => {
    /* Extracts the city parameter from the query string of the incoming request (ex: /events?city=Austin) */
    const city = req.query.location;
    const apiKey = process.env.API_KEY;
    /* Constructs the URL for the SerpApi request, including the city parameter and API key. 
       encodeURIComponent(city) ensures that the city name is safely encoded for inclusion in the URL. */
    const url = `https://serpapi.com/search?engine=google_events&q=Events+in+${encodeURIComponent(city)}&hl=en&gl=us&api_key=${apiKey}`;

    try {
        const response = await axios.get(url); // HTTP GET request to the url using axios and waits for the response
        res.json(response.data); // Sends the JSON data received from SerpApi back to the client
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Serves the index.html file from the public directory when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
/* Starts the server on the specified port and logs a confirmation message
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});*/