# Notes API

A RESTful API for managing notes with support for tags and complex tag-based querying. Built with Node.js and Express.js.

## Features

- **CRUD Operations on Notes**: Create, read, update, and delete notes.
- **Tag Management**: Add and remove tags from notes.
- **Complex Querying**: Retrieve notes based on logical AND, OR, and NOT conditions applied to tags.

## Project Structure

```plaintext
/project-root
│
├── /controllers
│   ├── notesController.js
│   └── tagsController.js
│
├── /models
│   ├── noteModel.js
│   └── tagModel.js
│
├── /routes
│   ├── notesRoutes.js
│   └── tagsRoutes.js
│
├── /utils
│   └── errorHandler.js
│
├── index.js
└── README.md

* Simply clone the project and test api's using postman or thunder client
* create a note for example
http://localhost:3000/api/notes
pass in body object
{
  "title": "Meeting Notes",
  "content": "Discuss project requirements and deadlines.",
  "tags": ["work", "meeting"]
}

* the response should be like
{
  "id": "1",
  "title": "Meeting Notes",
  "content": "Discuss project requirements and deadlines.",
  "tags": ["work", "meeting"]
}

* same for all the routes