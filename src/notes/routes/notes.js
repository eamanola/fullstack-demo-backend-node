const { rest } = require('../../../../empty-backend/dist/index.bundle');

const validator = require('../validators/note');

const { NODE_ENV } = require('../../config');

const {
  model: restModel,
  controller: restController,
  router: restRouter,
} = rest;

const tableName = 'Notes';

const columns = [
  { name: 'imageUrl', type: 'string' },
  { name: 'isPublic', required: true, type: 'bool' },
  { name: 'text', required: true, type: 'string' },
];

const indexes = [{ columns: ['isPublic'], name: `idx-${tableName}-isPublic` }];

const table = { columns, indexes, name: tableName };

const model = restModel(table, { userRequired: true, validator });

const controller = restController(model, { userRequired: true });
const router = restRouter(controller, {
  resultKey: 'note',
  resultsKey: 'notes',
  useCache: true,
});

module.exports = {
  controller,
  model,
  router,
};

if (NODE_ENV === 'test') {
  module.exports.tableName = tableName;
}
