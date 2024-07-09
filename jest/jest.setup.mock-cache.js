jest.mock('automata-cache', () => {
  const mockCache = {};

  const setItem = async (key, value) => {
    mockCache[key] = value;
  };

  const getItem = async (key) => mockCache[key];

  const removeItem = async (key) => {
    if (typeof key === 'string') {
      delete mockCache[key];
    } else if (Array.isArray(key)) {
      key.forEach((k) => removeItem(k));
    }
  };

  return {
    closeCache: () => null,
    connectCache: () => null,
    getItem,
    initCache: () => null,
    removeItem,
    setItem,
  };
});
