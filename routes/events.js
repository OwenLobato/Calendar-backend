/*
  Users Routes /events
  host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { validateFields } = require('../middlewares/field-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post('/', [
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom(isDate),
  check('end', 'End date is required').custom(isDate),
  validateFields
], createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
