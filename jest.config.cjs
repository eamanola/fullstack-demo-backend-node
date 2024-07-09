module.exports = {
  setupFiles: [
    './jest/jest.setup.mock-cache.js',
  ],
  setupFilesAfterEnv: [
    './jest/jest.setup.db.js',
    './jest/jest.setup.cache.js',
  ],
};
