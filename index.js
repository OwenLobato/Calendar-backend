const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

// DATABASE
dbConnection();

// CORS
app.use(cors());

// PUBLIC
app.use(express.static('public'));

// BODY READER AND PARSER
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
