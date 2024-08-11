// controllers/notesController.js
const notesModel = require('../models/notesModel');
const { addTagsToNote, removeTagsFromNote, queryNotesByTags } = require('../models/tagsModel');
const { handleError } = require('../utils/errorHandler');

/**
 * Controller to create a new note.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createNote = (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) throw new Error('Title and content are required.');
    const newNote = notesModel.createNote(title, content, tags);
    res.status(201).json(newNote);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

/**
 * Controller to retrieve all notes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllNotes = (req, res) => {
  try {
    const notes = notesModel.getAllNotes();
    res.json(notes);
  } catch (error) {
    handleError(res, 500, 'Failed to retrieve notes.');
  }
};

/**
 * Controller to retrieve a note by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getNoteById = (req, res) => {
  try {
    const note = notesModel.getNoteById(req.params.id);
    if (!note) return handleError(res, 404, 'Note not found.');
    res.json(note);
  } catch (error) {
    handleError(res, 500, 'Failed to retrieve note.');
  }
};

/**
 * Controller to update a note by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateNoteById = (req, res) => {
  try {
    const updatedNote = notesModel.updateNoteById(req.params.id, req.body);
    if (!updatedNote) return handleError(res, 404, 'Note not found.');
    res.json(updatedNote);
  } catch (error) {
    handleError(res, 500, 'Failed to update note.');
  }
};

/**
 * Controller to delete a note by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteNoteById = (req, res) => {
  try {
    const success = notesModel.deleteNoteById(req.params.id);
    if (!success) return handleError(res, 404, 'Note not found.');
    res.status(204).json({message: "Note deleted successfully yo"});
  } catch (error) {
    handleError(res, 500, 'Failed to delete note.');
  }
};

/**
 * Controller to add tags to a note.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addTagsToNoteById = (req, res) => {
  try {
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags)) throw new Error('Tags must be an array of strings.');
    const note = notesModel.getNoteById(req.params.id);
    if (!note) return handleError(res, 404, 'Note not found.');

    const updatedNote = addTagsToNote(note, tags);
    res.json(updatedNote);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

/**
 * Controller to remove tags from a note.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const removeTagsFromNoteById = (req, res) => {
  try {
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags)) throw new Error('Tags must be an array of strings.');
    const note = notesModel.getNoteById(req.params.id);
    if (!note) return handleError(res, 404, 'Note not found.');

    const updatedNote = removeTagsFromNote(note, tags);
    res.json(updatedNote);
  } catch (error) {
    handleError(res, 400, error.message);
  }
};

/**
 * Controller to query notes based on tags.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const queryNotes = (req, res) => {
    try {
      // Parsing query parameters
      const andTags = req.query.and ? req.query.and.split(',') : [];
      const orTags = req.query.or ? req.query.or.split(',') : [];
      const notTags = req.query.not ? req.query.not.split(',') : [];
  
      // Log the parsed tags for debugging
      console.log('AND Tags:', andTags);
      console.log('OR Tags:', orTags);
      console.log('NOT Tags:', notTags);
  
      // Retrieve all notes
      const notes = notesModel.getAllNotes();
  
      // Apply the tag-based filtering logic
      const filteredNotes = queryNotesByTags(notes, { andTags, orTags, notTags });
  
      // Return the filtered notes or empty array
      res.status(200).json(filteredNotes);
    } catch (error) {
      console.error(error);
      handleError(res, 500, 'Failed to query notes.');
    }
  };

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  addTagsToNoteById,
  removeTagsFromNoteById,
  queryNotes,
};
