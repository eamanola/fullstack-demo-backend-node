module.exports = {
  setupFilesAfterEnv: [
    './jest/jest.setup.empty-backend.js',
    './jest/jest.setup.db.js',
    './jest/jest.setup.cache.js',
  ],
};
