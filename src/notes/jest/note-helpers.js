const getToken = async (api, { email = 'foo@example.com', password = '123' } = {}) => {
  await api
    .post('/signup')
    .send({ email, password });

  const { body } = await api
    .post('/login')
    .send({ email, password });

  const { token } = body;

  return token;
};

const validNote = ({ isPublic = false, text = 'text' } = {}) => ({ isPublic, text });

module.exports = {
  getToken,
  validNote,
};
