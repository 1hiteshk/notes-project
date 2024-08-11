// routes/notesRoutes.js
const express = require('express');
const notesController = require('../controllers/notesController');

const router = express.Router();

// Note CRUD routes
router.post('/notes', notesController.createNote);
router.get('/notes', notesController.getAllNotes);
router.get('/notes/:id', notesController.getNoteById);
router.put('/notes/:id', notesController.updateNoteById);
router.delete('/notes/:id', notesController.deleteNoteById);

// Tag management routes
router.put('/notes/:id/tags', notesController.addTagsToNoteById);
router.delete('/notes/:id/tags', notesController.removeTagsFromNoteById);

// Querying notes
router.get('/notes/query', notesController.queryNotes);

module.exports = router;
