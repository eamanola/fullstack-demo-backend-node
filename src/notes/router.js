const express = require('express');
const { router: notes } = require('./routes/notes');
const publicNotes = require('./routes/public-notes');

const router = express.Router();
router.use('/notes', notes);
router.get('/public-notes', publicNotes);

module.exports = router;
