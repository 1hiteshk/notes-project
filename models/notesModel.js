// models/noteModel.js
const { v4: uuidv4 } = require('uuid');

// In-memory notes data structure
const notes = [];

/**
 * Creates a new note.
 * @param {string} title - The title of the note.
 * @param {string} content - The content of the note.
 * @param {Array} tags - The tags associated with the note.
 * @returns {Object} The newly created note.
 */
const createNote = (title, content, tags = []) => {
  const newNote = { id: uuidv4(), title, content, tags };
  notes.push(newNote);
  return newNote;
};

/**
 * Retrieves all notes.
 * @returns {Array} An array of all notes.
 */
const getAllNotes = () => notes;

/**
 * Retrieves a note by its ID.
 * @param {string} id - The ID of the note.
 * @returns {Object|null} The note object or null if not found.
 */
const getNoteById = (id) => notes.find(note => note.id === id);

/**
 * Updates a note by its ID.
 * @param {string} id - The ID of the note.
 * @param {Object} updates - The properties to update.
 * @returns {Object|null} The updated note or null if not found.
 */
const updateNoteById = (id, updates) => {
  const note = getNoteById(id);
  if (!note) return null;

  const { title, content, tags } = updates;
  if (title) note.title = title;
  if (content) note.content = content;
  if (tags) note.tags = tags;

  return note;
};

/**
 * Deletes a note by its ID.
 * @param {string} id - The ID of the note.
 * @returns {boolean} True if the note was deleted, false if not found.
 */
const deleteNoteById = (id) => {
  const index = notes.findIndex(note => note.id === id);
  if (index === -1) return false;

  notes.splice(index, 1);
  return true;
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};
