const { db } = require('empty-backend');

const { initDB, connectDB, closeDB } = db;

const SKIP_PATHS = [];
const { testPath } = expect.getState();
const skip = () => SKIP_PATHS.some((skipPath) => testPath.includes(skipPath));

beforeAll(async () => {
  if (skip()) { return; }

  await initDB(':memory:');
  await connectDB();
});

afterAll(async () => {
  if (skip()) { return; }

  await closeDB();
});
