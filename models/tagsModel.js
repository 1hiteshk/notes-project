// models/tagModel.js

/**
 * Adds tags to a note.
 * @param {Object} note - The note object.
 * @param {Array} tags - The tags to add.
 * @returns {Object} The updated note.
 */
const addTagsToNote = (note, tags) => {
  tags.forEach(tag => {
    if (!note.tags.includes(tag)) {
      note.tags.push(tag);
    } else {
      return "this tag is already present"
    }
  });
  return note;
  };
  
  /**
   * Removes tags from a note.
   * @param {Object} note - The note object.
   * @param {Array} tags - The tags to remove.
   * @returns {Object} The updated note.
   */
  const removeTagsFromNote = (note, tags) => {
    note.tags = note.tags.filter(tag => !tags.includes(tag));
    return note;
  };
  
/**
 * Filters notes based on the presence or absence of specified tags.
 * @param {Array} notes - The array of notes to filter.
 * @param {Object} filters - The filters to apply (andTags, orTags, notTags).
 * @returns {Array} The filtered array of notes.
 */
const queryNotesByTags = (notes, { andTags = [], orTags = [], notTags = [] }) => {
  return notes.filter(note => {
    const hasAndTags = andTags.length === 0 || andTags.every(tag => note.tags.includes(tag));
    const hasOrTags = orTags.length === 0 || orTags.some(tag => note.tags.includes(tag));
    const hasNotTags = notTags.length === 0 || notTags.every(tag => !note.tags.includes(tag));
    console.log(hasAndTags,hasNotTags,hasOrTags,"hii")
    return hasAndTags && hasOrTags && hasNotTags;
  });
};
  
  module.exports = {
    addTagsToNote,
    removeTagsFromNote,
    queryNotesByTags,
  };
  