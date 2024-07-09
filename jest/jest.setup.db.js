const db = require('automata-db');

const { initDB, connectDB, closeDB } = db;

const SKIP_PATHS = [];
const { testPath } = expect.getState();
const skip = () => SKIP_PATHS.some((skipPath) => testPath.includes(skipPath));

beforeAll(async () => {
  if (skip()) { return; }
  await initDB();
  await connectDB();
});

afterAll(async () => {
  if (skip()) { return; }

  await closeDB();
});
