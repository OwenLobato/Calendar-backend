const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

// CORS
app.use(cors());

// PUBLIC
app.use(express.static('public'));

// BODY READER AND PARSER
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// SPA FALLBACK
app.use('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// DATABASE CONNECTION 
dbConnection()
  .then(() => {
    // START SERVER
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Server could not start:', err.message);
    process.exit(1);
  });
