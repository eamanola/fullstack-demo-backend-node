const app = require('empty-backend');

const notesRouter = require('./notes/router');

app.use(notesRouter);

module.exports = app;
