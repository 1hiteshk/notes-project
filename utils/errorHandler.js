// utils/errorHandler.js

/**
 * Handles errors and sends an appropriate response.
 * @param {Object} res - The response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} message - The error message.
 */
const handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ error: message });
  };
  
  module.exports = {
    handleError,
  };
  