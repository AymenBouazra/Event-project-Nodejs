const express = require('express');
const passport = require('passport');
const { getAllTags, getTagById, createTag, updateTagById, deleteTagById, getAllTagsWithNewForm } = require('../controllers/tag.controller');
const router = express.Router();

router.get('/tag', passport.authenticate("bearer", { session: false }), getAllTags)
router.get('/tag/:id', passport.authenticate("bearer", { session: false }), getTagById)
router.post('/tag', passport.authenticate("bearer", { session: false }), createTag)
router.put('/tag/:id', passport.authenticate("bearer", { session: false }), updateTagById)
router.delete('/tag/:id', passport.authenticate("bearer", { session: false }), deleteTagById)
router.get('/newTagForm', passport.authenticate("bearer", { session: false }), getAllTagsWithNewForm)

module.exports = router;