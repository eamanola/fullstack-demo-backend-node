const validator = require('../validators/note');

const {
  model: restModel,
  controller: restController,
  router: restRouter,
} = require('../../lib/rest');

const table = 'Notes';

const model = restModel(table, validator);
const controller = restController(model);
const router = restRouter(controller, {
  resultKey: 'note',
  resultsKey: 'notes',
  useCache: true,
  userRequired: true,
});

module.exports = {
  controller,
  model,
  router,
};
