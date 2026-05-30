const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();

// PUBLIC
app.use(express.static('public'));

// BODY READER AND PARSER
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
