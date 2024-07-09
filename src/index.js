const cache = require('automata-cache');
const db = require('automata-db');
const app = require('./app');

const { PORT, REDIS_URL, MONGO_URL } = require('./config');

const { initCache, connectCache, closeCache } = cache;
const { initDB, connectDB, closeDB } = db;

const REDIS_ENABLED = !!REDIS_URL;
const MONGO_ENABLED = !!MONGO_URL;

const logger = console;

const shutdown = (server) => async () => {
  if (MONGO_ENABLED) await closeDB();
  logger.info('db connection closed');

  if (REDIS_ENABLED) await closeCache();
  logger.info('cache connection closed');

  server.close(() => {
    logger.info('server closed');
    process.exit(0);
  });
};

const start = async () => {
  if (MONGO_ENABLED) {
    initDB();
    await connectDB();
    logger.info('DB Connected');
  }

  if (REDIS_ENABLED) {
    await initCache();
    await connectCache();
    logger.info('Cache Connected');
  }

  const server = app.listen(PORT, () => {
    logger.info(`Running on port ${PORT}`);
  });

  const onExit = shutdown(server);
  process.on('SIGINT', onExit);
  process.on('SIGTERM', onExit);
  process.on('SIGHUP', onExit);
};

try {
  start();
} catch (err) {
  logger.error(err);
}
