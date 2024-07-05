const { model } = require('../routes/notes');

const publicNotes = async ({ limit = -1, offset = -1 } = {}) => (
  model.find({ isPublic: true }, { limit, offset })
);

module.exports = publicNotes;
