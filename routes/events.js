/*
  Users Routes /events
  host + /api/events
*/
const { Router } = require('express');
const { getEvents } = require('../controllers/events');

const router = Router();

router.get('/', getEvents);

module.exports = router;
