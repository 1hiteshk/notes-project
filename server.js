// index.js
const express = require('express');
const notesRoutes = require('./routes/notesRoute');

const app = express();
app.use(express.json());

// Mount the notes routes
app.use('/api', notesRoutes);

// Handle undefined routes with a 404 response
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
