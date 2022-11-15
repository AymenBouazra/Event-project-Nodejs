const express = require('express');
const passport = require('passport');
const { createEvent, getEventById, getAllEvents, updateEventById, deleteEventById } = require('../controllers/event.controller');
const router = express.Router();

router.get('/event', passport.authenticate("bearer", { session: false }), getAllEvents)
router.get('/event/:id', passport.authenticate("bearer", { session: false }), getEventById)
router.post('/event', passport.authenticate("bearer", { session: false }), createEvent)
router.put('/event/:id', passport.authenticate("bearer", { session: false }), updateEventById)
router.delete('/event/:id', passport.authenticate("bearer", { session: false }), deleteEventById)

module.exports = router;