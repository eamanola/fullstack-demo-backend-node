const bcrypt = require('bcrypt');

const { info } = require('../../logger');
const { createParamError, emailTakenError } = require('../../errors');
const signupSchema = require('../../validators/signup');
const { findOne, insertOne } = require('../../models/users');
const { setUnverified } = require('./email-verification/set-status');

const saltRounds = 11;

const isEmailTaken = ({ email }) => findOne({ email });

const signup = async ({ email, password }) => {
  try {
    await signupSchema.validate({ email, password });
  } catch (e) {
    info(e.message);
    throw createParamError(e);
  }

  if (await isEmailTaken({ email })) {
    throw emailTakenError;
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const { id: userId } = await insertOne({ email, passwordHash });

  await setUnverified(userId);

  return userId;
};

module.exports = signup;
