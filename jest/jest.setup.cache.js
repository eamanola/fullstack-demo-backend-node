const { cache } = require('empty-backend');

const { initCache, connectCache, closeCache } = cache;

beforeAll(async () => {
  await initCache();
  await connectCache();
});

afterAll(async () => {
  await closeCache();
});
