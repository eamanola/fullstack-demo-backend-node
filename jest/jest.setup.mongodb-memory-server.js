jest.mock('empty-backend', () => {
  const emptybackend = jest.requireActual('empty-backend');

  const setItem = async (key, value) => {
    cache[key] = value;
  };

  const getItem = async (key) => cache[key];

  const removeItem = async (key) => {
    if (typeof key === 'string') {
      delete cache[key];
    } else if (Array.isArray(key)) {
      key.forEach((k) => removeItem(k));
    }
  };

  const cache = {
    closeCache: () => null,
    connectCache: () => null,
    getItem,
    initCache: () => null,
    removeItem,
    setItem,
  };

  return {
    ...emptybackend,
    cache,
  };
});
